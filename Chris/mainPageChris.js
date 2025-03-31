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
        rows += /*html*/`
            <tr>
                <td><input type="checkbox"></td>
                <td>
                    ${student.name}
                </td>
                <td>
                    ${makePaymentCol(student.id)}
                </td>
                <td>
                    ${makeStatusColHtml(student.id)}
                </td>
                
            </tr>
       `

    }
    return rows;
}

function makeStatusColHtml(id) {
    let statusCol = '';
    for (const status of model.data.studentStatus) {
        if (status.studentId === id) {
            statusCol += /*html*/ `
                ${getEvents(status.eventId).name} | ${getCourses(status.courseId).name} <br>
                ${toLocaleDate(status.date)}
            `;
        }
    }
    return statusCol;
}

function makePaymentCol(id) {
    let paymentCol = '';
    for (const payment of model.data.payments) {
        if (payment.studentId === id) {
            paymentCol += /*html*/ `
                ${payment.amount},- 
                ${toLocaleDate(payment.date)} <br>       
            `;
        }
    }
    return paymentCol;
}
