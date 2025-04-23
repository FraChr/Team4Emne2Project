function getNewDate(){
    let date = new Date();
    let isoDate = date.toISOString();
    return isoDate.split('T').shift();
}

function toLocaleDate(date, locale = 'no-NB'){
    if(nullOrUndefined(date, 'must have a valid date')) return;
    let dateObj = convertIsoDate(date);
    const options = {
        year: '2-digit',
        month: 'short',
        day: '2-digit',
    }
    return dateObj.toLocaleString(locale, options);
}

function convertIsoDate(date){
    const time = 'T00:00:00Z';
    let isoDate = date + time;
    return new Date(isoDate);
}