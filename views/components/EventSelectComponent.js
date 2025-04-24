function makeEventButtonsHtml(){
    return /*HTML*/`
    <div>
        ${createEventSelector(true)}
        ${createCourseSelector()}
        ${createPaymentInput()}
        ${createUpdateStatusButton()}
    </div>
    `;
}

function createEventSelector(payment){
    return /*HTML*/`
        <select id="userChoiceStatus" onchange="eventSelectionInput('inputs.mainPage.userChoiceStatus', this.value)" required>
            <option value="" disabled selected> Legg til hendelse </option>
            <option value="1"> Søkt </option>
            <option value="2"> Godkjent </option>
            <option value="3"> Startet </option>
            <option value="4"> Avbrutt </option>
            <option value="5"> Fullført </option>
            ${payment ? `<option value="addPayment">Betal</option>` : ''}
        </select>
    `;
}

function createCourseSelector(){
    return /*HTML */`
            <select id="userChoiceCourse" onchange="eventSelectionInput('inputs.mainPage.userChoiceCourse', this.value)" required>
            <option value="" disabled selected> Velg kurs </option>
            <option value="1"> Start IT </option>
            <option value="2"> Frontend </option>
            <option value="3"> Fagskolen </option>
            <option value="4"> Get Prepared </option>
            <option value="5"> Get IT </option>
        </select>
    `;
}

function createPaymentInput(){
    return /*HTML*/`
        <input disabled type="number" id="paymentAmountInput" onchange="eventSelectionInput('inputs.payment.amount', this.valueAsNumber)" placeholder="Beløp" >
        <input disabled type="date" onchange="eventSelectionInput('inputs.payment.date', this.value)" id="paymentDateInput"> 
    `;
}

function createUpdateStatusButton(){
    return /*HTML*/`
        <button disabled id="statusButton" 
        onclick="changeStudentStatus()">
            Oppdater
        </button>
    `;
}