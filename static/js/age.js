function getAge(param) {

    const the_dob = document.getElementById(`${param}`).value;

    const date_1 = new Date(the_dob);
    const date_2 = new Date();

    //convert to UTC
    var date2_UTC = new Date(Date.UTC(date_2.getUTCFullYear(), date_2.getUTCMonth(), date_2.getUTCDate()));
    var date1_UTC = new Date(Date.UTC(date_1.getUTCFullYear(), date_1.getUTCMonth(), date_1.getUTCDate()));

    var yAppendix, mAppendix, dAppendix;

    //--------------------------------------------------------------
    var days = date2_UTC.getDate() - date1_UTC.getDate();
    if (days < 0) {
        date2_UTC.setMonth(date2_UTC.getMonth() - 1);
        days += DaysInMonth(date2_UTC);
    }

    //--------------------------------------------------------------
    var months = date2_UTC.getMonth() - date1_UTC.getMonth();
    if (months < 0) {
        date2_UTC.setFullYear(date2_UTC.getFullYear() - 1);
        months += 12;
    }

    //--------------------------------------------------------------
    var years = date2_UTC.getFullYear() - date1_UTC.getFullYear();

    if (years > 1) yAppendix = " years"; else yAppendix = " year";
    if (months > 1) mAppendix = " months"; else mAppendix = " month";
    if (days > 1) dAppendix = " days"; else dAppendix = " day";

    if (date_1 < date_2) {
        document.getElementById('age-years').setAttribute("value", years > 0 ? years + yAppendix : '' + " " + months > 0 ? months + mAppendix : '' + " " + days > 0 ? days + dAppendix : '');
    } else {
        document.getElementById('age-years').setAttribute("value", "");
    }

}

function DaysInMonth(date2_UTC) {
    var monthStart = new Date(date2_UTC.getFullYear(), date2_UTC.getMonth(), 1);
    var monthEnd = new Date(date2_UTC.getFullYear(), date2_UTC.getMonth() + 1, 1);
    var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
    return monthLength;
}
// Front End date display
const dateFrontend = (param) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const the_date = new Date(Date.parse(param));

    return the_date.toLocaleDateString(undefined, options);

}

// function addDays(dt, days) {
//     const copy = new Date(Number(date))
//     copy.setDate(dt.getDate() + days)
//     return copy
// }

const addDays = (date, days) => {
    const dt = new Date(date);
    dt.setDate(dt.getDate() + days);
    return dt;
}