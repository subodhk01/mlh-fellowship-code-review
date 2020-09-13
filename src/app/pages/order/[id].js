import Layout from '../../components/Layout'
import Router, { useRouter } from 'next/router'
import { loadFirebase } from '../../lib/firebase'
import OrderDetail from '../../components/OrderDetail'
import Head from 'next/head'

function Template(props){
    return (
        <div>
            <Head>
                <link rel="stylesheet" href="/css/order-details.css" />
            </Head>
            <Layout>
                <OrderDetail
                    order={props.order}
                    restaurant={props.restaurant}
                />
            </Layout>
        </div>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id
    let firebase = await loadFirebase();
    let order = await new Promise((resolve, reject) => {
        firebase.firestore().collection('orders').doc(id)
            .get()
            .then(doc => {
                if(!doc.exists){
                    console.log('No such orders');
                    context.res.writeHead(301, {
                        Location: '/404'
                      });
                    context.res.end();
                    return;
                }
                var temp = doc.data();
                temp.id = doc.id
                temp.time = temp.time.toDate().toString()
                console.log(temp.time)
                resolve(temp)
            })
            .catch(error => {
                console.log(error)
                reject([]);
            });
    });
    const restId = order.restaurantId
    let restaurant = await new Promise((resolve, reject) => {
        firebase.firestore().collection('restaurants').doc(restId)
            .get()
            .then(doc => {
                if(!doc.exists){
                    console.log('No such Restaurant');
                    context.res.writeHead(301, {
                        Location: '/404'
                      });
                    context.res.end();
                    return;
                }
                resolve(doc.data())
            })
            .catch(error => {
                console.log(error)
                reject([]);
            });
    });
    restaurant.location = null
    return { props: { order, restaurant } }
}


export default Template;
