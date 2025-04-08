
function capitalizeFirstLetter(str) {

    return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeAllSpaces(str) {

    return str.split(" ").join("");
}
//Nikita: move to mainpageview from here
function createDateAndSemestrInputHTML() {
    let list = '';
    for (const semester of model.data.semesters) {
        list += /*HTML*/`
        <option ${semester.id === model.inputs.mainPage.semesterId ? "selected" : ""} value=${semester.id}>
            ${semester.name}
        </option>
        `;
    }
    return /*HTML*/ `
        <input type='date' onchange='handleFromDateInput(this.value)' value='${model.inputs.mainPage.fromDate}' max='${model.inputs.mainPage.toDate}'>
        <input type='date' onchange='handleToDateInput(this.value)' value='${model.inputs.mainPage.toDate}' min='${model.inputs.mainPage.fromDate}'>
        <select onchange= 'uppdateDateAndSemesterInputs(Number(this.value))'>
            ${list}
        </select>
    `;
}
//to here
//Nikita: Move to mainpagecontroller fron here
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

function handleFromDateInput(inputedDate) {
    model.inputs.mainPage.fromDate = inputedDate;
    updateView();
}

function handleToDateInput(inputedDate) {
    model.inputs.mainPage.toDate = inputedDate;
    updateView();
}
//to here


function filterSatusesBasedOnSemester(fromDate, toDate) {
    //const semester = getSemester(semesterId);
    const filtedStudentStatuses = [];
    for (const status of model.data.studentStatus) {
        if (status.date >= fromDate && status.date <= toDate) {
            filtedStudentStatuses.push(status);
        }
    }
    return filtedStudentStatuses;
}

function getSemester(id) {
    for (const semester of model.data.semesters) {
        if (semester.id === id) {

            return semester;
        }
    }
}