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
            ${createButtonsHTML('', model.data.courses)} 
            ${createButtonHTML('Se alle kurs', 'handleSeAlleKurs()')}
        </div>

        <div >
            ${createButtonsHTML('', model.data.events)} 
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
    for (const status of model.data.studentStatus) {

        rows += /*html*/ `
        <tr>
            <td><input type="checkbox"></td>
            <td>${getStudents(status.studentId).name}</td>
            <td>
                kr: ${getPayments(status.studentId).amount ?? 'N/A'},- 
                <br> ${toLocaleDate(getPayments(status.studentId).date)}
            </td>
            <td>${getEvents(status.eventId).name}, ${toLocaleDate(status.date)}</td>
        </tr>
    `;
    }
    return rows;
}
