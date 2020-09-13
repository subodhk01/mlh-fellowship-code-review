import { IoMdContacts } from 'react-icons/io'

export default function OrderBrief(props) {
    var time = props.timestamp;
    var ampm, hours = time.getHours(), minutes = time.getMinutes();
    let displayH, displayM;
    if (hours > 12) {
        displayH = hours - 12;
    } else if (hours < 1) {
        displayH = 12;
    } else {
        displayH = hours;
    }
    if (hours >= 12) ampm = "PM"; 
    else ampm = "AM";

    if (minutes < 10) {
        displayM = "0" + minutes;
    } else {
        displayM = minutes;
    }
    return (
        <div className={`col-12 ${ !props.full ? "col-md-6" : "" } m-sm-auto m-md-auto m-lg-0 p-3 border rounded row no-gutters bg-white`}>
            <div className="col-3 px-2 text-center">
                <div><h5 className="mb-1">{props.timestamp.toDateString().slice(0,3)}</h5></div>
                <div className="text-muted">{props.timestamp.getDate()}.{props.timestamp.getMonth()+1}.{props.timestamp.getFullYear()}</div>
            </div>
            <div className="col-5 px-2 text-center border-left border-right">
                <div><h4>{`${displayH}:${displayM}`} <span className="text-muted">{ampm}</span></h4></div>
            </div>
            <div className="col-4 px-2 text-center">
                <div>
                    <h3>{props.numberOfPerson}<span className="text-muted"> <IoMdContacts /></span></h3>
                </div>
            </div>
        </div>
    )
}