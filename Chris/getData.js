function getEntity(collection, id, typeName) {
    if(!id) return setError(`${typeName} id not defined`);
    return collection.find(item => item.id === id || null);
}

function getStudent(id) {
    return getEntity(model.data.students, id, 'Student');
}

function getCourse(id) {
    return getEntity(model.data.courses, id, 'Course');
}

function getEvent(id) {
    return getEntity(model.data.events, id, 'Event');
}


function getLogs() {
    return model.data.studentStatus;
}

function setLogs(values) {
    model.data.studentStatus.push(values);
}

function getFilteredLogs() {
    return model.data.filteredStudents;
}

function setFilteredLogs(values) {
    model.data.filteredStudents = Array.isArray(values) ? values : [values];
}

function getStatusData(id) {
    const setLocaleDate = 'no-NB'
    return model.data.studentStatus
        .filter(status => status.studentId === id)
        .map(status => {
         return {
                eventName: getEvent(status.eventId).name,
                courseName: getCourse(status.courseId).name,
                date: toLocaleDate(status.date, setLocaleDate)
            }
        });
}

function getPaymentData(id) {
    const setLocaleDate = 'no-NB'
    return model.data.payments
        .filter(payment => payment.studentId === id)
        .map(payment => {
            return {
                amount: payment.amount,
                date: toLocaleDate(payment.date, setLocaleDate)
            }
        });
}