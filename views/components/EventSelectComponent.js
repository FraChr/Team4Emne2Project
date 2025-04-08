function makeEventButtonsHtml() {
    return /*HTML*/`
        <select id="userChoiceStatus" onchange="checkButtonStatus()" required>
        <option value="" disabled selected>Legg til hendelse</option>
        <option value="1">Søkt</option>
        <option value="2">Godkjent</option>
        <option value="3">Startet</option>
        <option value="4">Avbrutt</option>
        <option value="5">Fullført</option>
        <option value="addPayment">Betal</option>
    </select>

    <select id="userChoiceCourse" onchange="checkButtonStatus()" required>
        <option value="" disabled selected>Velg kurs</option>
        <option value="1">Start IT</option>
        <option value="2">Frontend</option>
        <option value="3">Fagskolen</option>
        <option value="4">Get Prepared</option>
        <option value="5">Get IT</option>
    </select>

    <input disabled type="number" id="paymentAmountInput" placeholder="Beløp">
    <input disabled type="date" id="paymentDateInput">

    <button disabled id="statusButton" 
    onclick="changeStudentStatus(document.getElementById('userChoiceStatus').value, 
    document.getElementById('userChoiceCourse').value)">
        Oppdater
    </button>
    `
}