function makeEventButtonsHtml() {
    return `
    ${createEventSelector(true)}
    ${createCourseSelector()}
    ${createPaymentInput()}
    ${createUpdateStatusButton()}
    `;
}

// function createEventSelector(payment){
//     return /*HTML*/`
//         <select id="userChoiceStatus" onchange="checkButtonStatus()" required>
//             <option value="" disabled selected>Legg til hendelse</option>
//             <option value="1">Søkt</option>
//             <option value="2">Godkjent</option>
//             <option value="3">Startet</option>
//             <option value="4">Avbrutt</option>
//             <option value="5">Fullført</option>
//             ${payment ? `<option value="addPayment">Betal</option>` : ''}
//         </select>
//     `;
// }

// function createCourseSelector(){
//     return /*HTML */`
//             <select id="userChoiceCourse" onchange="checkButtonStatus()" required>
//             <option value="" disabled selected>Velg kurs</option>
//             <option value="1">Start IT</option>
//             <option value="2">Frontend</option>
//             <option value="3">Fagskolen</option>
//             <option value="4">Get Prepared</option>
//             <option value="5">Get IT</option>
//         </select>
//     `;
// }


function createEventSelector(payment){
    return /*HTML*/`
        <select id="userChoiceStatus" onchange="onStatusChange(this.value)" required>
            <option value="" disabled selected>Legg til hendelse</option>
            <option value="1">Søkt</option>
            <option value="2">Godkjent</option>
            <option value="3">Startet</option>
            <option value="4">Avbrutt</option>
            <option value="5">Fullført</option>
            ${payment ? `<option value="addPayment">Betal</option>` : ''}
        </select>
    `;
}

function createCourseSelector(){
    return /*HTML */`
            <select id="userChoiceCourse" onchange="onCourseChange(this.value)" required>
            <option value="" disabled selected>Velg kurs</option>
            <option value="1">Start IT</option>
            <option value="2">Frontend</option>
            <option value="3">Fagskolen</option>
            <option value="4">Get Prepared</option>
            <option value="5">Get IT</option>
        </select>
    `;
}



function createPaymentInput(){
    return /*HTML*/`
        <input disabled type="number" id="paymentAmountInput" onchange="onPayAmountChange(this.value)" placeholder="Beløp" >
        <input disabled type="date" onchange="onPaymentDateChange(this.value)" id="paymentDateInput"> 
    `
}

function createUpdateStatusButton(){
    return /*HTML*/`
        <button disabled id="statusButton" 
        onclick="changeStudentStatus(document.getElementById('userChoiceStatus').value, 
        document.getElementById('userChoiceCourse').value)">
            Oppdater
        </button>
    `;
}