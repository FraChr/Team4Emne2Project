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

    const setLocaleDate = 'no-NB';
    const currentStudentStatus = model.data.studentStatus.filter(x => x.studentId === id);
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

function getNewestStatus(currentStudentStatus){
    // const filteredEvents = filterEvents();
    // const courseIds = new Set(filteredEvents.map(x => `${x.courseId}|${x.eventId}`));
    //
    // const filteredStatuses = currentStudentStatus.filter(status =>
    //     courseIds.has(`${status.courseId}|${status.eventId}`)
    // )

    return Object.values(currentStudentStatus
        .reduce((acc, status) => {
            const { courseId, date } = status;
            if (!acc[courseId] || date > acc[courseId].date) {
                acc[courseId] = status;
            }
            return acc;
        }, {}));
}


function getPaymentData(id){
    const errorMsg = 'id is required';
    if(nullOrUndefined(id, errorMsg)) return;
    const setLocaleDate = 'no-NB';
    const payments = model.data.payments
    let total = sum(payments);
    return payments
        .filter(payment => payment.studentId === id)
        .map(payment => {
            return {
                amount: payment.amount,
                date: toLocaleDate(payment.date, setLocaleDate),
                course: payment.courseId,
                sum: total
            }
        });
}

function sum(payments) {
    return payments.reduce((acc, x) => {
        return acc + Number(x.amount)
    }, 0);

}

function sumPayments(id) {
    const studentPayments = model.data.payments;
    const reduceDefault = 0;
    const total = studentPayments
        .filter(student => id === student.studentId)
        .reduce((acc, student) => {
            return acc + Number(student.amount);
        }, reduceDefault);

    let paymentId;
    if(model.data.paymentSums.length > 0){
        paymentId = model.data.paymentSums[model.data.paymentSums.length - 1].id;
        paymentId++;
    } else {
        paymentId = 1;
    }

    model.data.paymentSums.push({id: paymentId, studentId: id, amount: total});

    return total;
}