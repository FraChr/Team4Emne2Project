function makeTable(){
    return /*HTML*/`
        <table>
            <tr>
                <th class="firstColumnElement">
                    <input type="checkbox" id="checkAll" onclick="checkAll(this)"/>
                </th>
                <th>Navn</th>
                <th>Betalt</th>
                <th>Status</th>
            </tr>
            ${makeTableRow()}
        </table>
    `;
}


function makeTableRow(){
    let rows = '';
    for (const status of model.data.filteredStudents) {
        rows += /*html*/ `
            <tr>
                <td>
                    <input 
                        type="checkbox" 
                        class="checkbox" 
                        onchange="pushStudentId('${status.studentId}')" 
                        value="${status.studentId}" 
                        onclick="updateCheckAll()"
                    />
                </td>
                <td onclick="test(${status.studentId})" class="tableNameMainPage">
                    <span>${getStudent(status.studentId).name}</span>
                </td>
                <td>
                    ${getPaymentData(status.studentId).map((event) => {
                        return /*HTML*/`
                            ${getCourse(event.course).name} - 
                            <span class="orangeTextColor">  Kr: ${event.amount},-</span> ${toLocaleDate(event.date)} -
                            <span class="orangeTextColor">Sum: ${event.sum},-</span>
                            <br> 
                        `;
                    }).join('')}
                </td>
                <td>
                    ${getStatusData(status.studentId).map((x)=> {
                        return /*HTML*/`
                            <span id="event">${x.event.name}</span>
                            <span class="orangeTextColor">${x.course.name}</span>
                            <span id="date">${toLocaleDate(x.date)}</span><br>
                        `;
                    }).join('')}
                </td>
            </tr>
       `;
    }
    return rows;
}

function checkAll(source) {
    let isCheckAll = true;
    let checkAllState = source.checked;

    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.checked = source.checked;
        pushStudentId(checkbox.value, isCheckAll, checkAllState);
    });
    isCheckAll = false;
}

function updateCheckAll() {
    const allCheckBoxes = document.querySelectorAll('.checkbox');
    const checkAll = document.getElementById('checkAll');

    checkAll.checked = Array.from(allCheckBoxes).every(checkBox => checkBox.checked);
}