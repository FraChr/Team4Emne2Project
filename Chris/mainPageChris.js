function mainPageChrisView() {
    return /*html*/ `
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
            <th><input type="checkbox"></th>
            <td>${getStudents(status.studentId).name}</td>
            <td>
                kr: ${getPayments(status.studentId).amount ?? 'N/A'},- 
                <br>
                 ${getPayments(status.studentId).date}
            </td>
            <td>${getEvents(status.eventId).name} <br> ${toLocaleDate(status.date)}</td>
        </tr>
    `;
    }
    return rows;
}