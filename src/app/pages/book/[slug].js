import Layout from '../../components/Layout'
import { loadFirebase, getIdToken } from '../../lib/firebase'
import withAuth from '../../lib/withAuth'
import React from 'react'
import Head from 'next/head'
import { ListItem } from '../../components/Listing'
import { Table } from 'react-bootstrap'
import OrderBrief from '../../components/OrderBrief'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import DateSelector from '../../components/BookingComponents/DateSelector'
import TableTypeSelector from '../../components/BookingComponents/TableTypeSelector'
import TimeSelector from '../../components/BookingComponents/TimeSelector'
import PersonCountSelector from '../../components/BookingComponents/PersonCountSelector'
import PaymentTypeSelector from '../../components/BookingComponents/PaymentTypeSelector'
import Router from 'next/router'
import { checkUser } from '../../utils/functions'

import Loader from '../../lib/loader'
import BounceLoader from 'react-spinners/BounceLoader'
import { FaInfoCircle, FaChevronRight, FaChevronLeft } from 'react-icons/fa'


export function Booking(props) {
    const [ count, setCount ] = React.useState(0);

    const [ tableType, setTableType ] = React.useState(props.result.pricing[0])
    const [ date, setDate ] = React.useState((new Date()))
    const [ time, setTime ] = React.useState({ min: props.result.timings[0].startTime + 60, max: props.result.timings[0].endTime - 60 })
    const [ numberOfPerson, setPerson ] = React.useState(1)
    const [ rate, setRate ] = React.useState(false)
    const [ rateType, setRateType ] = React.useState("")
    const [ paymentType, setPaymentType ] = React.useState("ONLINE")

    const [ promoInput, setPromoInput ] = React.useState("")
    const [ promo, setPromo ] = React.useState(null)
    const [ promoMsg, setPromoMsg ] = React.useState({})
    const [ freeOrder, setFreeOrder ] = React.useState(false)

    const [ error1, setError1 ] = React.useState('')
    const [ loading1, setLoading1 ] = React.useState(false)
    const [ error2, setError2 ] = React.useState('')
    const [ loading2, setLoading2 ] = React.useState(false)

    const [ orderDetails, setOrderDetails ] = React.useState({})
    const [ finalResponse, setFinalResponse ] = React.useState()
    const [ orderId, setOrderId ] = React.useState('')

    const [ token, setToken ] = React.useState("")

    function preCalculate(){
        var duration = time.max-time.min
        var finalRate;
        const priorityCheck = (rate) => {
            if(!rate.prioritySelectors){
                //console.log("No priority selectors")
                return true
            }
            let maxDuration = rate.prioritySelectors.maxDuration
            return ( maxDuration >= duration && rate.enabled )
        }
        for( const rate of tableType.rates ){
            if(priorityCheck(rate)){
                if(rate.type=="PER_TIME_PER_PAX"){
                    //console.log("Type is PER_TIME_PER_PAX")
                    let totalPaxUnit = Math.ceil( numberOfPerson/rate.unitPax )
                    let totalDurationUnit = Math.ceil( duration/rate.unitDuration )
                    let unitRate = rate.rate / rate.ratePax / (rate.rateDuration / 60)
                    finalRate = unitRate * totalDurationUnit * totalPaxUnit
                    setRateType("PER_TIME_PER_PAX")
                    break
                } else if(rate.type=="PER_TIME"){
                    //console.log("Type is PER_TIME")
                    let totalDurationUnit = Math.ceil( duration/rate.unitDuration )
                    let unitRate = rate.rate / (rate.rateDuration / 60)
                    finalRate = unitRate * totalDurationUnit
                    setRateType("PER_TIME")
                    break
                } else if(rate.type=="PER_PAX"){
                    //console.log("Type is PER_PAX")
                    let totalPaxUnit = Math.ceil( numberOfPerson/rate.unitPax )
                    let unitRate = rate.rate / rate.ratePax;
                    finalRate = unitRate * totalPaxUnit;
                    setRateType("PER_PAX")
                    break
                } else if(rate.type=="FLAT"){
                    //console.log("Type is FLAT")
                    let totalPaxUnit = Math.ceil( numberOfPerson/rate.unitPax )
                    let totalDurationUnit = Math.ceil( duration/rate.unitDuration )
                    finalRate = rate.rate * totalDurationUnit * totalPaxUnit
                    setRateType("FLAT")
                    break
                }
            }
        }
        setRate(finalRate)
        return finalRate
    }

    React.useEffect( () => {
        preCalculate()
    } ,[tableType, numberOfPerson, time])

    function handleBack(){
        checkUser(() => removePromo(true), () => {})
        setCount(0)
    }

    async function previewBooking(){
        setError1("")
        setLoading1(true)
        if( date && time ){
            var timeStart = new Date(date)
            timeStart.setHours(Math.floor(time.min/ 60))
            timeStart.setMinutes(time.min%60)
            var timeEnd = new Date(date)
            timeEnd.setHours(Math.floor(time.max/ 60))
            timeEnd.setMinutes(time.max%60)

            var duration = time.max-time.min
            var hours = ((duration)/60);
            console.log("hours: ", hours)

            if( duration > tableType.durationMax || duration < tableType.durationMin ){
                setLoading1(false)
                setError1(`Time Duration should be more than ${tableType.durationMin/60} hours and less than ${tableType.durationMax/60} hours`)
                return
            }

            var finalRate = preCalculate()
            setRate(finalRate)

            var payload = {
                restaurantId: props.result.id,
                restaurant: null,
                seatType: tableType.seatType,
                numPeople: numberOfPerson,
                dateStart: date,
                dateEnd: date,
                timeStart: timeStart,
                timeEnd: timeEnd,
                items: [{
                    name: "Rented Space",
                    rate: finalRate,
                    quantity: numberOfPerson,
                    hours: hours,
                    type: "SPACE"
                },{
                    name: "GST",
                    rate: 5,
                    unit: "PERCENT",
                    type: "TAX"
                },{
                    name: "Service Charge",
                    rate: 0,
                    unit: "PERCENT",
                    type: "TAX",
                    taxType: "FOOD"
                }],
                promo: promo,
                paymentStatus: "PENDING",
                user: {
                    displayName: props.user.displayName,
                    email: props.user.email
                },
            }

            console.log(payload)

            axios.post( BASE_URL + "/orders/getPreview/",
            {
                ...payload,
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + "token",
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then((res) => {
                console.log('response: ', res.data.data)
                setOrderDetails(res.data.data)
                setCount(1);
                setLoading1(false)
                return res.data
            }, (error) => {
                setLoading1(false)
                setError1("Unable to process request, try refreshing the page.")
                console.log(error)
            })
        } else {
            setError1("Please fill all the details before proceeding.")
            setLoading1(false)
        }
    }
    async function promoValidation(){
        setPromoMsg({
            loading: true
        })
        if(promoInput){
            var token = await getIdToken();
            axios.post( BASE_URL + "/orders/getPreview/",
            {
                ...orderDetails,
                code: promoInput,
                restaurantId: props.result.id
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then((res) => {
                if(res.data.success){
                    setOrderDetails(res.data.data)
                    setPromo(promoInput)
                    if(res.data.data.totalAmount < 1){
                        setFreeOrder(true)
                        setPaymentType("CASH")
                    }
                    setPromoMsg({
                        success: "Promocode successfully applied"
                    })
                }else{
                    setPromoInput("")
                    setPromoMsg({
                        error: res.data.message
                    })
                }
            }, (error) => {
                console.log(error)
                setPromoMsg({
                    error: "Unable to process your request"
                })
            })
        }else{
            setPromoMsg({
                error: "No promo code Entered"
            })
        }
    }
    async function removePromo(noMsg=false){
        if(!noMsg){
            setPromoMsg({
                loading: true
            })
        }
        console.log('inside removePromo')
        var token = await getIdToken();
        axios.post( BASE_URL + "/orders/getPreview/",
        {
            ...orderDetails,
            code: null
        },
        {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((res) => {
            if(res.data.success){
                setOrderDetails(res.data.data)
                setPromo(null)
                setPromoInput("")
                if(!noMsg){
                    setPromoMsg({
                        success: "Promocode removed successfully"
                    })
                }
            }else{
                setPromoInput("")
                if(!noMsg){
                    setPromoMsg({
                        error: res.data.message
                    })
                }
            }
        }, (error) => {
            console.log(error)
            setPromoMsg({
                error: "Unable to process your request"
            })
        })
    }
    function bookingSuccess(orderId){
        Router.push({
            pathname: '/book/success',
            query: {
                restaurantName: props.result.name,
                timeMin: time.min,
                timeMax: time.max,
                numberOfPerson: numberOfPerson,
                orderId: orderId
            }
        })
    }

    async function confirmBooking(){
        setLoading2(true)
        setError2("")
        var token = await getIdToken();
        //console.log(token)
        axios.post( BASE_URL + "/orders/placeOrder",
        {
            ...orderDetails,
            id: orderId,
            paymentMode: paymentType,
            payment: [
                {
                    amount: orderDetails.totalAmount,
                    type: paymentType,
                }
            ]
        },
        {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((res) => {
            if ( !res.data.success ){
                //console.log(res)
                setLoading2(false)
                setError2("Unable to process request, try refreshing the page.")
                console.log(res.data.message)
                return
            }
            //console.log('confirmBooking response: ',res)
            setFinalResponse(res.data)
            setOrderId(res.data.data.id)
            console.log('order ID set: ', res.data.data.id)
            console.log(res.data)
            if ( paymentType == "ONLINE" ){
                makePayment(orderDetails.totalAmount*100 , res.data.data.id)
            }else {
                bookingSuccess(res.data.data.id)
            }
        }, (error) => {
            setLoading2(false)
            setError2("Unable to process request, try refreshing the page.")
            console.log(error)
        })
    }

    async function verifySignature(response, orderId, amount) {
        //console.log("Payload for verify signature : ", response)
        //console.log("orderId: ", orderId)
        axios.post('*|REMOVED|*'
            , {
                ...response,
                orderId: orderId,
                amount
            }
        )
            .then((res) => {
                console.log("PAYMENT RESPONSE", res)
                if(res.status == 200){
                    setLoading2(false)
                    bookingSuccess(orderId)
                }else {
                    setLoading2(false)
                    setError2("Unable to process your request try again, if your account has been deducted email us at...")
                }
            })
            .catch((err) => {
                console.log(err)
                setLoading2(false)
                setError2("Unable to process your request try again, if your account has been deducted email us at...")
            })
    }

    async function makePayment(totalAmount, orderId) {
       // console.log("totalAmount :", totalAmount)
        var options = {
            key: "*|REMOVED|*",
            amount: totalAmount, /// The amount is shown in currency subunits. Actual amount is ₹599.
            name: "Nestin",
            currency: "INR",
            description: "Test Purchase",
            image: "/images/logos/icon.png",
            handler: (response) => {
                verifySignature(response, orderId, totalAmount/100);
            },
            prefill: {
                name: "",
                email: ""
            },
            notes: {
                orderId: orderId
            },
            theme: {
                color: "#027ff7"
            }
        };
        axios.post('*|REMOVED|*', {
            amount: totalAmount,
            orderId: orderId
        })
            .then((res) => {
                console.log("Response of /paymentApi function: ", res.data)
                setLoading2(false)
                var rzp1 = new Razorpay({ ...options, order_id: res.data.id });
                rzp1.open();
            })
            .catch((err) => {
                setLoading2(false)
                console.log("ERR", err)
            });
    }

    var currentComponent;
    if(count == 0){
        var currentComponent = (
            <div>
                <div className="bookButton d-block d-md-none position-fixed w-100 text-center text-white px-3 py-2">
                        <div className="text-danger text-center mt-1">
                            { error1 ? <><FaInfoCircle color="red" /> {error1} </> : "" }
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text-muted">
                                <FaInfoCircle /> <span className="font-weight-bold">Sub Total: </span> { rate && <span>&#8377;{rate}</span> }
                            </div>   
                            { !loading1 ?
                            <div className="btn btn-solid-reg py-3" onClick={previewBooking}>
                                Next <FaChevronRight />
                            </div>
                            :
                            <div className="text-right">
                                <BounceLoader color="#00c5ca" size="51px" />
                            </div>
                            }
                        </div>    
                </div>
                <div className="px-3 py-4 container my-0 mx-auto">
                    <div>
                        <div> <h5>Table Type</h5> </div>
                        <TableTypeSelector setPerson={setPerson} tableType={tableType} setTableType={setTableType} pricing={props.result.pricing} />
                    </div>
                    <div className="mb-3">
                        <div> <h5>Booking Date</h5> </div>
                        <DateSelector date={date} setDate={setDate} />
                    </div>
                    <div className="mb-5">
                        <div> <h5>Time</h5> </div>
                        <TimeSelector time={time} setTime={setTime} tableType={tableType} timing={props.result.timings[0]} />
                    </div>
                    <div className="mb-3 pt-4">
                        <div>
                            <h5>Number of people</h5>
                        </div>
                        <PersonCountSelector numberOfPerson={numberOfPerson} setPerson={setPerson} paxMin={tableType.paxMin} paxMax={tableType.paxMax} />
                    </div>
                    <div className="d-none d-md-block">
                        { rate ?
                            <div className="pt-5 mt-5">
                                <Table bordered>
                                    <tbody className="rounded">
                                        <tr className="font-weight-bold">
                                            <td className="text-left">Sub total</td>
                                            <td className="text-right">&#8377;{rate}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div> : ""
                        }
                        <div className="text-danger text-center mt-1">
                            { error1 ? error1 : "" }
                        </div>
                        <div className="text-center pt-2 mb-5">
                            { !loading1 ?
                                <button className="btn btn-solid-reg" onClick={previewBooking}>
                                    Next
                                </button>
                                :
                                <Loader />
                            }
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .container {
                        max-width: 800px;
                    }
                    .bookButton{
                        bottom: 0;
                        background: white;
                        box-shadow: 0px 0px 5px 1px silver;
                        font-size: 0.8rem;
                        z-index: 20;
                    }
                `}</style>
            </div>
        )
    } else if (count == 1){
        var currentComponent = (
            <div>
                <div className="bookButton d-block d-md-none position-fixed w-100 text-center text-white px-3 py-2">
                        <div className="text-danger text-center d-none d-md-block py-3 mt-3">
                            { error2 ? <><FaInfoCircle color="red" /> {error2} </> : "" }
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text-muted">
                                <span className="font-weight-bold">Total: </span>&#8377;{orderDetails.totalAmount}
                            </div>
                            { !loading2 ?
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-inline-block p-1">
                                        <button className="btn btn-outline-reg d-flex align-items-center justify-content-center p-2" onClick={handleBack}>
                                            <FaChevronLeft />
                                        </button>
                                    </div>
                                    <div className="d-inline-block p-1">
                                        <button className="btn btn-solid-reg" onClick={() => checkUser(confirmBooking, props.handleModal)}>
                                            Place Order
                                        </button>
                                    </div>
                                    
                                </div>
                            :
                                <div className="text-right">
                                    <BounceLoader color="#00c5ca" size="51px" />
                                </div>
                            }
                        </div>
                        
                </div>
                <div className="p-0 container my-0 mx-auto">
                    <ListItem
                        restaurant={props.result}
                        full={true}
                        noClick={true}
                        bordered={true}
                    />
                    <div className="d-flex justify-content-center p-2 m-2">
                        <OrderBrief
                            full={true}
                            numberOfPerson={numberOfPerson}
                            timestamp={new Date(orderDetails.timeStart)}
                        />
                    </div>
                    <div className="d-flex align-content-stretch no-gutters px-3 promoBox mx-auto my-2 py-2">
                        <div className="w-75 form-group">
                            <input disabled={!!promo} name="promo" type="text" className="form-control-input combined-input py-2" placeholder="Promo code" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} />
                        </div>
                        { !promoMsg.loading ?
                            <>
                                { promo ?
                                    <div className="w-25">
                                        <div className="btn bg-danger btn-combined w-100" onClick={() => checkUser(removePromo, props.handleModal)}>REMOVE</div>
                                    </div> :
                                    <div className="w-25">
                                        <div className="btn btn-solid-reg btn-combined w-100" onClick={() => checkUser(promoValidation, props.handleModal)}>APPLY</div>
                                    </div>
                                }
                            </>
                            :
                            <div className="w-25 pt-1">
                                <BounceLoader color="#00c5ca" size="39px" css="margin: auto" />
                            </div>
                        }
                    </div>
                    <div className="text-danger py-1 text-center">
                        { promoMsg.error ? promoMsg.error : "" }
                    </div>
                    <div className="text-success py-1 text-center">
                        { promoMsg.success ? promoMsg.success : "" }
                    </div>
                    <div className="p-3 text-muted">
                        This is a tentative amount, which might change according to your actual usage.
                        The amount is payable when you checkout.
                    </div>
                    <div className="py-3">
                        <div className="bg-white m-3 p-0 rounded">
                            <Table borderless>
                                <tbody className="rounded">
                                    { rateType == "FLAT" ?
                                        <tr>
                                            <td className="text-left">Rented Space : <span className="font-weight-bold">&#8377;{rate}</span> ({Math.round(((time.max-time.min)/60)*10)/10} hours, {numberOfPerson} people)</td>
                                            <td className="text-right">&#8377;{orderDetails.subTotal}</td>
                                        </tr>
                                        :
                                        <tr>
                                            <td className="text-left">Rented Space : <span className="font-weight-bold">&#8377;{rate}</span> &times;{Math.round(((time.max-time.min)/60)*10)/10} hours &times;{numberOfPerson} people</td>
                                            <td className="text-right">&#8377;{orderDetails.subTotal}</td>
                                        </tr>
                                    }
                                    <tr className="font-weight-bold">
                                        <td className="text-left">Sub total</td>
                                        <td className="text-right">&#8377;{orderDetails.subTotal}</td>
                                    </tr>
                                    { promo ?
                                    <tr className="font-weight-bold">
                                        <td className="text-left">Discount</td>
                                        <td className="text-right">-&#8377;{orderDetails.promoDebitedValue}</td>
                                    </tr> : <></>
                                    }
                                    <tr>
                                        <td className="text-left">GST @ {(props.result.tax && props.result.tax.gstSpace*100) || 18}%</td>
                                        <td className="text-right">&#8377;{orderDetails.calculatedGst}</td>
                                    </tr>
                                    {/* { props.result.tax && props.result.tax.serviceCharge &&
                                        <tr>
                                            <td className="text-left">Service Charge @ {props.result.tax.serviceCharge*100}%</td>
                                            <td className="text-right">&#8377;{orderDetails.calculatedServiceTax}</td>
                                        </tr>
                                    } */}
                                    <tr className="font-weight-bold border-top">
                                        <td className="text-left">Total</td>
                                        <td className="text-right">&#8377;{orderDetails.totalAmount}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="px-3">
                        { freeOrder ? 
                            <div className="text-success text-center">
                                Congratulations, you have got yourself a free order!
                            </div>
                            :
                            <PaymentTypeSelector paymentType={paymentType} setPaymentType={setPaymentType} />
                        }
                    </div>
                    <div className="d-none d-md-block">
                        <div className="text-danger text-center d-none d-md-block py-3 mt-3">
                            { error2 ? error2 : "" }
                        </div>
                        <div className="text-center">
                            { !loading2 ?
                                <>
                                    <div className="d-inline-block p-1">
                                        <button className="btn btn-outline-reg" onClick={handleBack}>
                                            Back
                                        </button>
                                    </div>
                                    <div className="d-inline-block p-1">
                                        <button className="btn btn-solid-reg" onClick={() => checkUser(confirmBooking, props.handleModal)}>
                                            Confirm Order
                                        </button>
                                    </div>
                                </>
                            :
                            <Loader />
                        }
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .container {
                        max-width: 700px;
                    }
                    .bookButton{
                        bottom: 0;
                        background: white;
                        box-shadow: 0px 0px 5px 1px silver;
                        font-size: 1rem;
                        z-index: 20;
                    }
                `}</style>
            </div>
        )
    }
    return (
        <>
            <div className="py-1 py-md-5">
                <div>
                    {currentComponent}
                </div>
            </div>
            <style jsx>{`
                .active {
                    height: auto;
                    opacity: 1;
                }
                .disabled {
                    height: 0;
                    opacity: 0;
                }
            `}</style>
        </>
    )
}

function Template(props){
    const [ allow, setAllow ] = React.useState(false)
    React.useEffect(() => {
        if(props.result.bookingDisabled){
            Router.push(`/space/${props.result.slug}`)
        }else {
            setAllow(true)
        }
    } ,[])
    return(
        <>
            { allow ?
                <Layout>
                    <Head>
                        <title>Book Space | {props.result.name} | Nestin - Coworking spaces</title>
                    </Head>
                    <Booking
                        result={props.result}
                        location={props.location}
                        user={props.user}
                    />
                </Layout> :
                <></> 
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const slug = context.params.slug// "hyatt-place-sector-18"
    var location = { wc: null, Rc: null }
    let firebase = await loadFirebase();
    let result = await new Promise((resolve, reject) => {
        firebase.firestore().collection('restaurants')
            .where( 'slug', '==', slug )
            .get()
            .then(snapshot => {
                if(!snapshot.docs.length){
                    console.log('No such  restaurants');
                    context.res.writeHead(301, {
                        Location: '/404'
                    });
                    context.res.end();
                    return;
                }
                let items = []
                snapshot.forEach(doc => {
                    items.push({ ...doc.data(), id: doc.id })
                })
                location = { wc: items[0].location._lat, Rc: items[0].location._long }
                resolve(items[0])
            })
            .catch(error => {
                console.log(error)
            });
    });
    result.location = null;
    return { props: { result, location } }
}

export default withAuth(Template);
