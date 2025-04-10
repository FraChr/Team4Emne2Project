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

function getStatusData(id, allStudentData = false) {
    const errorMsg = 'id is required';
    if (nullOrUndefined(id, errorMsg)) return;

    const setLocaleDate = 'no-NB'
    const currentStudentStatus = model.data.studentStatus.filter(x => x.studentId === id)
    let studentStatus;

    if(allStudentData) studentStatus = currentStudentStatus
    else studentStatus = Object.values(getNewestStatus(currentStudentStatus));
    return studentStatus
        .map(status => {
            return {
                event: getEvent(status.eventId),
                course: getCourse(status.courseId),
                date: toLocaleDate(status.date, setLocaleDate)
            }
        });
}

function getNewestStatus(currentStudentStatus) {
    const newestStatusPerCourse = {};
    for(const status of currentStudentStatus){
        const courseId = status.courseId.toString();
        if (!newestStatusPerCourse[courseId] || status.date > newestStatusPerCourse[courseId].date) {
            newestStatusPerCourse[courseId] = status;
        }
    }
    return Object.values(newestStatusPerCourse);
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