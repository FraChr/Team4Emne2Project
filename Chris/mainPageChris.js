function mainPageChrisView() {
    return /*html*/ `
        <table>
            <tr>
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
            <td>${getStudents(status.studentId).name}</td>
            <td>kr: ${getPayments(status.studentId).amount ?? 'N/A'},- ${getPayments(status.studentId).date}</td>
            <td>${getEvents(status.eventId).name}, ${status.date}</td>
        </tr>
    `;
    }
    return rows;
    // return /*html*/ `
    //     <tr>
    //         <td>${getStudentName()}</td>
    //         <td>saf</td>
    //         <td>saf</td>
    //     </tr>
    // `;
}

function getEventString() {

}

// function getStudentName(id) {
//     for (const student of model.data.students) {
//         if (student.id === id) {
//             return student.name;
//         }
//     }
// }

