function mainPageView(){
    return /*HTML*/`
        ${makeFilterButtonHtml()}
        ${makeDateAndSemesterSelect()}
        ${makeEventButtonsHtml()}
        ${makeTable()}
        
    `;
}

function updatePaymentInputs() {
    const enable = model.inputs.payment.enablePayment;
    document.getElementById('paymentAmountInput').disabled = !enable;
    document.getElementById('paymentDateInput').disabled = !enable;
}

function updateStatusButton() {
    const enable = model.inputs.mainPage.statusButton;
    document.getElementById('statusButton').disabled = !enable;
}