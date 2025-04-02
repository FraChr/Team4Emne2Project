function checkButtonStatus() {
    let userChoiceStatus = document.getElementById('userChoiceStatus');
    let userChoiceCourse = document.getElementById('userChoiceCourse');
    if (userChoiceStatus.value && userChoiceCourse.value) {
        statusButton.disabled = false;
    }
    else {
        statusButton.disabled = true;
    }
}

function changeStudentStatus(newStudentStatus, studentCourse) {
    let statusID = model.data.studentStatus[model.data.studentStatus.length - 1].id;
    let todaysDate = getNewDate();
    statusID++;

    if (newStudentStatus == 'addPayment') {
        addPayment();
    }
    else {
        for (const chosenStudent of model.inputs.mainPage.studentIds) {
            model.data.studentStatus.push({ id: statusID, eventId: parseInt(newStudentStatus), courseId: parseInt(studentCourse), studentId: parseInt(chosenStudent), date: todaysDate });
            statusID++;
        }
    }
    console.log(model.data.studentStatus)
    updateView();
}

function addPayment() {
    //Må finne ut om vi skal ha pop up eller ei
}

function pushStudentId(studentId) {


    if (model.inputs.mainPage.studentIds.includes(studentId)) {
        index = model.inputs.mainPage.studentIds.indexOf(studentId);
        model.inputs.mainPage.studentIds.splice(index, 1);
    }
    else {
        model.inputs.mainPage.studentIds.push(studentId);
    }
    console.log(model.inputs.mainPage.studentIds);
}

function handleOnclick(id, buttonsType) {
    let selectedButtons;

    switch (buttonsType) {
        case 'courses':
            selectedButtons = model.inputs.mainPage.selectedCurses;
            break;
        case 'events':
            selectedButtons = model.inputs.mainPage.selectedEvents;
            break;
    }

    if (id === 0) {
        if (selectedButtons[0] !== 0) {
            selectedButtons.splice(1);
            selectedButtons[0] = 0;
        }
        else {
            selectedButtons[0] = 1;
        }
    }

    else {
        if (selectedButtons.includes(id)) {
            let index = selectedButtons.indexOf(id);
            selectedButtons.splice(index, 1);
            if (selectedButtons.length < 1) {
                selectedButtons[0] = 1;
            }
        }
        else {
            if (selectedButtons[0] !== 0) {
                selectedButtons.push(id);
            }
        }
    }

    updateView();
}


function filterStudentStatus() {
    const filtered = [...filterEvents()];
    model.data.filteredStudents = removeDuplicateStudent(filtered);
    updateView();
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
    const allSelected = 0;
    const courses = model.inputs.mainPage.selectedCurses;
    if (courses.includes(allSelected)) {
        return model.data.studentStatus;
    }
    return model.data.studentStatus.filter(status => courses.includes(status.courseId));
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