//FRA APP
updateView();
function updateView() {
    let currentView = '';
    switch (model.app.currentPage) {
        case 'mainPageChris':
            currentView = mainPageJulieView();
            break;
    }
    const app = document.getElementById('app');
    app.innerHTML = /*html*/ `
        <div>
            ${currentView}
        </div>
    `;
}

//FRA CHRIS
//Lagt til select
function mainPageJulieView() {
    let courses = [];
    let events = [];
    for (let cours of model.data.courses) {
        courses.push(cours.name);
    }
    for (let event of model.data.events) {
        events.push(event.name);
    }

    return /*html*/ `
    <div class="buttons">
        <div>
            ${createButtonsHTML(courses)} 
            ${createButtonHTML('Se alle kurs', 'handleSeAlleKurs()')}
        </div>
        <div>
            ${createButtonsHTML(events)} 
            ${createButtonHTML('Se alle hendelser', 'handleSeAlleHendelser()')}
        </div>
    </div>


    <select id="userChoiceStatus" onchange="checkButtonStatus()">
        <option value="" disabled selected>Legg til hendelse</option>
        <option value="1">Søkt</option>
        <option value="2">Godkjent</option>
        <option value="3">Startet</option>
        <option value="4">Avbrutt</option>
        <option value="5">Fullført</option>
        <option value="addPayment">Betal</option>
    </select>

    <select id="userChoiceCourse" onchange="checkButtonStatus()">
        <option value="" disabled selected>Velg kurs</option>
        <option value="1">Start IT</option>
        <option value="2">Frontend</option>
        <option value="3">Fagskolen</option>
        <option value="4">Get Prepared</option>
        <option value="5">Get IT</option>
    </select>

    <button disabled id="statusButton" onclick="changeStudentStatus(document.getElementById('userChoiceStatus').value, document.getElementById('userChoiceCourse').value)">Oppdater</button>


        <table>
            <tr>
                <th><input type="checkbox" onclick="console.log(checked)"></th>
                <th>Navn</th>
                <th>Betalt</th>
                <th>Status</th>
            </tr>
            ${makeTableRow()}
        </table>
    `;

}

//Gjør endringer i checkbox
function makeTableRow() {
    let rows = '';
    for (const student of model.data.students) {
        rows += /*html*/ `
            <tr>
                <td><input type="checkbox" onchange="pushStudentId('${student.id}')" value="${student.name}"></td>
                <td>
                    <a href="">${student.name}</a>
                </td>
                <td>
                    ${getStudentPayment(student.id)}
                </td>
                <td>
                    ${getStudentStatus(student.id)}
                </td>
            </tr>
       `;
    }
    return rows;
}

function getStudent(id) {
    for (const student of model.data.students) {
        if (student.id === id) {
            return student;
        }
    }
    return null;
}

function getCourse(id) {
    for (const course of model.data.courses) {
        if (course.id === id) {
            return course;
        }
    }
    return null;
}

function getEvent(id) {
    for (const event of model.data.events) {
        if (event.id === id) {
            return event;
        }
    }
    return null;
}

function getPayment(id) {
    for (const payment of model.data.payments) {
        if (payment.id === id) {
            return payment;
        }
    }
    return null;
}

function getStatus(id) {
    for (const status of model.data.studentStatus) {
        if (status.studentId === id) {
            return status;
        }
    }
    return null;
}

function getStudentStatus(id) {
    const setLocaleDate = 'no-NB'
    let statusData = '';
    for (const status of model.data.studentStatus) {
        if (status.studentId === id) {
            statusData += /*html*/ `
                ${getEvent(status.eventId).name} | ${getCourse(status.courseId).name} <br>
                ${toLocaleDate(status.date, setLocaleDate)}
            `;
        }
    }
    return statusData;
}

function getStudentPayment(id) {
    const setLocaleDate = 'no-NB'
    let paymentData = '';
    for (const payment of model.data.payments) {
        if (payment.studentId === id) {
            paymentData += /*html*/ `
                ${payment.amount},- 
                ${toLocaleDate(payment.date, setLocaleDate)} <br>       
            `;
        }
    }
    return paymentData;
}

function getNewDate() {
    let date = new Date();
    let isoDate = date.toISOString();
    let dateOnly = isoDate.split('T')[0];
    return dateOnly;
}

function toLocaleDate(date, locale = 'no-NB') {
    if (!date) return;
    let dateObj = convertIsoDate(date);
    const options = {
        year: '2-digit',
        month: 'short',
        day: '2-digit'
    }
    let localeDate = dateObj.toLocaleString(locale, options);
    return localeDate;
}

function convertIsoDate(date) {
    const time = 'T00:00:00Z'
    let isoDate = date + time;
    let dateObj = new Date(isoDate);
    return dateObj;
}

//FRA NIKITA
function createButtonHTML(name, onclick) {

    return /*HTML*/ `
    <button onclick='${onclick ?? ''}'>${name}</button>
    `;
}

function createButtonsHTML(names) {
    let html = '';
    for (let name of names) {
        html += createButtonHTML(name, 'handle' + capitalizeFirstLetter(removeAllSpaces(name)) + '()');
    }

    return html;
}

function capitalizeFirstLetter(str) {

    return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeAllSpaces(str) {

    return str.split(" ").join("");
}

//JULIE

function checkButtonStatus(){
    let userChoiceStatus = document.getElementById('userChoiceStatus');
    let userChoiceCourse = document.getElementById('userChoiceCourse');
    if(userChoiceStatus.value && userChoiceCourse.value){
        statusButton.disabled = false;
    }
    else{
        statusButton.disabled = true;
    }
}

function changeStudentStatus(newStudentStatus, studentCourse){
    let statusID = model.data.studentStatus[model.data.studentStatus.length -1].id;
    let todaysDate = getNewDate();
    statusID++;

    if(newStudentStatus == 'addPayment'){
        addPayment();
    }
    else{
        for(const chosenStudent of model.inputs.mainPage.studentIds){
            model.data.studentStatus.push({id: statusID, eventId: parseInt(newStudentStatus), courseId: parseInt(studentCourse), studentId: parseInt(chosenStudent), date: todaysDate});
            statusID++;
        }
    }
    console.log(model.data.studentStatus)
    updateView();
}

function addPayment(){
    //Må finne ut om vi skal ha pop up eller ei
}

function pushStudentId(studentId){


    if(model.inputs.mainPage.studentIds.includes(studentId)){
        index = model.inputs.mainPage.studentIds.indexOf(studentId);
        model.inputs.mainPage.studentIds.splice(index, 1);
    }
    else{
        model.inputs.mainPage.studentIds.push(studentId);
    }
    console.log(model.inputs.mainPage.studentIds);
}