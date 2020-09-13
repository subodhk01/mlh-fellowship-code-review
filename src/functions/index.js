'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
var db = admin.firestore();
const webapp = require("next")

var dev = false
var dir = __dirname
var nextapp = webapp({ dev, dir, conf: { distDir: 'next' } })
var handle = nextapp.getRequestHandler()

exports.webapp = functions.https.onRequest((req, res) => {
    console.log("File: " + req.originalUrl) // log the page.js file that is being requested
    return  nextapp.prepare().then(() => handle(req, res))
})

/******************************************************/
/***************** FOR PAYMENT GATEWAY ****************/
/******************************************************/

var express = require("express");
var cors = require("cors");
var request = require("request");
const crypto = require('crypto');
const key = functions.config().razorpay.key || "*|REMOVED|*";
const key_secret = functions.config().razorpay.secret || "*|REMOVED|*";

var app = express();

app.use(cors({ origin: true }));

app.post("/", (req, res) => {
  createRazorpayOrder(req, res, false);
});

app.post("/app", (req, res) => {
  req.body = req.body.data;
  createRazorpayOrder(req, res, true);
});

const createRazorpayOrder = async (req, res, encapsulate) => {
  const amount = req.body.amount;
  const orderId = req.body.orderId;

  const allowedOrigins = [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "https://resource-share-cf186.firebaseapp.com/",
      "https://alpha.nestin.io/",
      "https://nestin.io/"
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
      res.setHeader("Access-Control-Allow-Origin", origin);
  }

  var options = {
      method: "POST",
      url: "https://api.razorpay.com/v1/orders",
      headers: {
          Authorization:
              "Basic " + new Buffer(key + ":" + key_secret).toString("base64")
      },
      form: {
          amount: amount,
          currency: "INR",
          receipt: orderId,
          payment_capture: 1
      }
  };

  request(options, function (error, response, body) {
      if (error) {
        // TODO Send Error Response
        throw new Error(error);
      }

      res.send(encapsulate ? {data: body} : body);
  });
};

app.post("/confirmPayment", async (req, res) => {
    const order = req.body;
    const text = order.razorpay_order_id + "|" + order.razorpay_payment_id;
    var signature = crypto
        .createHmac("sha256", key_secret)
        .update(text)
        .digest("hex");

    if (signature === order.razorpay_signature) {
        console.log("PAYMENT SUCCESSFULL");

        var orderRef = await db.collection('orders').doc(order.orderId)
        .update({
            orderPlaced: true,
            paymentStatus: "COMPLETED",
            payment: [
                {
                    amount: order.amount,
                    type: "ONLINE",
                    transactionId: order.razorpay_order_id,
                    razorpayMeta: {
                        razorpay_order_id: order.razorpay_order_id,
                        razorpay_payment_id: order.razorpay_payment_id,
                        razorpay_signature: order.razorpay_signature
                    },
                }
            ]
        })
        .catch(err => {
            console.log('error :', err)
            res.status(400)
            res.send("something went wrong!");
            res.end();
        })
        res.send("PAYMENT SUCCESSFULL");
    } else {
        res.status(400)
        res.send("something went wrong!");
        res.end();
    }
});

exports.paymentApi = functions.https.onRequest(app);
