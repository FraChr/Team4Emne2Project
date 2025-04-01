function mainPageChrisView() {
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

// Makes table of all students;
// function makeTableRow() {
//     let rows = '';
//     for (const student of model.data.students) {
//         rows += /*html*/ `
//             <tr>
//                 <td><input type="checkbox" class="checkbox" onclick="updateCheckAll()"/></td>
//                 <td>
//                     <span>${student.name}</span>
//                 </td>
//                 <td>
//                     ${getStudentPayment(student.id)}
//                 </td>
//                 <td>
//                     ${getStudentStatus(student.id)}
//                 </td>
//             </tr>
//        `;
//     }
//     return rows;
// }


// Makes table based on filteredStudents array in model;
function makeTableRow() {
    let rows = '';
    for (const student of model.data.filteredStudents) {
        rows += /*html*/ `
            <tr>
                <td><input type="checkbox" class="checkbox" onclick="updateCheckAll()"/></td>
                <td>
                    <span>${getStudent(student.studentId).name}</span>
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