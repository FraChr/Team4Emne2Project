function mainPageView(){
    return /*HTML*/`
        <div class='mainPageBody'>
        ${makeFilterButtonHtml()}
        ${makeDateAndSemesterSelect()}
        ${makeEventButtonsHtml()}
        ${makeTable()}
        </div>
    `;
}

function updatePaymentInputs(){
    const enable = model.inputs.payment.enablePayment;
    document.getElementById('paymentAmountInput').disabled = !enable;
    document.getElementById('paymentDateInput').disabled = !enable;
}

function updateStatusButton(){
    let enable = model.inputs.mainPage.enableStatusButton;
    document.getElementById('statusButton').disabled = !enable;
}