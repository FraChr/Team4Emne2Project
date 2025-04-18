function getNewDate() {
    let date = new Date();
    let isoDate = date.toISOString();
    let dateOnly = isoDate.split('T').shift();
    return dateOnly;
}

function toLocaleDate(date, locale = 'no-NB') {
    if (!date) return;
    let dateObj = convertIsoDate(date);
    const options = {
        year: '2-digit',
        month: 'short',
        day: '2-digit'
    }
    let localeDate = dateObj.toLocaleString(locale, options);
    return localeDate;
}

function convertIsoDate(date) {
    const time = 'T00:00:00Z'
    let isoDate = date + time;
    let dateObj = new Date(isoDate);
    return dateObj;
}