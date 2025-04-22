function makeFilterButtonHtml() {
    return `
        <div class="buttons">
            <div>
                ${createButtonsHTML('courses')} 
            </div>
    
            <div>
                ${createButtonsHTML('events')} 
            </div>
        </div>
    `
}

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
            nameForShowAllButton = 'Se alle kurs';
            selectedButtons = model.inputs.mainPage.selectedCurses;
            dataSet = model.data.courses;
            break;
        case 'events':
            nameForShowAllButton = 'Se alle hendelser';
            selectedButtons = model.inputs.mainPage.selectedEvents;
            dataSet = model.data.events;
            break;
    }

    for (const data of dataSet) {
        let buttonClass = 'filterbuttons';
        if (selectedButtons.includes(data.id) || selectedButtons[0] === 0) {
            buttonClass = 'pushedButton';
        }
        html += /*HTML*/` ${createButtonHTML(data.name, data.id, buttonsType, buttonClass)}`;
    }

    let buttonClass = selectedButtons[0] === 0 ? 'pushedButton' : 'filterbuttons';
    html += /*HTML*/` ${createButtonHTML(nameForShowAllButton, 0, buttonsType, buttonClass)}`;

    return html;
}