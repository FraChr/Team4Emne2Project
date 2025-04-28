function updatePaymentInputs(){
    const enable = model.inputs.common.enablePayment;
    document.getElementById('paymentAmountInput').disabled = !enable;
    document.getElementById('paymentDateInput').disabled = !enable;
}

function updateStatusButton() {
    let enable = model.inputs.common.enableStatusButton;
    document.getElementById('statusButton').disabled = !enable;
}