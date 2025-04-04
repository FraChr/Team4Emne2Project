function mainPageChrisView() {
    console.log('TEST');
    filterStudentStatus();
    return /*html*/ `
    <div class="buttons">
        <div>
            ${createButtonsHTML('courses')} 
        </div>

        <div>
            ${createButtonsHTML('events')} 
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

    <button disabled id="statusButton" 
    onclick="changeStudentStatus(document.getElementById('userChoiceStatus').value, 
    document.getElementById('userChoiceCourse').value)">
        Oppdater
    </button>

        <table>
            <tr>
                <th><input type="checkbox" id="checkAll" onclick="checkAll(this)"/></th>
                <th>Navn</th>
                <th>Betalt</th>
                <th>Status</th>
            </tr>
            ${makeTableRow()}
        </table>
    `;
}

// Makes table based on filteredStudents array in model;
function makeTableRow() {
    let rows = '';
    for (const status of model.data.filteredStudents) {
        rows += /*html*/ `
            <tr>
                <td>
                    <input 
                    type="checkbox" 
                    class="checkbox" 
                    onchange="pushStudentId('${status.studentId}')" 
                    value="${status.name}" 
                    onclick="updateCheckAll()"
                    />
                </td>
                <td>
                    <span>${getStudent(status.studentId).name}</span>
                </td>
                <td>
                    ${getPaymentData(status.studentId).map((event) => {
                        return `
                            ${event.date} - ${event.amount},-
                            <br> 
                        `
                    }).join('')}
                </td>
                <td>
                    ${getStatusData(status.studentId).map((event) => {
                        return `
                            ${event.eventName} - ${event.courseName} - ${event.date}
                            <br>
                        `
                    }).join('')}
                </td>
            </tr>
       `;
    }
    return rows;
}

function checkAll(source) {
    const eventType = 'change'
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.checked = source.checked;
        checkbox.dispatchEvent(new Event(eventType));
    });
}

function updateCheckAll() {
    const allCheckBoxes = document.querySelectorAll('.checkbox');
    const checkAll = document.getElementById('checkAll');

    checkAll.checked = Array.from(allCheckBoxes).every(checkBox => checkBox.checked);
}

function createButtonHTML(name, id, buttonsType, buttonClass) {
    return /*HTML*/ `
        <button class='${buttonClass ?? ''}' onclick='handleOnclick(${id}, "${buttonsType}")'>${name}</button>
    `;
}

function createButtonsHTML(buttonsType) {
    let html = '';
    let selectedButtons;
    let dataSet;
    let nameForShowAllButton;

    switch (buttonsType) {
        case 'courses':
            nameForShowAllButton = 'Sa alle kurs';
            selectedButtons = model.inputs.mainPage.selectedCurses;
            dataSet = model.data.courses;
            break;
        case 'events':
            nameForShowAllButton = 'Sa alle hendelser';
            selectedButtons = model.inputs.mainPage.selectedEvents;
            dataSet = model.data.events;
            break;
    }

    for (const data of dataSet) {
        let buttonClass = '';
        if (selectedButtons.includes(data.id) || selectedButtons[0] === 0) {
            buttonClass = 'pushedButton';
        }
        html += /*HTML*/` ${createButtonHTML(data.name, data.id, buttonsType, buttonClass)}`;
    }

    let buttonClass = selectedButtons[0] === 0 ? 'pushedButton' : '';
    html += /*HTML*/` ${createButtonHTML(nameForShowAllButton, 0, buttonsType, buttonClass)}`;

    return html;
}