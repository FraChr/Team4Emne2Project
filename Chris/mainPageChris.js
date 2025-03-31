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

        <div >
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
        let date = getStatus(student.id).date
        // console.log(toLocaleDate(getStatus(student.id).date))
        console.log(date);
        rows += /*html*/ `
        <tr>
            <td><input type="checkbox"></td>
            <td>${student.name}</td>

            <td>
                ${getEvents(student.id).name},
            </td>
            
        </tr>
    `;
    }
    return rows;
}

// looped status
{/* <td>
                kr: ${getPayments(student.studentId).amount ?? 'N/A'},- 
                <br> ${toLocaleDate(getPayments(student.studentId).date)}
            </td> */}

// <td>${getEvents(student.eventId).name}, ${toLocaleDate(student.date)}</td>