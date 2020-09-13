import Flickity from 'react-flickity-component'
import Link from 'next/link'
import { loadFirebase } from '../lib/firebase'
import { getCurrentCity } from '../utils/functions'

const flickityOptions = {
    initialIndex: 2,
    wrapAround: true,
    groupCells: 2,
    cellAlign: 'center',
    contain: true,
    groupCells: false,
    autoPlay: 3500,
    prevNextButtons: false,
    pageDots: false,
    pauseAutoPlayOnHover: false,
    selectedAttraction: 0.013,
    friction: 0.3
}

export default class HomeBanners extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items : []
        }
    }
    async componentDidMount() {
        let firebase = await loadFirebase();
        let result = await new Promise((resolve, reject) => {
            firebase.firestore().collection('banners')
                .where('isActive', "==", true)
                .get()
                .then(snapshot => {
                    let items = [];
                    snapshot.forEach(doc => {
                        var temp = doc.data().cities.filter( (city) => city.name == getCurrentCity() )
                        if( temp.toString() ){
                            var data = doc.data()
                            if ( data.startDate.toDate() <= new Date() && data.endDate.toDate() >= new Date() ){ 
                                items.push(doc.data());
                            }
                        }
                    });
                    resolve(items);
                })
                .catch(error => {
                    console.log(error)
                    reject([]);
                });
        });
        this.setState({items: result})
    }
    render(){
        const banners = this.state.items
        return (
            <div className="container py-2 py-md-5 pt-md-5">
                <h2 className="mb-5">Workspaces for <span style={{color: "#00c5ca"}}> everyone</span></h2>
                <Flickity
                    className={'carousel'}
                    elementType={'div'}
                    options={flickityOptions}
                    disableImagesLoaded={false}
                    reloadOnUpdate={true}
                    static={false}
                >
                    {banners.map( (item,index) =>
                        <div key={index} className="carousel-cell">
                            { item.url ? 
                                <Link href={item.url}>
                                    <a><img src={item.imageUrl} /></a>
                                </Link>
                                : 
                                <img src={item.imageUrl} /> 
                            }
                            
                        </div> 
                    )}
                </Flickity>
            </div>
        )
    }
}