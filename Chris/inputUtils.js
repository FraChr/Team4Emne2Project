function clearStudentIdsInputs() {
    model.inputs.mainPage.studentIds = [];
}

function getStudentIdsInputs() {
    return model.inputs.mainPage.studentIds;
}


function getSelectedCurses() {
    return model.inputs.mainPage.selectedCurses;
}

function getSelectedEvents() {
    return model.inputs.mainPage.selectedEvents;
}


// getData.js function
function getStudentStatus2() {
    return model.data.students;
}