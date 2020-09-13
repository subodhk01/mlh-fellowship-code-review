import Layout from '../components/Layout'
import Accordion from '../components/Accordion'
import { Tag } from '../components/Tags'
import ContactNew from '../components/ContactNew';
import { FaDotCircle } from 'react-icons/fa'
import Link from 'next/link';

export default function Template() {
    const panels = [
        {
            label: 'What is NestIn?',
            content: 'The purpose of Nestin is to help budding entrepreneurs, startups, corporates, digital nomads, freelancers, remote workers and independent professionals achieve their dreams and get their work done by providing them with flexible working and meeting spaces in Cafes, lounges, and co-working places, right next door.',
        },
        {
            label: 'How can consumers work from these spaces (called NestIn Spaces)?',
            content: 'Customers can book seats/ meeting rooms in such places on an hourly/daily/monthly basis, and then can just go and work there. You might be asked to show your booking/ flexi pass in these spaces.',
        },
        {
            label: 'What are the working hours for NestIn spaces?',
            content: 'Each NestIn space has different operation times which is mentioned on the booking page of the individual listings on the website and mobile apps. Most of the spaces are open from 9AM to 8PM.'
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
            label: 'What payment options does NestIn accept?',
            content: 'GoFloaters accepts most payment methods available on Razorpay such as Net banking, UPI , GPay, Debit and Credit-Cards. We also offer cash, UPI and card payments at some of our NestIn spaces.'
        },
    ];
    return(
        <Layout>
            <ContactNew />
            <div className="topHeading text-center mt-5">
                <h1 className="mb-4">FAQs</h1>
            </div>
            <div className="row px-3 pb-5 m-auto text-center container">
                <div className="align-self-start m-auto">
                    {/* <div className="m-0">
                            <Tag>Blessed</Tag>
                            <Tag isActive>Photography</Tag>
                            <Tag>Privacy</Tag>
                            <Tag>Conditions</Tag>
                    </div> */}
                    <Accordion panels={ panels }/>
                </div>
                <div className="text-right w-100 pb-5">
                    <Link href="/faq">
                        <a>
                            View More..
                        </a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}