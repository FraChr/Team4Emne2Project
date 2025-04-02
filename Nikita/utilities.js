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
    let selectAllButtonId = 0;

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
        if (selectedButtons.includes(data.id) || selectedButtons[0] === selectAllButtonId) {
            buttonClass = 'pushedButton';
        }
        html += /*HTML*/` ${createButtonHTML(data.name, data.id, buttonsType, buttonClass)}`;
    }

    let buttonClass = selectedButtons[0] === selectAllButtonId ? 'pushedButton' : '';
    html += /*HTML*/` ${createButtonHTML(nameForShowAllButton, selectAllButtonId, buttonsType, buttonClass)}`;

    return html;
}


function handleOnclick(id, buttonsType) {
    let selectedButtons;
    let selectAllButtonId = 0;
    let firstButtonId = 1;

    switch (buttonsType) {
        case 'courses':
            selectedButtons = model.inputs.mainPage.selectedCurses;
            break;
        case 'events':
            selectedButtons = model.inputs.mainPage.selectedEvents;
            break;
    }

    if (id === selectAllButtonId) {
        if (selectedButtons[0] !== selectAllButtonId) {
            selectedButtons.splice(1);
            selectedButtons[0] = selectAllButtonId;
        }
        else {
            selectedButtons[0] = firstButtonId;
        }
    }

    else {
        if (selectedButtons.includes(id)) {
            let index = selectedButtons.indexOf(id);
            selectedButtons.splice(index, 1);
            if(selectedButtons.length < 1){
                selectedButtons[0] = firstButtonId;  
            }
        }
        else {
            if (selectedButtons[0] !== selectAllButtonId) {
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
