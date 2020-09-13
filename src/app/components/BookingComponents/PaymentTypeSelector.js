import React from 'react'
import { FaCheckCircle, FaGift, FaInfoCircle } from "react-icons/fa";
import { OverlayTrigger, Popover } from 'react-bootstrap'

export default function TableTypeSelector(props) {
    function handlePaymentTypeChange(value){
        props.setPaymentType(value)
    }
    return (
        <>
            <div className="row no-gutters">
                <div className="col-6 pl-1 pr-2">
                    <div className="visual-picker w-100 mr-3 position-relative d-inline-block mb-1" onClick={() => handlePaymentTypeChange("ONLINE")}>
                        <label className={`visual-picker-figure position-relative d-flex justify-content-center align-items-center w-100
                                        cursor-pointer bg-white ${ props.paymentType == "ONLINE" ? "visual-picker-checked" : "" }`}>
                            <div className="visual-picker-content d-block px-1 py-0 text-center">
                                <div className="user-avatar mb-2">
                                    <img src={"/images/online.jpg"} />
                                </div>
                                <h6>PAY ONLINE</h6>
                            </div>
                        </label>
                        <div className="visual-picker-checkbox position-absolute">
                            { props.paymentType == "ONLINE" ? <FaCheckCircle color="#00c5ca" size="20" /> : "" }
                        </div>
                    </div>
                </div>
                <div className="col-6 pl-1 pr-2">
                    <div className="visual-picker w-100 mr-3 position-relative d-inline-block mb-1" onClick={() => handlePaymentTypeChange("CASH")}>
                        <label className={`visual-picker-figure position-relative d-flex justify-content-center align-items-center w-100
                                        cursor-pointer bg-white ${ props.paymentType == "CASH" ? "visual-picker-checked" : "" }`}>
                            <div className="visual-picker-content d-block px-1 py-0 text-center">
                                <div className="user-avatar mb-2">
                                    <img src={"/images/offline.jpg"} />
                                </div>
                                <h6>PAY OFFLINE</h6>
                            </div>
                        </label>
                        <div className="visual-picker-checkbox position-absolute">
                            { props.paymentType == "CASH" ? <FaCheckCircle color="#00c5ca" size="20" /> : "" }
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .visual-picker-checkbox {
                    top: 10px;
                    right: 15px;
                }
                .visual-picker:hover .visual-picker-figure {
                    -webkit-box-shadow: inset 0 0 0 2px #00c5ca, 0 0 0 1px rgba(61, 70, 79, 0.05), 0 1px 3px 0 rgba(61, 70, 79, 0.15);
                    box-shadow: inset 0 0 0 2px #00c5ca, 0 0 0 1px rgba(61, 70, 79, 0.05), 0 1px 3px 0 rgba(61, 70, 79, 0.15);
                }
                .visual-picker-figure {
                    width: 8rem;
                    height: 13rem;
                    color: #28313B;
                    border-radius: 0.25rem;
                    -webkit-box-shadow: 0 0 0 1px rgba(61, 70, 79, 0.05), 0 1px 3px 0 rgba(61, 70, 79, 0.15);
                    box-shadow: 0 0 0 1px rgba(61, 70, 79, 0.05), 0 1px 3px 0 rgba(61, 70, 79, 0.15);
                    -webkit-transition: -webkit-box-shadow 200ms;
                    transition: -webkit-box-shadow 200ms;
                    transition: box-shadow 200ms;
                    transition: box-shadow 200ms, -webkit-box-shadow 200ms;
                }
                .visual-picker-checked {
                    -webkit-box-shadow: inset 0 0 0 2px #00c5ca, 0 0 0 1px rgba(61, 70, 79, 0.05), 0 1px 3px 0 rgba(61, 70, 79, 0.15);
                    box-shadow: inset 0 0 0 2px #00c5ca, 0 0 0 1px rgba(61, 70, 79, 0.05), 0 1px 3px 0 rgba(61, 70, 79, 0.15);
                }
                .user-avatar img {
                    height: 6.5rem;
                }
            `}</style>
        </>
    )
}