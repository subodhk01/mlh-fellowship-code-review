import Head from 'next/head'
import Layout from '../components/Layout'

export default function Template() {
    return (
        <div>
            <Head>
                <link rel="stylesheet" href="css/privacy-policy.css" />
            </Head>
            <Layout>
                <div className="outer-container my-4 mx-auto p-4">
                        <div className="text-center mt-3 mb-5">
                            <h3>
                                Privacy <span style={{color: "#00c5ca"}}>Policy</span>
                            </h3>
                        </div>
                        <div className="content text-justify">
                            <h5>
                                What Do We Do With Your Information?
                            </h5>
                            <p>
                                When you book some place or service through our app/website, as part of the buying and selling process, we 
                                collect the personal information you give us such as your name, address and email address via the Login 
                                process or otherwise. When you browse the app/website, we also automatically receive information related 
                                to your technological equipment used to browse the app/website, such as browser info & IP address. We 
                                may use the email id provided by you to send you marketing emails related to our product, offerings 
                                and offers, of which you can opt out by contacting us. We may also share your personal information 
                                like name and email id to specific partners listed on app/website, although not limited to the partners 
                                with whom you transact.
                            </p>

                            <h4>
                                CONSENT
                            </h4>
                            <h5>
                                How is the consent provided and withdrawn?
                            </h5>
                            <p>
                                To transact on the app/website - through any part as a part of placing order or cancellation/refund, if 
                                you provide us with personal information, it is automatically understood that you consent to our 
                                collecting it and using it for the specific reason for which you provided it, unless we provide you 
                                a way to opt out of any secondary usage or we provide you an opportunity to opt in or out of the 
                                secondary usage for your expressed consent.
                            </p>
                            <p>
                                At any time if you want to opt out of the consent, you can do so by contacting us 
                                at <a style={{color:"#00c5ca"}} href="mailto:contact@nestin.io">contact@nestin.io</a>. Please note that 
                                the opt out cannot be done retrospectively unless technologically feasible and legally required.
                            </p>

                            <h5>
                                DISCLOSURE
                            </h5>
                            <p> 
                                If there is any legal requirement, then we may disclose your personal information to the body that the 
                                law requires us to. Otherwise, if you violate any terms of service, then this privacy policy stands 
                                null and we can share the information as per the need. 
                            </p>

                            <h5>
                                PAYMENT
                            </h5>
                            <p>
                                We use Razorpay for processing payments. We/Razorpay do not store your card data on our/their 
                                servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI­DSS) 
                                when processing the payment. The purchase transaction id is used to complete the order and may be 
                                saved for any future use. Our payment gateway adheres to the standards set by PCI­DSS as managed by 
                                the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American 
                                Express and Discover. PCI­DSS requirements help ensure the secure handling of credit card information 
                                by our store and its service providers. For more insight, you may also want to read terms and conditions 
                                of razorpay on <a style={{color:"#00c5ca"}} href="https://razorpay.com">https://razorpay.com</a>. For 
                                offline mode of payments directly done with partners, the privacy policy of using their services apply.
                            </p>

                            <h5>
                                THIRD PARTY SERVICES
                            </h5>
                            <p>
                                The third party providers used by us will only collect, use and disclose your information to the 
                                extent necessary to allow them to perform the services they provide to us. Certain third party 
                                service providers, such as payment gateways, have their own privacy policies in respect to the 
                                information we are required to provide to them for your purchase related transactions. 
                            </p>

                            <h5>
                                EXTERNAL LINKS
                            </h5>
                            <p>
                                We are not responsible for the privacy practices of other sites and encourage you to read their 
                                privacy statements, even when we link you to the external sites through our website/app. It’s up 
                                to you to decide whether to continue with the external services or not.
                            </p>

                            <h5>
                                SECURITY
                            </h5>
                            <p>
                                We take reasonable precautions and follow industry best practices to make sure your personal 
                                information is not inappropriately lost, misused, accessed, disclosed, altered or 
                                destroyed. However, in case your data is stolen through system hacks, we can try to limit 
                                the damages and to retrieve the data back. However, we are not responsible for any misuse 
                                of the data by any third party.
                            </p>

                            <h5>
                                COOKIES
                            </h5>
                            <p>
                                We use cookies to maintain the session of the user and the city/location selected by you. It is not used to personally identify you on other websites.
                            </p>

                            <h5>
                                CHANGES TO THIS PRIVACY POLICY
                            </h5>
                            <p>
                                We reserve the right to modify this privacy policy at any time. Changes and clarifications will take effect immediately upon their posting on the website. We will try to notify whenever we make any major change to the privacy policy via your email id. However, it’s recommended for you to keep checking the privacy policy often to note any changes done.
                            </p>
                        </div>
                    </div>
            </Layout>
        </div>
    )
}