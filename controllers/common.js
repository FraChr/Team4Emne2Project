function checkButtonStatus(){
    const {userChoiceStatus, userChoiceCourse} = model.inputs.common;

    model.inputs.common.enableStatusButton = !!(userChoiceStatus || userChoiceCourse);

    model.inputs.common.enablePayment = userChoiceStatus === 'addPayment' || model.app.currentPage === 'profilePage';


    updatePaymentInputs();
    updateStatusButton();
}

function eventSelectionInput(input, value){
    set(input, value);
    checkButtonStatus();
}

function changeStudentStatus(){
    const newStudentStatus = model.inputs.common.userChoiceStatus;
    const studentCourse = model.inputs.common.userChoiceCourse;

    let statusID = generateId('data.studentStatus');
    let todaysDate = getNewDate();

    if (newStudentStatus === 'addPayment' || newStudentStatus === ""){
        addPayment(studentCourse);
    }
    else {
        model.inputs.mainPage.studentIds.push(model.inputs.studentPage.studentId)
        for (const chosenStudent of model.inputs.mainPage.studentIds){
            model.data.studentStatus.push(
                {
                    id: statusID,
                    eventId: parseInt(newStudentStatus),
                    courseId: parseInt(studentCourse),
                    studentId: parseInt(chosenStudent),
                    date: todaysDate
                });
        }
    }

    updateView();
    resetInputs ({
        'inputs.common.enablePayment': false,
        'inputs.payment.date': '',
        'inputs.payment.amount': 0,
        'inputs.mainPage.studentIds': [],
        'inputs.common.userChoiceStatus': ''
    });
}

function addPayment(studentCourse) {
    const maxDecimalPlaces = 2;
    let paymentId = generateId('data.payments');

    if(model.app.currentPage === 'profilePage'){
        model.inputs.mainPage.studentIds.push(model.inputs.studentPage.studentId)
    }

    for (const student of model.inputs.mainPage.studentIds){
        model.data.payments.push(
            {
                id: paymentId,
                courseId: parseInt(studentCourse),
                studentId: parseInt(student),
                amount: Number(model.inputs.payment.amount).toFixed(maxDecimalPlaces),
                date: model.inputs.payment.date
            });
    }
}


