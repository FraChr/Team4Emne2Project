function checkButtonStatus() {
    let userChoiceStatus = document.getElementById('userChoiceStatus');
    let userChoiceCourse = document.getElementById('userChoiceCourse');
    let paymentAmountInput = document.getElementById('paymentAmountInput');
    let paymentDateInput = document.getElementById('paymentDateInput');
    if (userChoiceStatus.value && userChoiceCourse.value) {
        statusButton.disabled = false;
    }
    else {
        statusButton.disabled = true;
    }

    if(userChoiceStatus.value === 'addPayment'){
        paymentAmountInput.disabled = false;
        paymentDateInput.disabled = false;
    }
    else{
        paymentAmountInput.disabled = true;
        paymentDateInput.disabled = true;
    }
}

function changeStudentStatus(newStudentStatus, studentCourse) {
    let statusID = model.data.studentStatus[model.data.studentStatus.length - 1].id;
    let todaysDate = getNewDate();
    statusID++;

    if (newStudentStatus == 'addPayment') {
        addPayment(studentCourse);
    }
    else {
        for (const chosenStudent of model.inputs.mainPage.studentIds) {
            model.data.studentStatus.push({ id: statusID, eventId: parseInt(newStudentStatus), courseId: parseInt(studentCourse), studentId: parseInt(chosenStudent), date: todaysDate });
            statusID++;
        }
    }
    console.log(model.data.studentStatus)
    updateView();
    model.inputs.mainPage.studentIds = [];
}

function addPayment(studentCourse) {
    model.inputs.payment.amount = document.getElementById('paymentAmountInput').value
    model.inputs.payment.date = document.getElementById('paymentDateInput').value
    let paymentId = model.data.payments[model.data.payments.length - 1].id;
    paymentId++;

    for(const student of model.inputs.mainPage.studentIds){
        model.data.payments.push({id: paymentId, courseId: parseInt(studentCourse), studentId: parseInt(student), amount: parseInt(model.inputs.payment.amount), date: model.inputs.payment.date});
        paymentId++;
    }
}

// function pushStudentId(studentId) {
//     if (model.inputs.mainPage.studentIds.includes(studentId)) {
//         const index = model.inputs.mainPage.studentIds.indexOf(studentId);
//         model.inputs.mainPage.studentIds.splice(index, 1);
//     }
//     else {
//         model.inputs.mainPage.studentIds.push(studentId);
//     }
//     console.log(model.inputs.mainPage.studentIds);
// }

function pushStudentId(studentId, isCheckAll, checkAllState) {
    const studentIds = model.inputs.mainPage.studentIds;
    const included = studentIds.includes(studentId);

    if(isCheckAll && !checkAllState) {
        removeFromStudentIds(studentId, studentIds);
        console.log(model.inputs.mainPage.studentIds);
        return;
    }
    if(isCheckAll && !included){
        addToStudentIds(studentId, studentIds);
        console.log(model.inputs.mainPage.studentIds);
        return;
    }

    if(!isCheckAll && included){
        removeFromStudentIds(studentId, studentIds);
        console.log(model.inputs.mainPage.studentIds);
        return;
    }
    if(!isCheckAll && !included) {
        addToStudentIds(studentId, studentIds);
        console.log(model.inputs.mainPage.studentIds);
    }
}
function removeFromStudentIds(studentId, studentIds) {
    const index = studentIds.indexOf(studentId);
    studentIds.splice(index, 1);
}
function addToStudentIds(studentId, studentIds) {
    studentIds.push(studentId);
}

function handleOnclick(id, buttonsType) {
    let selectedButtons;
    let selectAllButtonId = 0;
    let firstButtonId = 1;

    switch (buttonsType) {
        case 'courses':
            selectedButtons = model.inputs.mainPage.selectedCurses;
            break;
        case 'events':
            selectedButtons = model.inputs.mainPage.selectedEvents;
            break;
    }

    if (id === selectAllButtonId) {
        if (selectedButtons[0] !== selectAllButtonId) {
            selectedButtons.splice(1);
            selectedButtons[0] = selectAllButtonId;
        }
        else {
            selectedButtons[0] = firstButtonId;
        }
    }

    else {
        if (selectedButtons.includes(id)) {
            let index = selectedButtons.indexOf(id);
            selectedButtons.splice(index, 1);
            if (selectedButtons.length < 1) {
                selectedButtons[0] = firstButtonId;
            }
        }
        else {
            if (selectedButtons[0] !== selectAllButtonId) {
                selectedButtons.push(id);
            }
        }
    }
    filterStudentStatus();
    updateView();
}


function filterStudentStatus() {
    const filtered = [...filterEvents()];
    model.data.filteredStudents = removeDuplicateStudent(filtered);
    model.inputs.mainPage.studentIds = [];
}

function filterEvents() {
    const allEvents = 0;
    const courses = filterCourses();
    const events = model.inputs.mainPage.selectedEvents;
    if (events.includes(allEvents)) {
        return courses;
    }
    return courses.filter(course => events.includes(course.eventId))
}

function filterCourses() {
    const allCourses = 0;
    const courses = model.inputs.mainPage.selectedCurses;
    // const terms = filterTerms();
    if (courses.includes(allCourses)) {
        return model.data.studentStatus;
        // return terms;
    }
    // return terms.filter(status => courses.includes(status.courseId));
    return model.data.studentStatus.filter(status => courses.includes(status.courseId));
}

function filterTerms() {
    const term = model.inputs.mainPage.semesterId;
    console.log(term);
    return model.data.studentStatus.filter(status => term === status.termId);
}

function removeDuplicateStudent(filtered) {
    const unique = [];
    const seenStudentIds = new Set();

    for (const student of filtered) {
        if (!seenStudentIds.has(student.studentId)) {
            unique.push(student);
            seenStudentIds.add(student.studentId);
        }
    }
    return unique;
}

function uppdateDateAndSemesterInputs(selectedSemesterId) {
    model.inputs.mainPage.semesterId = selectedSemesterId;
    for (const semester of model.data.semesters) {
        if (semester.id === selectedSemesterId) {
            model.inputs.mainPage.fromDate = semester.start;
            model.inputs.mainPage.toDate = semester.end;
            break;
        }
    }
    updateView();
}

function handleFromDateInput(inputedDate){
    model.inputs.mainPage.fromDate = inputedDate;
    updateView();
}

function handleToDateInput(inputedDate){
    model.inputs.mainPage.toDate = inputedDate;
    updateView();
}