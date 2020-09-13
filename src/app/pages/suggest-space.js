import Layout from '../components/Layout'
import TextImage from '../components/TextImage'
import ContactForm from '../components/RestaurantLeadsContactForm'
import { FaCircle, FaCircleNotch, FaDotCircle } from 'react-icons/fa'

export default function Template() {
    return (
        <Layout>
            <div className="container-fluid m-0 bg-white w-100 outer">
                <TextImage image="images/new/office3.svg">
                    <div>
                        <h2 className="font-weight-bold mb-4">
                            Suggest a <span style={{color: "#00c5ca"}}>Space</span>
                        </h2>
                    </div>
                    <div style={{fontSize: "0.9rem"}}>
                        <ul style={{listStyleType: "none"}} className="text-justify m-0 p-0">
                            <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Do you think that you know a cafe/ restaurant that is a cool place for working from, 
                                    and would be a great addition to our partner spaces? Or maybe a flexible place 
                                    you'd love to work from?
                            </li>
                            <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Think no more - fill in the details about that place, and we'll try to onboard them on the platform.</li>
                            <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> What's in it for you - in case we onboard the place, then your first week in that place is on us!</li>
                        </ul>    
                    </div>
                </TextImage>
                <ContactForm buttonValue="Suggest Space" type="SUGGESTED" />
            </div>
            <style jsx>{`
                li {
                    padding: 5px 0px;
                }
            `}</style>
        </Layout>
    )
}