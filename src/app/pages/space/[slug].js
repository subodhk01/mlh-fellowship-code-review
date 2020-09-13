import Head from 'next/head'
import Layout from '../../components/Layout'
import { loadFirebase } from '../../lib/firebase'
import RestaurantDetail from '../../components/RestaurantDetail'

function Template(props){
    const [ item, setItem ] = React.useState({
        location: []
    })
    return (
        <Layout>
            <Head>
                <title>{props.result.name} | Nestin - Best Coworking spaces</title>
            </Head>
                <RestaurantDetail
                    restaurant={props.result}
                    amenities={props.amenities}
                    name={props.result.name}
                    images={props.result.images}
                    rating={props.result.rating}
                    ratings={props.ratings}
                    address={props.result.address}
                    pricingText={props.result.pricingText}
                    imageURL={props.result.thumb}
                    location={{ lat: props.location.wc, lng: props.location.Rc }}
                />
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const slug = context.params.slug
    var location = { wc: null, Rc: null }
    let firebase = await loadFirebase();
    let result = await new Promise((resolve, reject) => {
        firebase.firestore().collection('restaurants')
            .where( 'slug', '==', slug )
            .get()
            .then(snapshot => {
                if(!snapshot.docs.length){
                    console.log('No such  restaurant');
                    context.res.writeHead(301, {
                        Location: '/404'
                    });
                    context.res.end();
                    return;
                }
                let items = []
                snapshot.forEach(doc => {
                    var temp = doc.data()
                    temp.id = doc.id
                    items.push(temp)
                })
                location = { wc: items[0].location._lat, Rc: items[0].location._long }
                resolve(items[0])
            })
            .catch(error => {
                console.log(error)
            });
    });
    result.location = null;

    const id = result.id
    let ratings = await new Promise((resolve, reject) => {
        firebase.firestore().collection('restaurants').doc(id)
        .collection('ratings')
            .get()
            .then(snapshot => {
                let items = [];
                snapshot.forEach(doc => {
                    var rating = doc.data();
                    rating.timestamp = rating.timestamp.toDate().toDateString();
                    if( rating.reply ) rating.reply.timestamp = rating.reply.timestamp.toDate().toDateString();
                    items.push(rating);
                });
                resolve(items);
            })
            .catch(error => {
                console.log(error)
                resolve([])
            });
    });

    var amenityList = []
    result.amenities.map((item,index) => amenityList.push(item.id))

    let amenities = await new Promise((resolve, reject) => {
        firebase.firestore().collection('amenities')
        .where( firebase.firestore.FieldPath.documentId(), 'in', amenityList )
        .where( 'enabled', '==', true )
            .get()
            .then(snapshot => {
                let items = [];
                snapshot.forEach(doc => {
                    var temp = doc.data()
                    temp.id = doc.id
                    var amenity = result.amenities.filter(item => item.id == temp.id)[0]
                    if(amenity.text){
                        temp.text = amenity.text
                    }else{
                        var textId = amenity.textId
                        temp.text = temp.texts.filter(item => item.textId == textId)[0].text
                    }
                    items.push(temp);
                });
                resolve(items);
            })
            .catch(error => {
                console.log(error)
                resolve([])
            });
    });

    return { props: { result, location, ratings, amenities } }
}

export default Template;
