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

    return  {
        sum: totalsByCourse,
        pay: payments.map(payment => {
            return {
                amount: payment.amount,
                date: payment.date,
                course: payment.courseId,
            }
        })
    }
}

function sum(payments) {
    return payments.reduce((res, payment) => {
        const courseId = payment.courseId;
        res[courseId] = (res[courseId] || 0) + Number(payment.amount);
        return res;
    }, {});
}

function generateId(path) {
    const itemsAtPath = get(path);
    if(isArray(itemsAtPath)) return;

    const currentMaxId = itemsAtPath.reduce((res, val) => Math.max(res, val.id), 0);
    const nextAvailableId = currentMaxId + 1;
    return nextAvailableId;
}