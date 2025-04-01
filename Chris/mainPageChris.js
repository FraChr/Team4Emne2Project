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
                <th><input type="checkbox"></th>
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
    for (const student of model.data.students) {
        rows += /*html*/ `
            <tr>
                <td><input type="checkbox"></td>
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