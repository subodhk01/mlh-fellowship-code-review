import Lottie from 'react-lottie';
import animationData from '../../animations/confirmTick.json'
import { getSliderLabel } from '../../utils/functions'
import Link from 'next/link'
import Layout from '../../components/Layout'

const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

function BookingConfirmed(props) {
    return (
        <Layout>
            <div className="text-center py-5 outerContainer d-flex align-items-center justify-content-center">
                <div>
                    <Lottie options={defaultOptions}
                        height={200}
                        width={200}
                    />
                    { props.result ? props.result.hell : " "}
                    <div className="container px-1 py-4 m-auto">
                        <div className="bg-white rounded p-3 m-2">
                            Your booking at {props.restaurantName} been confirmed at {getSliderLabel(props.timeMin)} for {(props.timeMax-props.timeMin)/60} hour(s) and {props.numberOfPerson} person(s).<br />
                            For more details visit the
                            <Link href={`/order/${props.orderId}`}>
                                <a className="text-primary"> order details </a>
                            </Link>
                            page.
                        </div>

                        <div className="row no-gutters text-center">
                            <div className="col-6 p-2 align-self-stretch">
                                <Link href="/">
                                    <a>
                                        <div className="py-3 bg-white rounded h-100 d-flex align-items-center justify-content-center cursor-pointer text-responsive">
                                            Book Another
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className="col-6 p-2 align-self-stretch">
                                <Link href="/orders">
                                    <a>
                                        <div className="py-3 bg-white rounded h-100 d-flex align-items-center justify-content-center cursor-pointer text-responsive">
                                            Go to History
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .outerContainer{
                        min-height: 90vh;
                    }
                    .container {
                        max-width: 500px;
                    }
                `}</style>
            </div>
        </Layout>
    )
}

BookingConfirmed.getInitialProps = async({ query }) => {
    return query
}

export default BookingConfirmed