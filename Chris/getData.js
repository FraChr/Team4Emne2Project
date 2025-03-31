function getStudents(id) {

    for (const student of model.data.students) {
        if (student.id === id) {
            return student;
        }
    }

}

function getCourses(id) {

    for (const course of model.data.courses) {
        if (course.id === id) {
            return course;
        }
    }

}

function getEvents(id) {

    for (const event of model.data.events) {
        if (event.id === id) {
            return event;
        }
    }
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
        if (status.id === id) {
            return status;
        }
    }
}