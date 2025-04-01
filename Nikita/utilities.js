function createButtonHTML(name, id, buttonsType, buttonClass) {

    return /*HTML*/ `
    <button class='${buttonClass ?? ''}' onclick='handleOnclick(${id}, "${buttonsType}")'>${name}</button>
    `;
}

function createButtonsHTML(buttonsType) {
    let html = '';
    let selectedButtons;
    let dataSet;
    let nameForShowAllButton;

    switch (buttonsType) {
        case 'courses':
            nameForShowAllButton = 'Sa alle kurs';
            selectedButtons = model.inputs.mainPage.selectedCurses;
            dataSet = model.data.courses;
            break;
        case 'events':
            nameForShowAllButton = 'Sa alle hendelser';
            selectedButtons = model.inputs.mainPage.selectedEvents;
            dataSet = model.data.events;
            break;
    }

    for (const data of dataSet) {
        let buttonClass = '';
        if (selectedButtons.includes(data.id) || selectedButtons[0] === 0) {
            buttonClass = 'pushedButton';
        }
        html += /*HTML*/` ${createButtonHTML(data.name, data.id, buttonsType, buttonClass)}`;
    }

    let buttonClass = selectedButtons[0] === 0 ? 'pushedButton' : '';
    html += /*HTML*/` ${createButtonHTML(nameForShowAllButton, 0, buttonsType, buttonClass)}`;

    return html;
}


function handleOnclick(id, buttonsType) {
    let selectedButtons;

    switch (buttonsType) {
        case 'courses':
            selectedButtons = model.inputs.mainPage.selectedCurses;
            break;
        case 'events':
            selectedButtons = model.inputs.mainPage.selectedEvents;
            break;
    }

    if (id === 0) {
        if (selectedButtons[0] !== 0) {
            selectedButtons.splice(1);
            selectedButtons[0] = 0;
        }
        else {
            selectedButtons[0] = 1;
        }
    }
    
    else {
        if (selectedButtons.includes(id)) {
            let index = selectedButtons.indexOf(id);
            selectedButtons.splice(index, 1);
            if(selectedButtons.length < 1){
                selectedButtons[0] = 1;  
            }
        }
        else {
            if (selectedButtons[0] !== 0) {
                selectedButtons.push(id);
            }
        }
    }

    updateView();
}

function capitalizeFirstLetter(str) {

    return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeAllSpaces(str) {

    return str.split(" ").join("");
}
