function nullOrUndefined(value, message){
    if(value === null || value === undefined) triggerError(errorCodes.noValue, message);
    return errorCodes.noError;
}

function validateInput(value, type, message){
    if(nullOrUndefined(value)) return triggerError(errorCodes.noValue, message);
    if(typeof(value) !== type) return triggerError(errorCodes.invalidType, message);
    return errorCodes.noError;
}

function hasProperty(obj, prop, message){
    if(Object.hasOwn(obj, prop)){
        return true;
    } else {
        triggerError(errorCodes.invalidType, message);
        return false;
    }
}

function isArray(value, message) {
    if(!Array.isArray(value)) return triggerError(errorCodes.notValidArray, message);
    return errorCodes.noError;
}