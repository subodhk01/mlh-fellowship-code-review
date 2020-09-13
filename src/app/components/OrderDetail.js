import Link from 'next/link'
import BreadCrumbs from './navigation/Breadcrumb'
import { IoMdContacts } from 'react-icons/io'
import Table from 'react-bootstrap/Table'
import { ListItem } from './Listing'
import RatingPopup from './RatingPopup'

export default function OrderDetail(props) {
    const orderStages = {
        REQUESTED: 0,
        CONFIRMED: 1,
        ONGOING: 2,
        COMPLETED: 3
    }
    var stage = orderStages.REQUESTED
    switch (props.order.status) {
        case "REQUESTED":
            stage = orderStages.REQUESTED
            break;
        case "CONFIRMED":
            stage = orderStages.CONFIRMED
            break;
        case "ONGOING":
            stage = orderStages.ONGOING
            break;
        case "COMPLETED":
            stage = orderStages.COMPLETED
            break;
    }
    var datetime = new Date(props.order.timeStart)
    return (
        <div>
            <div className="outer-container">
                <BreadCrumbs items={['Home', 'Account', 'Order', props.orderid]} />
                <div className="outer-heading py-4">
                    Order Details
                </div>
                <div className="outer-orderid py-2">
                    Order# {props.order.id}
                </div>
                <div className="order-container py-2" style={{ backgroundColor: "white" }}>
                    {props.order.paymentMode == "CASH" && props.order.totalAmount >= 1 &&
                        <div className="alert alert-warning mx-2">
                            Your Payment for the following order is still pending. Please ensure to pay and collect your bill from the restaurant. 
                        </div>
                    }
                    <div className="row mb-3">
                        <ListItem
                            restaurant={props.restaurant}
                        />
                        <div className="col-sm-6">
                            <div className="order-datetime pl-5 pt-0 pt-md-5">
                                {datetime.toDateString()}<br />
                                {datetime.toLocaleTimeString([], { hour12: true })} <IoMdContacts /> x {props.order.numPeople}
                            </div>
                        </div>
                    </div>
                    <div className="p-2 p-md-5">
                        <div className="row">
                            <div className="content col-sm-12 col-md-6 order-timeline">
                                <div className="timeline">
                                    <div className={`item ${stage >= orderStages.REQUESTED ? "active" : ""}`}>
                                        <div className="item-description">
                                            <div className="item-description-status">
                                                Order Requested
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`item ${stage >= orderStages.CONFIRMED ? "active" : ""}`}>
                                        <div className="item-description">
                                            <div className="item-description-status">
                                                Confirmed
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`item ${stage >= orderStages.ONGOING ? "active" : ""}`}>
                                        <div className="item-description">
                                            <div className="item-description-status">
                                                In Progress
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`item ${stage >= orderStages.COMPLETED ? "active" : ""}`}>
                                        <div className="item-description">
                                            <div className="item-description-status">
                                                Completed
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-pricing col-sm-12 col-md-6">
                                <div className="order-subheading">Order Summary</div>
                                <OrderTable
                                    serviceTax={props.order.calculatedServiceTax}
                                    space={props.order.items.filter((item) => item.type == "SPACE")[0]}
                                    gst={props.order.calculatedGst}
                                    subtotal={props.order.subTotal}
                                    total={props.order.totalAmount}
                                    promoObject={{
                                        promo: props.order.promo,
                                        amount : props.order.promoDebitedValue
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="order-buttons">
                                <button className="btn btn-solid-reg mb-2">Download Invoice</button>
                                <Link href={`/space/${props.restaurant.slug}`}>
                                    <a><button className="btn btn-solid-reg mb-2">Re Book</button></a>
                                </Link>
                                { stage == orderStages.COMPLETED ?
                                    <RatingPopup
                                        orderId={props.order.id}
                                        restaurantName={props.restaurant.name}
                                        restaurantId={props.order.restaurantId}
                                        userId={props.order.userId}
                                    /> : ""
                                }
                                <Link href="/orders">
                                    <a><button className="btn btn-outline-reg mb-2">Back</button></a>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function OrderTable(props) {
    return (
        <div className="bg-white m-3 p-0 rounded">
            <Table borderless>
                <tbody className="rounded">
                    <tr>
                        <td className="text-left">Rented Space : <span className="raleway">&#8377;</span>{props.space.rate} &times; {props.space.hours} hours &times; {props.space.quantity} people</td>
                        <td className="text-right raleway">&#8377;{props.subtotal}</td>
                    </tr>
                    <tr className="font-weight-bold">
                        <td className="text-left">Sub total</td>
                        <td className="text-right raleway">&#8377;{props.subtotal}</td>
                    </tr>
                    { props.promoObject.promo ?
                        <tr>
                            <td className="text-left">Promo Discount <span className="font-weight-bold">{props.promoObject.promo.code}</span></td>
                            <td className="text-right raleway">-&#8377;{props.promoObject.amount}</td>
                        </tr> : ""
                    }
                    <tr>
                        <td className="text-left">GST</td>
                        <td className="text-right raleway">&#8377;{props.gst}</td>
                    </tr>
                    <tr>
                        <td className="text-left">Service Charge</td>
                        <td className="text-right raleway">&#8377;{props.serviceTax}</td>
                    </tr>
                    <tr className="font-weight-bold border-top">
                        <td className="text-left">Total</td>
                        <td className="text-right raleway">&#8377;{props.total}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
