import Flickity from 'react-flickity-component'
import { FaStar } from 'react-icons/fa'
import { loadFirebase } from '../lib/firebase'
import Link from 'next/link'
import { getCurrentCity } from '../utils/functions'

export function FeaturedItem(props){
    return (
        <div className="feat-container">
            <div className="feat-item">
                <div className="feat-image">
                    <img src={props.imageUrl} />
                    <div className="feat-rating"><FaStar />&nbsp;{props.rating || "--"}</div>
                </div>
                <div className="feat-content">
                    <div className="feat-heading">
                        {props.name}
                    </div>
                    <div className="feat-des">
                        {props.address}
                    </div>
                    <div className="feat-price">
                        {props.price}
                    </div>
                </div>
            </div>
        </div>
    )
}

const flickityOptions = {
    initialIndex: 0,
    cellAlign: 'center',
    contain: true,
    groupCells: '50%',
    pageDots: false,
    pauseAutoPlayOnHover: false,
    selectedAttraction: 0.013,
    friction: 0.3
}

export default class Featured extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items : props.restaurants || []
        }
    }

    async componentDidMount() {
      if (!this.state.items || this.state.items.length == 0) {
        let firebase = await loadFirebase();
        let result = await new Promise((resolve, reject) => {
            firebase.firestore().collection('restaurants')
                .where('city', "==", getCurrentCity())
                .where('featured', "==", true)
                .get()
                .then(snapshot => {
                    let items = [];
                    snapshot.forEach(doc => {
                        items.push(doc.data());
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
    }

    // TODO Server Side Rendering Issue dur to Flickity - fix it somehow?
    render(){
        return (
            <section className="section-featured bg-white py-5">
                <div className="container">
                    <div className="feat-header container">
                        <div className="lead font-weight-bold">
                            Featured <span style={{color: "00c5ca"}}>Spaces</span>
                        </div>
                        <div>
                            <Link href="listings">
                                <a>View All</a>
                            </Link>
                        </div>
                    </div>
                    <div className="container p-0 my-2">
                        <Flickity
                            className={'carousel'} // default ''
                            elementType={'div'} // default 'div'
                            options={flickityOptions} // takes flickity options {}
                            disableImagesLoaded={false} // default false
                            reloadOnUpdate={true} // default false
                            static={false} // default false
                        >
                            {this.state.items.map((rest,index) =>
                                <div key={index} className="carousel-cell">
                                    <Link href={`/space/${rest.slug}`}>
                                        <a>
                                            <FeaturedItem
                                                name={rest.name}
                                                address={rest.address}
                                                price={rest.pricingText}
                                                imageUrl={rest.thumb}
                                                rating={rest.rating}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </Flickity>
                        <style jsx>{`
                            .carousel-cell {
                                max-width: 300px;
                            }
                        `}</style>
                    </div>
                </div>
            </section>
        )
    }
}
