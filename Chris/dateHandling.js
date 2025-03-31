function getNewDate() {
    let date = new Date();
    isoDate = date.toISOString();
    let dateOnly = isoDate.split('T')[0];
    return dateOnly;
}

function toLocaleDate(date) {
    let dateObj = convertIsoDate(date);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }
    let localeDate = dateObj.toLocaleString('no-NB', options);
    console.log(localeDate);
}

function convertIsoDate(date) {
    const time = 'T00:00:00Z'
    let isoDate = date + time;
    let dateObj = new Date(isoDate);
    return dateObj;
}