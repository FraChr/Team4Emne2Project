function getStudents(id) {
    for (const student of model.data.students) {
        if (student.id === id) {
            return student;
        }
    }
    return null;
}

function getCourses(id) {
    for (const course of model.data.courses) {
        if (course.id === id) {
            return course;
        }
    }
    return null;
}

function getEvents(id) {
    for (const event of model.data.events) {
        if (event.id === id) {
            return event;
        }
    }
    return null;
}

function getPayments(id) {
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
    let statusData = '';
    for (const status of model.data.studentStatus) {
        if (status.studentId === id) {
            statusData += /*html*/ `
                ${getEvents(status.eventId).name} | ${getCourses(status.courseId).name} <br>
                ${toLocaleDate(status.date)}
            `;
        }
    }
    return statusData;
}

function getStudentPayment(id) {
    let paymentData = '';
    for (const payment of model.data.payments) {
        if (payment.studentId === id) {
            paymentData += /*html*/ `
                ${payment.amount},- 
                ${toLocaleDate(payment.date)} <br>       
            `;
        }
    }
    return paymentData;
}