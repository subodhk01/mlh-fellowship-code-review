import React from 'react'
import InputRange from 'react-input-range';
import { FaArrowRight } from "react-icons/fa";
import { getSliderLabel } from '../../utils/functions'

export default function TimeSelector(props) {
    return (
        <>
            <div className="text-center d-flex align-items-center justify-content-center">
                <div className="p-2">
                    <h3>{getSliderLabel(props.time.min)}</h3>
                </div>
                <div className="p-2 mb-2"><FaArrowRight /></div>
                <div className="p-2">
                    <h3>{getSliderLabel(props.time.max)}</h3>
                </div>
            </div>
            <div className="bookingTimeSelector p-3 my-3">
                <InputRange
                    formatLabel={getSliderLabel.bind(props.time)}
                    maxValue={props.timing.endTime}
                    minValue={props.timing.startTime}
                    step={props.tableType.durationStep || 60}
                    onChange={(value) => props.setTime(value)}
                    value={props.time}
                />
            </div>
        </>
    )
}