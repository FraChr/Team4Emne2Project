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
    
    <label>Beløp:</label>
    <input disabled type="number" id="paymentAmountInput">
    <label>Dato:</label>
    <input disabled type="date" id="paymentDateInput">

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

// function getStudentStatus(id) {
//     const setLocaleDate = 'no-NB'
//     let statusData = '';
//     for (const status of model.data.studentStatus) {
//         if (status.studentId === id) {
//             statusData += /*html*/ `
//                 ${getEvent(status.eventId).name} | ${getCourse(status.courseId).name} <br>
//                 ${toLocaleDate(status.date, setLocaleDate)}
//             `;
//         }
//     }
//     return statusData;
// }

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

//HUSK Å GJØR INDEX I PUSHSTUDEN ID TIL LET
function changeStudentStatus(newStudentStatus, studentCourse) {
    let statusID = model.data.studentStatus[model.data.studentStatus.length - 1].id;
    let todaysDate = getNewDate();
    statusID++;
    let index;

    if (newStudentStatus == 'addPayment') {
        addPayment(studentCourse);
    }
    else {
        for (const chosenStudent of model.inputs.mainPage.studentIds) {
            model.data.studentStatus.push({ id: statusID, eventId: parseInt(newStudentStatus), courseId: parseInt(studentCourse), studentId: parseInt(chosenStudent), date: todaysDate });
            statusID++;
            //bytt ut currentStudentStatus med den nye statusen
            //Splice?
            for(const student of model.data.currentStudentStatus){
                index = model.data.currentStudentStatus.indexOf(student)
                console.log(index);
                if(student.studentId === chosenStudent.studentId){
                    model.data.currentStudentStatus.splice(index, 1)
                    model.data.currentStudentStatus.push({ id: statusID, eventId: parseInt(newStudentStatus), courseId: parseInt(studentCourse), studentId: parseInt(chosenStudent), date: todaysDate })
                    
                    // student.statusId = parseInt(newStudentStatus);
                }
            }
        }
    }
    
    console.log(model.data.studentStatus)
    updateView();
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

function getStudentStatus(id) {
    const setLocaleDate = 'no-NB'
    let newestDate = new Date(0);
    let statusData = '';
    // for(const status of model.data.studentStatus){
    //     if(status.studentId === id && new Date(status.date) > newestDate){
    //         newestDate = new Date(status.date);
    //         statusData += /*html*/ `
    //         ${getEvent(status.eventId).name} | ${getCourse(status.courseId).name} <br>
    //         ${toLocaleDate(status.date, setLocaleDate)}
    //         `;
    //     }
    // }
    for(const status of model.data.currentStudentStatus){
        if(status.studentId === id){
            statusData += /*html*/ `
            ${getEvent(status.eventId).name} | ${getCourse(status.courseId).name} <br>
            ${toLocaleDate(status.date, setLocaleDate)}
            `;
        }
    }
        // for (const status of model.data.studentStatus) {
        //     if(status.date > newestDate){
        //         newestDate = status.date
        //     }
        // if (status.studentId === id) {
        //     statusData += /*html*/ `
        //         ${getEvent(status.eventId).name} | ${getCourse(status.courseId).name} <br>
        //         ${toLocaleDate(status.date, setLocaleDate)}
        //     `;
        // }
        // }
    return statusData;
}

/*Vise kun nyeste hendelse:
- Sammenligne dato
- Vise alle kurs hvis flere

*/