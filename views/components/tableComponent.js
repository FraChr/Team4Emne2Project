function makeTable() {
    return `
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

// filterSatusesBasedOnDateIut(model.inputs.mainPage.fromDate, model.inputs.mainPage.toDate)

function makeTableRow() {
    let rows = '';
    //model.data.filteredStudents
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
                <td>
                    <span>${getStudent(status.studentId).name}</span>
                </td>
                <td>
                    ${Object.values(findNewestStatusPerCourseForStudent(status.studentId)).map((x)=> {
                    return `
                        ${getEvent(x.eventId).name}|${getCourse(x.courseId).name}|${x.date}<br>
                        `;
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
    let isCheckAll = true;
    let checkAllState = source.checked;

    const eventType = 'change'
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
