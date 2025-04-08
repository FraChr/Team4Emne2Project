function getStudent(id) {
    if(!id) return setError('Student id not defined');
    for (const student of model.data.students) {
        if (student.id === id) {
            return student;
        }
    }
    return null;
}

function getCourse(id) {
    if(!id) return setError('Course id not defined');
    for (const course of model.data.courses) {
        if (course.id === id) {
            return course;
        }
    }
    return null;
}

function getEvent(id) {
    if(!id) return setError('Event id not defined');
    for (const event of model.data.events) {
        if (event.id === id) {
            return event;
        }
    }
    return null;
}

function getPayment(id) {
    if(!id) return setError('Payment id not defined');
    for (const payment of model.data.payments) {
        if (payment.id === id) {
            return payment;
        }
    }
    return null;
}

function getStatus(id) {
    if(!id) return setError('Status id not defined');
    for (const status of model.data.studentStatus) {
        if (status.studentId === id) {
            return status;
        }
    }
    return null;
}

function getStudentStatus(id) {
    const setLocaleDate = 'no-NB'
    let statusData = '';
    for (const status of model.data.studentStatus) {
        if (status.studentId === id) {
            statusData += /*html*/ `
            <tr> 
                <td> 
                    ${toLocaleDate(status.date, setLocaleDate)} 
                    - ${getEvent(status.eventId).name} 
                    ${getCourse(status.courseId).name} 
                </td>
            </tr>    
            `;
        }
    }
    return statusData;
}

function getStudentPayment(id) {
    const setLocaleDate = 'no-NB'
    let paymentData = '';
    for (const payment of model.data.payments) {
        if (payment.studentId === id) {
            paymentData += /*html*/ `
                ${payment.amount},- 
                ${toLocaleDate(payment.date, setLocaleDate)}    
            `;
        }
    }
    return paymentData;
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