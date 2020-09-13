import React from 'react'
import { FaCheckCircle, FaGift, FaInfoCircle } from "react-icons/fa";
import { OverlayTrigger, Popover } from 'react-bootstrap'

export default function TableTypeSelector(props) {
    function handleTableTypeChange(value){
        props.setPerson(1)
        props.setTableType(value)
    }
    return (
        <>
            <div className="row no-gutters justify-content-center">
                {props.pricing && props.pricing.map( (pricing, index) => <div className="col-6 pl-1 pr-2" key={index}>
                    <div className="visual-picker w-100 mr-3 position-relative d-inline-block mb-1" onClick={() => handleTableTypeChange(pricing)}>
                        <label className={`visual-picker-figure position-relative d-flex justify-content-center align-items-center w-100
                                        cursor-pointer bg-white ${ props.tableType.seatType == pricing.seatType ? "visual-picker-checked" : "" }`}>
                            <div className="visual-picker-content d-block px-1 py-0">
                                <div className="user-avatar text-center mb-2">
                                    <img src={pricing.seatImage || "/images/spaces/shared.svg"} />
                                </div>
                                <h6>{pricing.seatText}</h6>
                            </div>
                        </label>
                        <div className="visual-picker-checkbox position-absolute">
                            { props.tableType.seatType == pricing.seatType ? <FaCheckCircle color="#00c5ca" size="20" /> : "" }
                        </div>
                    </div>
                </div>)}
            </div>
            <div>
                { props.tableType.seatDescription ?
                    <div className="text-center font-weight-bold pt-2">
                        {props.tableType.seatDescription}{' '}
                        {props.tableType.seatTnc && <OverlayTrigger trigger="click" placement="bottom" rootClose overlay={
                            <Popover id="popover-basic">
                                <Popover.Title as="h3">Terms & Conditions</Popover.Title>
                                <Popover.Content>
                                <ul>
                                    {props.tableType.seatTnc.map((item, index) =>
                                        <li key={index}>{item}</li>
                                    )}
                                </ul>
                                </Popover.Content>
                            </Popover>}>
                            <FaInfoCircle className="text-info" size="24" />
                        </OverlayTrigger>}
                    </div> : ""
                }
            </div>
            <div>
                { props.tableType.seatOffers ?
                    <div className="p-3 text-center">
                        {props.tableType.seatOffers.map((item, index) =>
                            <p key={index} className="text-success btn btn-outline-warning mr-1"><FaGift color="orange" className="mr-2" /> {item}</p>
                        )}
                    </div> : ""
                }
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
                    color: #00c5ca;
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