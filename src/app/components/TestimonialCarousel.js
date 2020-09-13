import Flickity from 'react-flickity-component'
import {FaQuoteLeft} from 'react-icons/fa'

const flickityOptions = {
    initialIndex: 2,
    wrapAround: true,
    groupCells: 2,
    fade: true
}

export default function TestimonialCarousel(props) {
    return (
        <div className="container">
            <Flickity
                className={'carousel'} // default ''
                elementType={'div'} // default 'div'
                options={flickityOptions} // takes flickity options {}
                disableImagesLoaded={false} // default false
                reloadOnUpdate // default false
                static // default false
            >
                { props.data.map((item, index) =>
                    <div key={index} className="carousel-cell w-50">
                        <Item 
                            name={item.name}
                            position={item.position}
                            image={item.image}
                            comment={item.comment}
                        />
                    </div>
                )}
            </Flickity>
        </div>
    )
}   

export function Item({name, image, position, comment}) {
    return (
        <div className="item px-4 pt-4 m-4 border bg-white">
            <div>
                <FaQuoteLeft color="lightblue" size="30" />
            </div>
            <div className="content py-4 text-muted">
                {comment}
            </div>
            <div className="row no-gutters py-4 border-top align-items-center">
                <div className="col-4 text-center">
                    <img src={image} className="rounded-circle" />
                </div>
                <div className="col-8">
                    <div className="heading font-weight-bold"><h6 className="m-0">{name}</h6></div>
                    <div className="subheading text-muted">{position}</div>
                </div>
            </div>
            <style jsx>{`
                .item {
                    border-radius: 10px;
                    box-shadow: 0px 3px 14px -5px #344478;
                }
                img {
                    width: 50px;
                }
            `}</style>
        </div>
    )
}