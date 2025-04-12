function getInputByPath(path) {
    const [inputType, prop] = path.split('.');
    return getInput(inputType, prop);
}

function getInput(inputType, prop) {
    const errorMsg = `${prop} not found in ${inputType}`;
    const inputSelection = model.inputs[inputType];
    if(!hasProperty(inputSelection, prop, errorMsg)) return;
    return inputSelection[prop];
}

// function setInputByPath(path, value) {
//     const [inputType, prop] = path.split('.');
//     setInput(inputType, prop, value);
// }

// function setInput(inputType, prop, value) {
//     const inputSelection = model.inputs[inputType];
//     if(hasProperty(inputSelection, prop)) {
//         handleArrayInput(inputSelection, prop, value);
//         handleVariableInput(inputSelection, prop, value);
//     } else {
//         setError(`Unknown property ${prop}`);
//     }
// }

function setInputByPath(path, value) {
    const [dataLocation, inputType, prop] = path.split('.');
    setInput(dataLocation, inputType, prop, value);
}

function setInput(dataLocation, inputType, prop = null, value) {
    const errorMsg = `${inputType} not property of ${dataLocation}`;
    const inputLocation = model[dataLocation];
    if(!hasProperty(inputLocation, inputType, errorMsg)) return;

    const inputSelection = model[dataLocation][inputType];

    if(prop !== null) {
        if(hasProperty(inputSelection, prop)) {
            handleArrayInput(inputSelection, prop, value);
            handleVariableInput(inputSelection, prop, value);
        } else {
            setError(`Unknown property ${prop}`);
            // inputLocation[inputSelection] = value;
        }
    }
    if(prop === null) {
        inputLocation[inputType] = value;
    }
}

function get(obj, key) {
    const getterMap = {

    }
}

// function get(dataLocation, inputType, prop = null) {
//     const errorMsg = `${inputType} not property of ${dataLocation}`;
//     const test = model[dataLocation];
//     if(!hasProperty(test, inputType, errorMsg)) return;
//
//     const inputSelection = model[dataLocation][inputType];
//
//     if(prop !== null) {
//         const errorMsg = `${prop} not found in ${inputType}`;
//         if(!hasProperty(inputSelection, prop, errorMsg)) return;
//         return inputSelection[prop];
//     }
//     return inputSelection;
// }

function handleArrayInput(inputSelection, prop, value) {
    if(Array.isArray(inputSelection[prop])) {
        inputSelection[prop] = Array.isArray(value) ? value : [value];
    }
}

function handleVariableInput(inputSelection, prop, value) {
    if(validateInput(value, typeof(inputSelection[prop]))) return;
    inputSelection[prop] = value;
}