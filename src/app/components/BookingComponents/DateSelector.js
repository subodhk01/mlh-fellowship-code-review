import React from 'react'
import Collapse from 'react-bootstrap/Collapse'
import { FaPen, FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const DATES = {
    TODAY: 0,
    TOMORROW: 1,
    OTHER: 2
}

export default function DateSelector(props) {
    const [ open, setOpen ] = React.useState(false)
    const [ dateSelected, setDateSelected ] = React.useState(DATES.TODAY)
    const today = new Date()
    const tomorrow = new Date()
    const dayAfterTomorrow = new Date()
    tomorrow.setDate( today.getDate() + 1 )
    dayAfterTomorrow.setDate( today.getDate() + 2 )

    function onTodayDateSelect(){
        setDateSelected(DATES.TODAY)
        props.setDate(today)
        setOpen(false)
    }
    function onTomDateSelect(){
        setDateSelected(DATES.TOMORROW)
        props.setDate(tomorrow)
        setOpen(false)
    }
    function onOtherDateSelect(value){
        setDateSelected(DATES.OTHER)
        props.setDate(value)
        setOpen(false);
    }

    React.useEffect(() => {
        props.setDate(new Date())
        setDateSelected(DATES.TODAY)
    } ,[])

    return (
        <>
            <div className="row no-gutters text-center">
                <div className="col-4 p-2 align-self-stretch">
                    <div
                        onClick={() => onTodayDateSelect()}
                        className={`${ dateSelected === DATES.TODAY ? 'active' : 'normal'} py-3 rounded h-100 d-flex align-items-center justify-content-center cursor-pointer text-responsive`}>
                        TODAY<br />
                        {today.toDateString()}
                    </div>
                </div>
                <div className="col-4 p-2 align-self-stretch">
                    <div
                        onClick={() => onTomDateSelect()}
                        className={`${ dateSelected === DATES.TOMORROW ? 'active' : 'normal'} py-3 rounded h-100 d-flex align-items-center justify-content-center cursor-pointer text-responsive`}>
                        TOMORROW<br />
                        {tomorrow.toDateString()}
                    </div>
                </div>
                <div className="col-4 p-2 align-self-stretch">
                    <div
                        onClick={() => setOpen(!open)}
                        className={`${ dateSelected === DATES.OTHER ? 'active' : 'normal'} py-3 rounded h-100 d-flex align-items-center justify-content-center cursor-pointer text-responsive`}
                        aria-expanded={open} aria-controls="collapseExample">
                        { dateSelected === DATES.OTHER ? <span>{props.date.toDateString()} <FaPen /></span> : <span>LATER { open ? <FaAngleUp /> : <FaAngleDown />}</span> }
                    </div>
                </div>
            </div>
            <Collapse in={open}>
                <div className="p-0" id="collapseExample">
                    <div className="border p-3 mx-2 mt-2 bg-white rounded text-center">
                        <div className="datePickerContainer m-auto">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    value={props.date}
                                    minDate={dayAfterTomorrow}
                                    onChange={(value) => onOtherDateSelect(value)}
                                    disablePast = "true"
                                    disableToolbar = "true"
                                    variant="static"
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>
                </div>
            </Collapse>
            <style jsx>{`
                .datePickerContainer {
                    max-width: 325px;
                }
                .active {
                    background: #d81b60;
                    color: white;
                }
                .normal {
                    background: white;
                    transition: 0.1s;
                }
                .normal:hover {
                    background: #d81b60;
                    color: white;
                }
            `}</style>
        </>
    )
}