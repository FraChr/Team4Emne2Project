function setError(message) {
    return console.error(`Error: ${message}`);
}

const errorCodes = {
    noError: 0,
    invalidType: -1,
    noValue: -2,
    notValidArray: -3,
    idNotFound: -4,
    objPropNotFound: -5,
}

const defaultErrors = [
    {code: errorCodes.noError, exit: false},
    {code: errorCodes.invalidType, exit: true, message: 'Invalid type'},
    {code: errorCodes.noValue, exit: true, message: 'Value is required'},
    {code: errorCodes.notValidArray, exit: true, message: 'Invalid array'},
    {code: errorCodes.idNotFound, exit: true, message: 'Id not found'},
    {code: errorCodes.objPropNotFound, exit: true, message: 'Object property not found'},
];

function triggerError(errorCode, message) {
    const error = defaultErrors.find(error => error.code === errorCode);

    if(!error) setError('Unexpected error');

    if(error.code === errorCodes.noError) return error.exit;

    setError(message ?? error.message);
    return error.exit;
}