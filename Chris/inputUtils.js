
// getter / setter model.inputs.mainPage;

function getInputMainStudentIds() {
    return model.inputs.mainPage.studentIds;
}

function setInputMainStudentIds(values) {
    return model.inputs.mainPage.studentIds.push(values);
}

function clearInputMainStudentIds() {
    model.inputs.mainPage.studentIds = [];
}


function getInputMainSelectedCourses() {
    return model.inputs.mainPage.selectedCurses;
}

function setInputMainSelectedCourses(values) {
    return model.inputs.mainPage.selectedCurses.push(values);
}

function clearInputMainSelectedCourses() {
    return model.inputs.mainPage.selectedCurses = [];
}

function getInputMainSelectedEvents() {
    return model.inputs.mainPage.selectedEvents;
}

function setInputMainSelectedEvents(value) {
    return model.inputs.mainPage.selectedEvents.push(value);
}

function clearInputMainSelectedEvents() {
    return model.inputs.mainPage.selectedEvents = [];
}

function getMainInputToDate() {
    return model.inputs.mainPage.toDate;
}

function setMainInputToDate(value) {
    return model.inputs.mainPage.toDate = value;
}

function clearMainInputToDate() {
    return model.inputs.mainPage.toDate = null;
}

function getMainInputFromDate() {
    return model.inputs.mainPage.fromDate;
}

function setMainInputFromDate(value) {
    return model.inputs.mainPage.fromDate = value;
}

function clearMainInputFromDate() {
    return model.inputs.mainPage.fromDate = null;
}

// setter / getter model.inputs.payment;

function getInputPaymentAmount() {
    return model.inputs.payment.amount;
}

function setInputPaymentAmount(value) {
    return model.inputs.payment.amount = value;
}

function clearInputPaymentAmount() {
    return model.inputs.payment.amount = null;
}

function getInputPaymentDate() {
    return model.inputs.payment.date;
}

function setInputPaymentDate(value) {
    return model.inputs.payment.amount = value;
}

function clearInputPaymentDate() {
    return model.inputs.payment.amount = null;
}

// setter / getter model.inputs.studentPage;

function getInputStudentId() {
    return model.inputs.studentPage.studentId;
}

function setInputStudentId(value) {
    return model.inputs.studentPage.studentId = value;
}

function clearInputStudentId() {
    return model.inputs.studentPage.studentId = null;
}

function getInputStudentPayAmount() {
    return model.inputs.payment.paymentAmount;
}

function setInputStudentPayAmount(value) {
    return model.inputs.payment.paymentAmount = value;
}

function clearInputStudentPayAmount() {
    return model.inputs.payment.paymentAmount = null;
}

function getInputStudentPayDate() {
    return model.inputs.payment.paymentDate;
}

function setInputStudentPayDate(value) {
    return model.inputs.payment.paymentDate = value;
}

function clearInputStudentPayDate() {
    return model.inputs.payment.paymentDate = null;
}



// getData.js function
