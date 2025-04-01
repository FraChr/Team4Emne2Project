function getStudent(id) {
    for (const student of model.data.students) {
        if (student.id === id) {
            return student;
        }
    }
    return null;
}

function getCourse(id) {
    for (const course of model.data.courses) {
        if (course.id === id) {
            return course;
        }
    }
    return null;
}

function getEvent(id) {
    for (const event of model.data.events) {
        if (event.id === id) {
            return event;
        }
    }
    return null;
}

function getPayment(id) {
    for (const payment of model.data.payments) {
        if (payment.id === id) {
            return payment;
        }
    }
    return null;
}

function getStatus(id) {
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
                ${getEvent(status.eventId).name} | ${getCourse(status.courseId).name} <br>
                ${toLocaleDate(status.date, setLocaleDate)}
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
                ${toLocaleDate(payment.date, setLocaleDate)} <br>       
            `;
        }
    }
    return paymentData;
}