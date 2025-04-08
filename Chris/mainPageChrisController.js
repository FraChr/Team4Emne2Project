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
    model.inputs.mainPage.studentIds = [];
}


function addPayment() {
    //Må finne ut om vi skal ha pop up eller ei
}

// function pushStudentId(studentId) {
//     if (model.inputs.mainPage.studentIds.includes(studentId)) {
//         index = model.inputs.mainPage.studentIds.indexOf(studentId);
//         model.inputs.mainPage.studentIds.splice(index, 1);
//     }
//     else {
//         // setInputMainStudentIds(studentId);
//         model.inputs.mainPage.studentIds.push(studentId);
//     }
//     console.log(model.inputs.mainPage.studentIds);
// }

function removeFromStudentIds(studentId) {
    const index = model.inputs.mainPage.studentIds.indexOf(studentId);
    model.inputs.mainPage.studentIds.splice(index, 1);
}
function addToStudentIds(studentId) {
    const studentIds = model.inputs.mainPage.studentIds;
    studentIds.push(studentId);
}

function pushStudentId(studentId) {
    const isCheckAll = model.inputs.mainPage.isCheckAll;
    const studentIds = model.inputs.mainPage.studentIds;
    const checkAllState = model.inputs.mainPage.checkAllState;
    const included = studentIds.includes(studentId);

    if(isCheckAll && !checkAllState) {
        removeFromStudentIds(studentId);
        console.log(model.inputs.mainPage.studentIds);
        return;
    }
    if(isCheckAll && !included){
        addToStudentIds(studentId);
        console.log(model.inputs.mainPage.studentIds);
        return;
    }

    if(!isCheckAll && included){
        removeFromStudentIds(studentId);
        console.log(model.inputs.mainPage.studentIds);
        return;
    }
    if(!isCheckAll && !included) {
        addToStudentIds(studentId);
        console.log(model.inputs.mainPage.studentIds);
        return;
    }
    console.log(model.inputs.mainPage.studentIds);
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
    // model.data.filteredStudents = removeDuplicateStudent(filtered);model.inputs.mainPage.studentIds = [];
    setFilteredLogs(removeDuplicateStudent(filtered))
    // setInputByPath('mainPage.studentIds', []);
    model.inputs.mainPage.studentIds = [];
}

function filterEvents() {
    const allEvents = 0;
    const courses = filterCourses();
    // const events = model.inputs.mainPage.selectedEvents;
    // const events = getInput('mainPage', 'selectedEvents');
    const events = getInputByPath('mainPage.selectedEvents');

    if (events.includes(allEvents)) {
        return courses;
    }
    return courses.filter(course => events.includes(course.eventId))
}

function filterCourses() {
    const allCourses = 0;
    const courses = model.inputs.mainPage.selectedCurses;
    if (courses.includes(allCourses)) {
        return getLogs();
    }
    return getLogs().filter(status => courses.includes(status.courseId));
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