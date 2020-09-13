import Layout from '../components/Layout'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import { loadFirebase } from '../lib/firebase'
import getUser from '../lib/getUser'
import withAuth from '../lib/withAuth'
import { FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa'
import { FcNext } from 'react-icons/fc'
import HorizontalTimeline from '../components/HorizontalTimeline'
import OrderBrief from '../components/OrderBrief'
import Loader from '../lib/loader'

class Listing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orders : [],
            loading: true,
            msg: false,
        }
    }

    async componentDidMount() {
        let firebase = await loadFirebase();
        let user = await getUser();
        if(!user){
            Router.push('/')
        }else{
            let restaurantList = new Set()
            let result = await new Promise((resolve, reject) => {
                firebase.firestore().collection('orders')
                    .where('userId', '==', user.uid)
                    .where('orderPlaced', "==", true)
                    .orderBy("time", "desc")
                    .get()
                    .then(snapshot => {
                        let items = [];
                        snapshot.forEach(doc => {
                            var temp = doc.data();
                            temp.id = doc.id;
                            restaurantList.add(temp.restaurantId)
                            items.push(temp);
                        });
                        resolve(items);
                    })
                    .catch(error => {
                        console.log(error)
                        this.setState({
                            msg: "Unable to process your request, Please try again!",
                            loading: false
                        })
                        reject([]);
                    });
            });
            if(!result.length){
                this.setState({
                    msg: "No orders yet",
                    loading: false
                })
                return
            }
            let restaurants = await new Promise((resolve, reject) => {
                firebase.firestore().collection('restaurants')
                    .where( 'id', 'in', [...restaurantList] )
                    .get()
                    .then(snapshot => {
                        let items = {};
                        snapshot.forEach(doc => {
                            items[doc.id] = doc.data()
                        });
                        resolve(items);
                    })
                    .catch(error => {
                        console.log(error)
                        this.setState({
                            msg: "Unable to process your request, Please try again!",
                            loading: false
                        })
                        reject([]);
                    });
            });
            for( const order of result ){
                order.restaurant = restaurants[order.restaurantId]
            }
            result.sort(function(a,b){
                return new Date(b.timeStart) - new Date(a.timeStart);
            });
            this.setState({
                loading: false,
                orders: result
            })
        }
    }

    render(){
        const orders = this.state.orders;
        return (
            <Layout>
                <Head>
                    <title>Orders | Nestin - flexible working - right from space next to you!</title>
                </Head>
                <div className="container px-0">
                    {this.state.msg ? 
                        <>
                            <div className="text-center p-3 text-muted">
                                {this.state.msg}
                            </div>
                        </> 
                        : <></>
                    }
                    {this.state.loading ?
                        <div className="py-5">
                            <Loader />
                        </div>    
                        :
                        <></>
                    }
                    {orders.map( ( item, index ) =>
                        <OrderItem
                            key={index}
                            id={item.id}
                            bookingid={item.orderId}
                            timeStart={item.timeStart}
                            name={item.restaurant.name}
                            address={item.restaurant.address}
                            numberOfPerson={item.numPeople}
                            stage={item.status}
                            paymentMode={item.paymentMode}
                        />
                    )}
                </div>
                <style jsx>{`
                    .container {
                        min-height: 80vh;
                    }
                `}</style>
            </Layout>
        )
    }
}

export default withAuth(Listing)

function OrderItem(props){
    return (
        <Link href={`/order/${props.id}`}>
            <a>
                <div className="bg-white p-3 rounded m-3 row no-gutters cursor-pointer">
                    <div className="col-12 col-md-12">
                        <div className="row no-gutters">
                            <div className="col-12 col-md-5 pl-lg-4 pr-2">
                                <div className="text-muted p-1">
                                    BOOKING #{props.id}
                                </div>
                                <div className="mb-3">
                                    <h4 className="font-weight-bold">{props.name}</h4> <FaMapMarkerAlt /><span className="text-muted"> {props.address}</span>
                                </div>
                                {props.paymentMode == "CASH" && 
                                    <div className="text-danger">
                                        <FaInfoCircle /> Your Payment for the following order is still pending.
                                    </div>
                                }
                            </div>
                            <OrderBrief
                                full={false}
                                numberOfPerson={props.numberOfPerson}
                                timestamp={new Date(props.timeStart)}
                            />
                            <div className="col-1 col-md-1 text-right pr-3 d-none d-sm-none d-md-flex d-lg-flex d-xl-flex align-items-center justify-content-center">
                                <div><FcNext size="33" /></div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <HorizontalTimeline stage={props.stage} />
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}
