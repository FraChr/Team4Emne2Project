function mainPageView() {
    console.log('TEST');

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

    <label>Beløp:</label>
    <input disabled type="number" id="paymentAmountInput">
    <label>Dato:</label>
    <input disabled type="date" id="paymentDateInput">

    <button disabled id="statusButton" onclick="changeStudentStatus(document.getElementById('userChoiceStatus').value, document.getElementById('userChoiceCourse').value)">Oppdater</button>

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
    for (const student of model.data.filteredStudents) {
        rows += /*html*/ `
            <tr>
                <td><input type="checkbox" class="checkbox" onchange="pushStudentId('${student.id}')" value="${student.name}" onclick="updateCheckAll()"/></td>
                <td>
                    <span>${getStudent(student.studentId).name}</span>
                </td>
                <td>
                    ${getStudentPayment(student.studentId)}
                </td>
                <td>
                    ${getStudentStatus(student.studentId)}
                </td>
            </tr>
       `;
    }
    return rows;
}

function checkAll(source) {
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.checked = source.checked;
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
        ${makeFilterButtonHtml()}
        ${makeEventButtonsHtml()}
        ${makeTable()}
    `;
}


