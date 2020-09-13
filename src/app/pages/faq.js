import Layout from '../components/Layout'
import Accordion from '../components/Accordion'
import { Tag } from '../components/Tags'
import { FaDotCircle } from 'react-icons/fa'

export default function Template() {
    const panels1 = [
        {
            label: 'What is NestIn?',
            content: 'The purpose of Nestin is to help budding entrepreneurs, startups, corporates, digital nomads, freelancers, remote workers and independent professionals achieve their dreams and get their work done by providing them with flexible working and meeting spaces in Cafes, lounges, and co-working places, right next door.',
        },
        {
            label: 'How can consumers work from these spaces (called NestIn Spaces)?',
            content: 'Customers can book seats/ meeting rooms in such places on an hourly/daily/monthly basis, and then can just go and work there. You might be asked to show your booking/ flexi pass in these spaces.',
        },	
        {
            label: 'Can I use NestIn spaces only for coworking?',
            content: (
                <>
                    No, absolutely not. Some of the NestIn spaces can be additionally also used for:<br />
                    <ul style={{listStyleType: "none", fontSize: "0.9rem"}} className="text-justify m-0 p-0">
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Work</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Interviews</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Meetings</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Trainings</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Presentations</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Events</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Workshops</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Meet-ups</li>
                    </ul>
                </>
            ),
        },
        {
            label: 'What amenities are provided in these Nestin Spaces?',
            content: 'These paces provide WiFi, charging points, coffee and some basic amenities that vary by spaces. These amenities can include stationary, printer, projector, board and food as well.',
        },
        {
            label: 'What other benefits do I get from NestIn?',
            content: (
                <>
                    Benefits that you get, both as a company or an individual:
                    <ul style={{listStyleType: "none", fontSize: "0.9rem"}} className="text-justify m-0 p-0">
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> You increase the productivity of your staff, while still maintaining the flexibility of working from space right next door</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Huge savings on the office rentals and maintenance fees</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Time and cost savings in commute</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> Another channel for your potential customers to discover you (cafes can become your marketplace, you know), and stay connected to a vibrant community (of which, investors and incubators will be a part too)</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> You get an endless supply of coffee</li>
                        <li> <FaDotCircle color="#00c5ca" size="12" className="mb-1" /> And of course, dressing up is completely optional!</li>
                    </ul>
                </>
            )
        },
        {
            label: 'Can I register my business using GoFloaters address or use the space address for communication?',
            content: 'Currently, you can’t. But we will enable these services in future.'
        }
    ];
    const panels2 = [
        {
            label: 'How much will you charge me?',
            content: 'The hourly/daily prices of every space is different, where some neighborhood cafes charge as low as INR200 per day, to some big spaces charging around INR500 per day. But most of the spaces offer exclusive discounts on food to NestIn users. We also offer NestPass to individuals, a flexi pass which you can pay for on a monthly pass that you can buy for as low as INR5000 (plus taxes) and use it in all NestIn spaces.'
        },
        {
            label: 'Do you have a corporate deal as well?',
            content: 'Of course, we have a very lucrative deal for companies/ corporations/ startups, where the company can buy NestIn credits from us and allocate to their employees, and those credits will be expensed only when an employee uses a NestIn space. The employees are entitled to use these credits in all the available NestIn spaces.'
        },
        {
            label: 'Is there a lock in period or rental agreement that I must sign for office spaces?',
            content: 'NestIn is an on-demand space provider. We don’t have any lock-ins. We believe in offering freedom to our users, and hence, we don’t do rental agreements. It is as simple as booking an Uber or Oyo.'
        },
        {
            label: 'Is maintenance included in the rates?',
            content: 'Yes, maintenance charges are included into the price. WiFi, power points and comfortable atmosphere with seating is included into our pricing. Other amenities vary by space. You can check the individual listings for more details.'
        }
    ]
    const panels3 = [
        {
            label: 'What are the working hours for NestIn spaces?',
            content: 'Each NestIn space has different operation times which is mentioned on the booking page of the individual listings on the website and mobile apps. Most of the spaces are open from 9AM to 8PM.'
        },
        {
            label: 'Can I bring a guest or a friend to a NesIn space?',
            content: 'If only the NestIn space allows you to. Such policies are mentioned on the booking page of every listing.'
        },
        {
            label: 'What is the cancellation policy?',
            content: (
                <>
                    In case of monthly office spaces, 1 week of advanced notice is required.<br />
                    In case of meeting spaces, training rooms and event spaces, cancellations can be made before 2 days of the booking date and money will be refunded fully in the form of future credits. If a cancellation is made within 2 days of the booking date, there will be no refunds.<br/>
                    For Café coworking, booking can be cancelled anytime and the money will be refunded fully in the form of NestIn credits.

                </>
            )
        },
        {
            label: 'Why is my booking space request under process and not confirmed yet?',
            content: 'Please give us some lead time to confirm your booking. Our team will look into your booking and confirm the booking at the earliest. Depending on the volume of requests and availability of space, sometimes it is possible that we have not been able to get your booking within 30 minutes. If your booking is still not confirmed after 30 mins of your booking, then kindly reach out to our team through chat or call us at +8983319502. Upon booking confirmation, you will get an E-mail confirmation. The status will also reflect in the website/ app..'
        },
        {
            label: 'What do I do once I reach the NestIn space?',
            content: 'After reaching the NestIn Space you are supposed to show your booking to the NestIn space staff who will then guide you to the assigned table.'
        }
    ]
    const panels4 = [
        {
            label: 'What payment options does NestIn accept?',
            content: 'GoFloaters accepts most payment methods available on Razorpay such as Net banking, UPI , GPay, Debit and Credit-Cards. We also offer cash, UPI and card payments at some of our NestIn spaces.'
        },
        {
            label: 'How do I make the payment?',
            content: (
                <>
                    You will have to make the payment before using the space, if you are using the digital payments option on the website/ app. You will see a pay to confirm button on the booking in the main screen. For Work Cafes you make the payment for the food through our mobile app. When you decide to leave the café, the waiter will give you the bill for the food (in case you had) that you will have to pay using NestIn Credits.<br />
                    In case if you are making payments at the NestIn space, you can use cash/ PoS/ UPI payments, but ensure that you use your NestIn credits as well, if available.
                </>
            )
        },
        {
            label: 'Where are my NestIn Credits?',
            content: 'You can see your balance In the NestIn Credits section under My Profile in the app anytime. You will be taken to a screen where you will just match the bill amount in the café. In case the bill amount exceeds the NestIn Credits you have, you can recharge & pay the balance amount through the app.'
        },
        {
            label: 'Does the price include taxes?',
            content: 'The rates mentioned in our app and website does not include GST. 5% GST would be applicable on the rate will be applicable for café coworking and 18% GST would be applicable for office space, meeting space, training rooms and event spaces.'
        }
    ]
    return(
        <Layout>
            <div className="topHeading text-center mt-5 pt-2">
                <h1 className="mb-4">FAQs</h1>
            </div>
            <div className="pb-5 mb-5 container">
                {/* <div className="m-0 ml-sm-5 text-center">
                    <Tag>Blessed</Tag>
                    <Tag isActive>Photography</Tag>
                    <Tag>Privacy</Tag>
                    <Tag>Conditions</Tag>
                </div> */}
                <h3>General</h3>
                <Accordion panels={ panels1 } />
                <h3>Pricing</h3>
                <Accordion panels={ panels2 } />
                <h3>Booking Policies</h3>
                <Accordion panels={ panels3 } />
                <h3>Payments</h3>
                <Accordion panels={ panels4 } />
            </div>
        </Layout>
    )
}