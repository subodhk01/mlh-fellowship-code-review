import Layout from '../components/Layout'
import TestimonialCarousel from '../components/TestimonialCarousel'
import { Item } from '../components/TestimonialCarousel'

const data = [
    {
        name:"Tes Kulakhvich",
        position:"Designer",
        image:"images/faces/face1.png",
        comment:"Dear diary, today I posted my fire icons and got 100M views, my life has changed forever now. Fire is love"
    },
    {
        name:"Tes Kulakhvich",
        position:"Designer",
        image:"images/faces/face1.png",
        comment:"Dear diary, today I posted my fire icons and got 100M views, my life has changed forever now. Fire is love"
    },
    {
        name:"Tes Kulakhvich",
        position:"Designer",
        image:"images/faces/face1.png",
        comment:"Dear diary, today I posted my fire icons and got 100M views, my life has changed forever now. Fire is love"
    },
    {
        name:"Tes Kulakhvich",
        position:"Designer",
        image:"images/faces/face1.png",
        comment:"Dear diary, today I posted my fire icons and got 100M views, my life has changed forever now. Fire is love"
    },
]

export default function Template() {
    return (
        <Layout>
            <div className="outer1 outer d-none d-md-block">
                <div className="text-center w-100 pt-5">
                    <h1 className="mb-4">Testimonials</h1>
                    <p className="w-50 text-justify m-auto lead">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus,
                        neque nulla. Veritatis nihil, ipsam pariatur voluptatum placeat, quidem
                        sequi et accusamus quis perspiciatis laudantium ducimus officiis illo
                        ratione quas facere!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus,
                        neque nulla. Veritatis nihil, ipsam pariatur voluptatum placeat, quidem
                        sequi et accusamus quis perspiciatis laudantium ducimus officiis illo
                        ratione quas facere!
                    </p>
                </div>
                <div className="carouselContainer m-auto">
                    <TestimonialCarousel data={data} />
                </div>
            </div>
            <div className="outer2 outer py-1 d-block d-md-none">
                <div className="text-center w-100 pt-1 m-auto">
                    <h1 className="mb-1">Testimonials</h1>
                    <p className="content p-4 text-justify m-auto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus,
                        neque nulla. Veritatis nihil, ipsam pariatur voluptatum placeat, quidem
                        sequi et accusamus quis perspiciatis laudantium ducimus officiis illo
                        ratione quas facere!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus,
                        neque nulla. Veritatis nihil, ipsam pariatur voluptatum placeat, quidem
                        sequi et accusamus quis perspiciatis laudantium ducimus officiis illo
                        ratione quas facere!
                    </p>
                </div>
                <div className="m-auto">
                    { data.map((item, index) => 
                        <div key={index} className="col-xs-12 col-md-6 d-none d-inline-block">
                            <Item
                                name={item.name}
                                position={item.position}
                                image={item.image}
                                comment={item.comment}
                            />
                        </div>
                    )} 
                </div>
            
            </div>
            <style jsx>{`
                .outer{
                    background-image: url("/images/bg/painting.jpg");
                    background-size: cover;
                    background-repeat: repeat;
                    background-position: center;
                }
                .outer2>div {
                    max-width: 800px;
                }
                .content {
                    max-width: 500px;
                }
                .carouselContainer {
                    max-width: 650px;
                    padding: 100px 0px;
                }
            `}</style>
        </Layout>
    )
}
