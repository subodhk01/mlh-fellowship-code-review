import cookie from 'react-cookies'
import { loadFirebase } from '../lib/firebase'
import * as FaFonts from './font'

export function getCurrentCity(){
    if(!cookie.load('city')){
        var defaultCity = "Gurgaon"
        cookie.save('city', defaultCity)
    }
    return cookie.load('city')
}

export const checkUser = async(task, handleFail) => {
    let firebase = loadFirebase()
    let user = await firebase.auth().currentUser;
    if(user){
        task()
    } else {
        handleFail(true)
    }
}

export function FaIcon(value){
    var Icon = FaFonts[value]
    return(
        <Icon />
    )
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        stop = start;
        start = 0;
    }
    if (typeof step == 'undefined') {
        step = 1;
    }
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }
    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

export function getTimeFromMinutes(mins, forDisplay = true) {
    const localVal = mins;
    const hours = Math.floor(localVal / 60);
    const minutes = localVal % 60;

    let displayH, displayM;

    if (hours > 12 && forDisplay) {
        displayH = hours - 12;
    } else if (hours < 1 && forDisplay) {
        displayH = 12;
    } else {
        displayH = hours;
    }

    if (minutes < 10) {
        displayM = "0" + minutes;
    } else {
        displayM = minutes;
    }

    return `${displayH}:${displayM}`;
}

export function getSliderLabel(value) {
    const period = value <= 719 ? "am" : "pm";
    const time = getTimeFromMinutes(value, true);
    return `${time} ${period}`;
}