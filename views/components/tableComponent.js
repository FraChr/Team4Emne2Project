function makeTable() {
    return `
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
