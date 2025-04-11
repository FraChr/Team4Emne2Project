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
    //else studentStatus = Object.values(getNewestStatus(currentStudentStatus));
    else studentStatus = getNewestStatus(currentStudentStatus);
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
    const newestStatusPerCourse = [];
    for(const status of currentStudentStatus){
        if(model.inputs.mainPage.selectedCurses.includes(status.courseId) || model.inputs.mainPage.selectedCurses[0] === 0){
            if(model.inputs.mainPage.selectedEvents.includes(status.eventId) || model.inputs.mainPage.selectedEvents[0] === 0){
                if(status.date > model.inputs.mainPage.fromDate && status.date < model.inputs.mainPage.toDate){
                    newestStatusPerCourse.push(status);
                }
            }
        }
        else{
        courseIndex = newestStatusPerCourse.indexOf(newestStatusPerCourse.find(x => x.courseId === status.courseId));
        if(courseIndex < 0){
            newestStatusPerCourse.push(status);
        }
        else{
            if(newestStatusPerCourse[courseIndex].date < status.date){
                newestStatusPerCourse[courseIndex] = status;
            }
        }
    }
    }
    return newestStatusPerCourse;
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