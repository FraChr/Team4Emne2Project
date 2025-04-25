function sortHistory() {
    model.inputs.studentPage.currentSortDirection = model.inputs.studentPage.currentSortDirection === 'asc' ? 'desc' : 'asc';
    updateView();
}

function changeStudentStatusProfile(){
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
    resetInputs ({
        'inputs.payment.enablePayment': false,
        'inputs.payment.date': '',
        'inputs.payment.amount': 0,
        'inputs.mainPage.studentIds': [],
    });
}

function addPaymentProfile(courseIdinput){
    model.inputs.payment.amount = document.getElementById('paymentAmountInputProfile').value;
    model.inputs.payment.date = document.getElementById('paymentDateInputProfile').value;

    let paymentId = generateId('data.payments')


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

function getMainView(){
    model.app.currentPage = 'mainPage';
    updateView();
}