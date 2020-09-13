import Layout from '../components/Layout'
import TextImage from '../components/TextImage'
import ContactForm from '../components/RestaurantLeadsContactForm'
import { FaCircle, FaCircleNotch, FaDotCircle } from 'react-icons/fa'

export default function Template() {
    return (
        <Layout>
            <div className="container-fluid m-0 bg-white w-100 outer">
                <TextImage heading="" image="images/new/office1.svg">
                    <div>
                        <h2 className="font-weight-bold mb-3">
                            About <span style={{color: "#00c5ca"}}>Us</span>
                        </h2>
                    </div>
                    <div style={{fontSize: "0.9rem"}}>
                        The purpose of Nestin is to help budding entrepreneurs, freelancers and corporates 
                        achieve their dreams by providing them with flexible co-working and meeting spaces 
                        in Cafes and lounges. Customers can book seats/ meeting rooms in cafes and lounges 
                        on an hourly/daily basis, where the cafes only have to provide free WiFi, charging 
                        points, and some coffee to these dreamers.
                    </div>
                </TextImage>
                <TextImage heading="" image="images/new/office2.svg" reverse="true">
                    <div>
                        <h2 className="font-weight-bold mb-3">
                            Benefits for <span style={{color: "#00c5ca"}}>you</span>
                        </h2>
                    </div>
                    <ul style={{listStyleType: "none", fontSize: "0.9rem"}} className="text-justify m-0 p-0">
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> You increase the occupation rate of your lounge, be it a lazy Monday or slow Wednesday</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Increase the sale of your food through additional discounts on our app</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Another channel for your potential customers to discover you</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> You also keep most of the money that you make by renting out these seats (to be revised after the trial period)</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> And of course, you help a lot of dreamers chase their dreams</li>
                    </ul>
                </TextImage>
                <ContactForm buttonValue="List Space" type="LIST_REQUEST" />
            </div>
            <style jsx>{`
                li {
                    padding: 5px 0px;
                }
            `}</style>
        </Layout>
    )
}