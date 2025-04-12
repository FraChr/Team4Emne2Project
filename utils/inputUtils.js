function get(path) {
    const [dataLocation, inputType, prop] = path.split('.');
    return getInput(dataLocation, inputType, prop);
}

function getInput(dataLocation, inputType, prop = null) {
    const errorMsg = `${inputType} not property of ${dataLocation}`;
    const test = model[dataLocation];
    if(!hasProperty(test, inputType, errorMsg)) return;

    const inputSelection = model[dataLocation][inputType];

    if(prop !== null) {
        const errorMsg = `${prop} not found in ${inputType}`;
        if(!hasProperty(inputSelection, prop, errorMsg)) return;
        return inputSelection[prop];
    }
    return inputSelection;
}

function set(path, value) {
    const [dataLocation, inputType, prop] = path.split('.');
    setInput(dataLocation, inputType, prop, value);
}

function setInput(dataLocation, inputType, prop = null, value) {
    const errorMsg = `${inputType} not property of ${dataLocation}`;
    const inputLocation = model[dataLocation];
    if(!hasProperty(inputLocation, inputType, errorMsg)) return;

    const inputSelection = model[dataLocation][inputType];

    if(hasProperty(inputSelection, prop)) {
        handleArrayInput(inputSelection, prop, value);
        handleVariableInput(inputSelection, prop, value);
    } else {
        setError(`Unknown property ${prop}`);
    }
}

function handleArrayInput(inputSelection, prop, value) {
    if(Array.isArray(inputSelection[prop])) {
        inputSelection[prop] = Array.isArray(value) ? value : [value];
    }
}

function handleVariableInput(inputSelection, prop, value) {
    if(validateInput(value, typeof(inputSelection[prop]))) return;
    inputSelection[prop] = value;
}

function resetInputs(toReset) {
    Object.entries(toReset).forEach(([path, value]) => {
        set(path, value);
    });
}