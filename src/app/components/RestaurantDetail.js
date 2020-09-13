import Rating from 'react-rating'
import Link from 'next/link'
import * as FaFonts from '../utils/font' 
import { FaIcon } from '../utils/functions'
import { FaEnvelope, FaInfoCircle } from 'react-icons/fa'
import { Map, GoogleApiWrapper,  Marker } from 'google-maps-react';
import Flickity from 'react-flickity-component'
import { getSliderLabel } from '../utils/functions'
import { MAP_API_KEY } from '../utils/constants'
import Loader from '../lib/loader'

const flickityOptions = {
    initialIndex: 2,
    wrapAround: true,
    groupCells: 2,
    cellAlign: 'center',
    contain: true,
    groupCells: false,
    setGallerySize: true,
    autoPlay: 3500,
    prevNextButtons: false,
    pageDots: false,
    pauseAutoPlayOnHover: false,
    selectedAttraction: 0.021,
    friction: 0.3
}

function RestaurantDetail(props){
    console.log(props.restaurant.bookingDisabled)
    return (
        <div>
            <div className={`bookButton ${props.restaurant.bookingDisabled ? "d-none" : "d-block"} d-md-none position-fixed w-100 text-center text-white font-weight-bold px-1 py-3`}>
                <Link href={`/book/${props.restaurant.slug}`}>
                    <div>
                        Book Now
                    </div>
                </Link>
            </div>
            <div className="container-fluid p-0 bg-white">
                <section className="section-default section-image">
                    <Flickity
                        className={'carousel'}
                        elementType={'div'}
                        options={flickityOptions}
                        disableImagesLoaded={false}
                        reloadOnUpdate={true}
                        static={false}
                    >
                        {props.images && props.images.map( (item,index) =>
                            <div key={index} className="carousel-cell">
                                <img src={item} />
                            </div>
                        )}
                    </Flickity>
                </section>
                <section className="section-default section-content py-4 px-2">
                    <div className="position-relative m-auto container">
                        {props.restaurant.bookingDisabled && 
                            <div className="py-2">
                                <div className="alert alert-info">
                                    <FaInfoCircle size="20" /> &nbsp; {props.restaurant.bookingDisabledMessage}
                                </div>
                            </div>
                        }
                        <div className="row content-heading-rating">
                            <div className=" col-sm-12 col-md-5 col-lg-6">
                                <h2 className="mb-2">
                                    {props.name}
                                </h2>
                                <div className="content-address mb-3 text-muted p-large">
                                    {props.address}, {props.restaurant.city}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-3">
                                <div className="d-none d-md-block">
                                    { props.restaurant.bookingDisabled ? 
                                        <a>
                                            <button 
                                                className={`btn btn-solid-lg btn-disabled`} disabled={true}>
                                                Book Now
                                            </button>
                                        </a> :
                                        <Link href={`/book/${props.restaurant.slug}`}>
                                            <a>
                                                <button className={`btn btn-solid-lg`}>
                                                    Book Now
                                                </button>
                                            </a>
                                        </Link>
                                    }
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-3 col-lg-3 text-md-right">
                                <h4 className="position-relative d-inline-block">
                                    <Rating
                                        initialRating={props.rating}
                                        emptySymbol={<FaFonts.FaStar />}
                                        fullSymbol={<FaFonts.FaStar color="orange" />}
                                        readonly
                                    />
                                </h4>
                                <div className="d-inline-block ml-2">
                                    {props.rating}{' '}
                                    <span className="text-muted p-large">
                                      ({props.restaurant.numRating ? props.restaurant.numRating + " Reviews" : "No reviews yet"})
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="content-price-hours mb-3 d-flex align-items-center">
                            <div className="content-price d-inline-block mr-4">
                                <h5 className="font-weight-normal mb-1 text-uppercase">Pricing</h5>
                                <div><span className="price">{props.pricingText}</span></div>
                            </div>
                            <div className="content-hours d-inline-block">
                                <h5 className="font-weight-normal mb-1 text-uppercase">Open Hours</h5>
                                <div>
                                    <span className="hour">{getSliderLabel(props.restaurant.timings[0].startTime)} - {getSliderLabel(props.restaurant.timings[0].endTime)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row py-4">
                            <div className="content-overview col-12 col-md-6 mb-3">
                                <div className="mb-3">
                                    <h5 className="font-weight-normal mb-1 text-uppercase">Overview</h5>
                                    <div className="content-overview-content">
                                        {props.restaurant.overview}
                                    </div>
                                </div>
                                <div>
                                    <div className="content-map">
                                        <h5 className="font-weight-normal mb-1 text-uppercase">Location</h5>
                                        <div className="content-map-container">
                                            <Map
                                                zoom={14}
                                                google={props.google}
                                                initialCenter={props.location}
                                            >
                                                <Marker position={props.location} />
                                            </Map>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-facilities col-sm-12 col-md-6 mb-3 align-self-start">
                                <div className="content-contact">
                                    <h5 className="font-weight-normal mb-1 text-uppercase">Contact</h5>
                                    <div>
                                        { props.restaurant.contact.emails &&
                                            <div>
                                                {props.restaurant.contact.emails.map((item, index) => <div><FaEnvelope className={`mr-2 ${index > 0 ? 'text-white': 'text-primary'}`} /> {item}</div>)}
                                            </div>
                                        }
                                        { props.restaurant.contact.phones &&
                                            <div>
                                                {props.restaurant.contact.phones.map((item, index) => <div><FaFonts.FaPhone className={`mr-2 ${index > 0 ? 'text-white': 'text-primary'}`}  /> {item}</div>)}
                                            </div>
                                        }
                                    </div>
                                </div>
                                <h5 className="font-weight-normal mb-1 text-uppercase">Facilities</h5>
                                <div className="d-flex flex-wrap align-items-stretch">
                                    {props.amenities.map((item,index) =>
                                        <div key={index} className="fac-cont p-2">
                                            <div className="fac-item rounded p-2 h-100">
                                                <div className="fac-icon mb-1 d-flex align-items-center justify-content-center">
                                                    { FaIcon(item.webIcon).type && FaIcon(item.webIcon) }
                                                </div>
                                                <div className="fac-heading">{item.name}</div>
                                                <div className="fac-des">{item.text}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="content-reviews mb-3">
                            <h4 className="font-weight-normal mb-1 text-uppercase">Reviews</h4>
                            {props.ratings.length > 0 ? <div className="content-reviews-container row">
                                {props.ratings.map((rating,index) =>
                                    <div key={index} className="review-cont col-sm-12 col-md-6">
                                        <ReviewItem  rating={rating} restaurantName={props.restaurant.name} />
                                    </div>
                                )}
                            </div> : "No reviews yet!"}
                        </div>
                    </div>
                </section>
            </div>
            <style jsx>{`
                .section-image {
                    background-color: rgb(0,0,0,0.75);
                    min-height: 300px;
                    box-shadow: 0px 0px 100px 10px rgba(0, 0, 0, 0.774) inset;
                }
                .carousel-cell {
                    margin: 0;
                    width: 100%;
                    text-align: center;
                    max-height: 46vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .carousel-cell img {
                    width: 100%;
                    border-radius: 0px;
                }
                .bookButton{
                    bottom: 0;
                    font-size: 1.3rem;
                    background: linear-gradient(45deg, #00c5ca, #0edbe0);
                    z-index: 20;
                }
            `}</style>
        </div>
    )
}

const LoadingContainer = (props) => (
    <div className="loadercontainer d-flex align-items-center">
        <Loader />
        <style jsx>{`
                .loadercontainer {
                    min-height: 600px;
                }
        `}</style>
    </div>
)

export default GoogleApiWrapper({
    apiKey: MAP_API_KEY,
    LoadingContainer: LoadingContainer
})(RestaurantDetail);

export function ReviewItem({ rating, restaurantName }){
    return (
        <div className="review-item">
            <div className="row no-gutters review-head align-items-center">
                <div className="col-6">
                    <div className="review-name-date">
                        <div className="review-name font-weight-bold">{rating.name}</div>
                        <div className="review-date">{rating.date}</div>
                    </div>
                </div>
                <div className="col-6 align-self-start text-right pr-3">
                    <div className="review-option">
                        <Rating
                            initialRating={rating.rating}
                            emptySymbol={<FaFonts.FaStar />}
                            fullSymbol={<FaFonts.FaStar color="orange" />}
                            readonly
                        />
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <div className="review-des pt-3">
                    {rating.review}
                </div>
            </div>
            { rating.reply ? 
                <div className="alert alert-info p-3">
                    <div className="mb-2" style={{fontSize: "16px"}}>
                        Reply from <span className="font-weight-bold">{restaurantName}</span>
                    </div>
                    <div>
                        {rating.reply.reply}
                    </div>
                </div> : ""
            }
        </div>
    )
}
