function makeEventButtonsHtml() {
    return /*HTML*/`
    <div>
        ${createEventSelector(true)}
        ${createCourseSelector()}
        ${createPaymentInput()}
        ${createUpdateStatusButton()}
    </div>
    `;
}

function createEventSelector(payment) {
    let html = /*HTML*/` 
        <select id="userChoiceStatus" onchange="eventSelectionInput('inputs.mainPage.userChoiceStatus', this.value)" required>
        <option value="" disabled selected> Legg til hendelse </option>`;
    let counter = 0;
    html += model.data.events.map(event => {
        counter++;
        return /*HTML*/`
            <option value="${counter}"> ${event.name} </option>
            `;
    }).join('');
    html += /*HTML*/`${payment ? `<option value="addPayment">Betal</option>` : ''} </select>`;

    return html;
}

function createCourseSelector() {
    let html = /*HTML*/` 
        <select id="userChoiceCourse" onchange="eventSelectionInput('inputs.mainPage.userChoiceCourse', this.value)" required>
        <option value="" disabled selected> Velg kurs </option>
    `;
    let counter = 0;
    html += model.data.courses.map(course => {
        counter++;
        return /*HTML*/`
            <option value="${counter}"> ${course.name} </option>
            `;
    }).join('');
    html += /*HTML*/`</select>`;

    return html;
}

function createPaymentInput() {
    return /*HTML*/`
        <input disabled type="number" id="paymentAmountInput" onchange="eventSelectionInput('inputs.payment.amount', this.valueAsNumber)" placeholder="Beløp" >
        <input disabled type="date" onchange="eventSelectionInput('inputs.payment.date', this.value)" id="paymentDateInput"> 
    `;
}

function createUpdateStatusButton() {
    return /*HTML*/`
        <button disabled id="statusButton" 
        onclick="changeStudentStatus()">
            Oppdater
        </button>
    `;
}