import Layout from '../components/Layout'
import TextImage from '../components/TextImage'
import TeamCard from '../components/TeamCard'

export default function Template() {
    return (
        <Layout>
            <div className="container-fluid p-0 m-0 pb-5 bg-white w-100">
                <div className="pt-5 px-4 mx-auto text-center" style={{maxWidth: "900px"}}>
                    <h1 className="mb-5">
                        <span style={{color: "#00c5ca"}}>Nestin</span> Coworking Space
                    </h1>
                    <p style={{fontSize: "1.04rem"}} className="text-justify">
                        NestIn is a NSRCEL (IIM Bangalore) incubated startup started by two IIM Bangalore alumni.<br /><br /> 
                        We at NestIn believe in building more from less. Whether it is your skills when you work for 
                        us or it is your neighborhood cafes, everything has a little extra unexplored potential. Our 
                        philosophy is that there are no silos in life, so why not transform the idea of cafes - from 
                        public coffee houses to social connection harbors! <br /><br /> 
                        NestIn aims to metamorphose your idea of chilling by introducing multi-purpose 
                        nests - be it sports events, corporate meetings, speed dating, or creating the perfect 
                        co-working environment, we enable it all right inside the cafe next to you.
                    </p>
                </div>
                <TextImage heading="" image="images/new/office1.svg">
                    <p style={{fontSize: "1rem"}}>
                    Who doesn’t like a comfortable seat with fast internet in a cosy space, with food and drinks 
                    available as you like it? Such a place, not your home with high mortgages or your office that 
                    is forever dully starting you in the face. We all like change, and this is the place with zero 
                    commitment, a place that you can change as you like, when you want. Recovering all that lost 
                    attention at home, or the hours lost in traffic to office, you shall have an ideal space, close 
                    to your place, or your choice – 

                    That, you’ll call, your nest, aka, NestIn Spaces.
                    </p>
                </TextImage>
                <TextImage heading="" image="images/new/office2.svg" reverse>
                    <p style={{fontSize: "1rem"}}>
                    Whether you a book reader, or a freelance, or a photographer, a digital marketer, a blog owner, a 
                    content creator, a designer, a consultant, or a small start-up, or a big firm – we know that 
                    you dream. We share your passionate dreams and to nurture your dreams, we give you an experience 
                    which we believe would make you happier. It’s not a coworking space. To repeat, it’s your nest.

                    The Space Next Door is just a part of the facilitation we shall provide you, stay tuned.
                    </p>
                </TextImage>
                {/* <div className="cardContainer text-center p-3 py-5 m-auto d-md-block d-lg-flex justify-content-center align-items-center">
                    <TeamCard 
                        name="David Gardner"
                        info="Cheif Product Officer"
                        image="images/faces/facecard1.jpg"
                    />
                    <TeamCard 
                        name="David Gardner"
                        info="Cheif Product Officer"
                        image="images/faces/facecard1.jpg"
                    />
                    <TeamCard 
                        name="David Gardner"
                        info="Cheif Product Officer"
                        image="images/faces/facecard1.jpg"
                    />
                </div> */}
            </div>
            <style jsx>{`
                .cardContainer {
                    background-color: #e2f2fdc7;
                }
            `}</style>
        </Layout>
    )
}