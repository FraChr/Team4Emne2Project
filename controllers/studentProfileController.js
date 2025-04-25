function sortHistory() {
    model.inputs.studentPage.currentSortDirection = model.inputs.studentPage.currentSortDirection === 'asc' ? 'desc' : 'asc';
    updateView();
}

function changeStudentStatusProfile(studentId){
    const newStudentStatus = model.inputs.studentPage.userChoiceStatus;
    const studentCourse = model.inputs.studentPage.userChoiceCourse;

    let statusID = model.data.studentStatus[model.data.studentStatus.length - 1].id;
    let todaysDate = getNewDate();
    statusID++;

    model.data.studentStatus.push(
        {
            id: statusID,
            eventId: parseInt(newStudentStatus),
            courseId: parseInt(studentCourse),
            studentId: model.inputs.studentPage.studentId,
            date: todaysDate
        })
    updateView();
    // if (newStudentStatus === 'addPayment'){
    //     addPayment(studentCourse);
    // }
    // else {
    //     for (const chosenStudent of model.inputs.mainPage.studentIds){
    //         model.data.studentStatus.push({ id: statusID, eventId: parseInt(newStudentStatus), courseId: parseInt(studentCourse), studentId: parseInt(chosenStudent), date: todaysDate });
    //         statusID++;
    //     }
    // }

    // resetInputs ({
    //     'inputs.payment.enablePayment': false,
    //     'inputs.payment.date': '',
    //     'inputs.payment.amount': 0,
    //     'inputs.mainPage.studentIds': [],
    // });
}

function addPaymentProfile(courseIdinput){
    model.inputs.payment.amount = document.getElementById('paymentAmountInputProfile').value;
    model.inputs.payment.date = document.getElementById('paymentDateInputProfile').value;

    let paymentId = model.data.studentStatus[model.data.studentStatus.length - 1].id + 1;

    model.data.payments.push(
        {
            id: paymentId,
            courseId: parseInt(courseIdinput),
            studentId: model.inputs.studentPage.studentId,
            amount: parseInt(model.inputs.payment.amount),
            date: model.inputs.payment.date
        })

    updateView();
}