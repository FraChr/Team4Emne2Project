function getEntity(collection, id, typeName){
    if(!id) return setError(`${typeName} id not defined`);
    return collection.find(item => item.id === id || null);
}

function getStudent(id){
    const errorMsg = 'id is required';
    if(nullOrUndefined(id, errorMsg)) return;
    return getEntity(model.data.students, id, 'Student');
}

function getCourse(id){
    const errorMsg = 'id is required';
    if(nullOrUndefined(id, errorMsg)) return;
    return getEntity(model.data.courses, id, 'Course');
}

function getEvent(id){
    const errorMsg = 'id is required';
    if(nullOrUndefined(id, errorMsg)) return;
    return getEntity(model.data.events, id, 'Event');
}

function getStatusData(id, allStudentData = false){
    const errorMsg = 'id is required';
    if (nullOrUndefined(id, errorMsg)) return;

    const currentStudentStatus = model.data.studentStatus.filter(status => status.studentId === id);
    let studentStatus;

    if(allStudentData) studentStatus = currentStudentStatus
    else studentStatus = getNewest(currentStudentStatus);
    return studentStatus
        .map(status => {
            return {
                event: getEvent(status.eventId),
                course: getCourse(status.courseId),
                date: status.date,
            }
        });
}

// function getNewestStatus(currentStudentStatus) {
//     const newestStatusPerCourse = [];
//     for(const status of currentStudentStatus){
//         if(model.inputs.mainPage.selectedCurses.includes(status.courseId) || model.inputs.mainPage.selectedCurses[0] === 0){
//             if(model.inputs.mainPage.selectedEvents.includes(status.eventId) || model.inputs.mainPage.selectedEvents[0] === 0){
//                 if(status.date >= model.inputs.mainPage.fromDate && status.date <= model.inputs.mainPage.toDate){
//                     newestStatusPerCourse.push(status);
//                 }
//             }
//         }
//         else{
//         courseIndex = newestStatusPerCourse.indexOf(newestStatusPerCourse.find(x => x.courseId === status.courseId));
//         if(courseIndex < 0){
//             newestStatusPerCourse.push(status);
//         }
//         else{
//             if(newestStatusPerCourse[courseIndex].date < status.date){
//                 newestStatusPerCourse[courseIndex] = status;
//             }
//         }
//     }
//     }
//     return newestStatusPerCourse;
// }

function getNewest(currentStudentStatus){
    return Object.values(currentStudentStatus
        .reduce((res, status) => {
            const { courseId, date } = status;
            if (!res[courseId] || date > res[courseId].date) {
                res[courseId] = status;
            }
            return res;
        }, {}));
}

function getPaymentData(id, allPaymentData = false){
    const errorMsg = 'id is required';
    if(nullOrUndefined(id, errorMsg)) return;

    const currentStudentPayment = model.data.payments.filter(x => x.studentId === id);
    let payments;

    if(allPaymentData) payments = currentStudentPayment;
    else payments = getNewest(currentStudentPayment);

    const totalsByCourse = sum(currentStudentPayment);

    return payments.map(payment => {
        return {
            amount: payment.amount,
             date: payment.date,
            course: payment.courseId,
            sum: totalsByCourse[payment.courseId],
        }
    });
}

function sum(payments) {
    return payments.reduce((res, payment) => {
        const courseId = payment.courseId;
        res[courseId] = (res[courseId] || 0) + payment.amount;
        return res;
    }, {});
}

function generateId(path) {
    const pathVar = get(path);
    const currentMaxId = pathVar.reduce((res, val) => Math.max(res, val.id), 0);
    const nextAvailableId = currentMaxId + 1;
    return nextAvailableId;
}