function getEntity(collection, id, typeName) {
    if(!id) return setError(`${typeName} id not defined`);
    return collection.find(item => item.id === id || null);
}

function getStudent(id) {
    const errorMsg = 'id is required';
    if(nullOrUndefined(id, errorMsg)) return;
    return getEntity(model.data.students, id, 'Student');
}

function getCourse(id) {
    const errorMsg = 'id is required';
    if(nullOrUndefined(id, errorMsg)) return;
    return getEntity(model.data.courses, id, 'Course');
}

function getEvent(id) {
    const errorMsg = 'id is required';
    if(nullOrUndefined(id, errorMsg)) return;
    return getEntity(model.data.events, id, 'Event');
}

function getStatusData(id) {
    const errorMsg = 'id is required';
    if(nullOrUndefined(id, errorMsg)) return;
    const setLocaleDate = 'no-NB'
    return model.data.studentStatus
        .filter(status => status.studentId === id)
        .map(status => {
            return {
                eventName: getEvent(status.eventId),
                courseName: getCourse(status.courseId),
                date: toLocaleDate(status.date, setLocaleDate)
            }
        });
    // return getNewestStatus(id)
    //     .map(status => {
    //         return {
    //             eventName: getEvent(status.eventId),
    //             courseName: getCourse(status.courseId),
    //             date: toLocaleDate(status.date, setLocaleDate)
    //         }
    //     });
}

function getNewestStatus(id) {
    return Object.values(model.data.studentStatus
        .filter(status => status.studentId === id)
        .reduce((acc, status) => {
            const {courseId, date} = status;
            if(!acc[courseId] || date > acc[courseId].date) {
                acc[courseId] = status;
            }
            return acc;
        },{}));


}

function getPaymentData(id) {
    const errorMsg = 'id is required';
    if(nullOrUndefined(id, errorMsg)) return;
    const setLocaleDate = 'no-NB'
    return model.data.payments
        .filter(payment => payment.studentId === id)
        .map(payment => {
            return {
                amount: payment.amount,
                date: toLocaleDate(payment.date, setLocaleDate),
                course: payment.courseId
            }
        });
}