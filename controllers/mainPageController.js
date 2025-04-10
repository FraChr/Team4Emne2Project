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

    if (userChoiceStatus.value === 'addPayment') {
        paymentAmountInput.disabled = false;
        paymentDateInput.disabled = false;
    }
    else {
        paymentAmountInput.disabled = true;
        paymentDateInput.disabled = true;
    }
}

function changeStudentStatus(newStudentStatus, studentCourse) {
    let statusID = model.data.studentStatus[model.data.studentStatus.length - 1].id;
    let todaysDate = getNewDate();
    statusID++;

    if (newStudentStatus === 'addPayment') {
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

    for (const student of model.inputs.mainPage.studentIds) {
        model.data.payments.push({ id: paymentId, courseId: parseInt(studentCourse), studentId: parseInt(student), amount: parseInt(model.inputs.payment.amount), date: model.inputs.payment.date });
        paymentId++;
    }
}

function pushStudentId(studentId, isCheckAll, checkAllState) {
    const studentIds = model.inputs.mainPage.studentIds;
    const included = studentIds.includes(studentId);

    if (isCheckAll && !checkAllState) {
        removeFromStudentIds(studentId, studentIds);
        return;
    }
    if (isCheckAll && !included) {
        addToStudentIds(studentId, studentIds);
        return;
    }

    if (!isCheckAll && included) {
        removeFromStudentIds(studentId, studentIds);
        return;
    }
    if (!isCheckAll && !included) {
        addToStudentIds(studentId, studentIds);
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
    }

    else {
        if (selectedButtons.includes(id)) {
            if (selectedButtons.length > 1) {
                let index = selectedButtons.indexOf(id);
                selectedButtons.splice(index, 1);
            }
        }
        else {
            if (selectedButtons[0] == selectAllButtonId) {
                selectedButtons.splice(0,selectedButtons.length);
            }
            selectedButtons.push(id);
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
    return courses.filter(course => events.includes(course.eventId));
}

function filterCourses() {
    const allCourses = 0;
    const courses = model.inputs.mainPage.selectedCurses;
    const terms = filterTerms();
    if (courses.includes(allCourses)) {
        return terms;
    }
    return terms.filter(status => courses.includes(status.courseId));
}

function filterTerms() {
    const toDate = model.inputs.mainPage.toDate;
    const fromDate = model.inputs.mainPage.fromDate;
    return model.data.studentStatus.filter(status => status.date >= fromDate && status.date <= toDate);
}

function removeDuplicateStudent(filtered) {
     return Object.values(filtered.reduce((acc, student) => {
        const {studentId} = student;
        if(!acc[studentId]) {
            acc[studentId] = student;
        }
        return acc;
    }, {}))
     .sort(sortByName);
}

function sortByName(a, b) {
    const name = getStudent(a.studentId).name;
    const name2 = getStudent(b.studentId).name;
    return name.localeCompare(name2);
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
    filterStudentStatus();
    updateView();
}

function handleFromDateInput(inputedDate) {
    model.inputs.mainPage.fromDate = inputedDate;
    updateView();
}

function handleToDateInput(inputedDate) {
    model.inputs.mainPage.toDate = inputedDate;
    updateView();
}

function findNewestStatusPerCourseForStudent(studentId) {
    let studentStatuses = model.data.studentStatus.filter(x => x.studentId === studentId);
    const newestStatusPerCourse = {};
    for(const status of studentStatuses){
        const courseId = status.courseId.toString();
        if (!newestStatusPerCourse[courseId] || status.date > newestStatusPerCourse[courseId].date) {
            newestStatusPerCourse[courseId] = status;
        }
        // else {
        //     if (status.date > newestStatusPerCourse[courseId].date) {
        //         newestStatusPerCourse[courseId] = status;
        //     }
        // }

    }
    return newestStatusPerCourse;
}