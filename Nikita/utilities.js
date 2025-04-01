function createButtonHTML(name, onclick, style) {

    return /*HTML*/ `
    <button class='${style ?? ''}' onclick='${onclick ?? ''}'>${name}</button>
    `;
}

function createButtonsHTML(type, datas) {
    let html = '';
    let onClick = ''
    let selectedButtons;
    switch (type) {
        case 'cours':
            onClick = 'handleCours';
            selectedButtons = model.inputs.mainPage.selectedCurses;
            break;
        case 'event':
            onClick = 'handleEvent';
            selectedButtons = model.inputs.mainPage.selectedEvents;
            break;
    }
    for (let data of datas) {
        let style = '';
        if (selectedButtons.includes(data.id)) {
            style = 'pushedButton';
        }
        html += /*HTML*/` ${createButtonHTML(data.name, onClick + '(' + data.id + ')', style)}`;
    }

    return html;
}

function capitalizeFirstLetter(str) {

    return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeAllSpaces(str) {

    return str.split(" ").join("");
}

function handleCours(id) {
    if (model.inputs.mainPage.selectedCurses.includes(id)) {
        let index = model.inputs.mainPage.selectedCurses.indexOf(id);
        model.inputs.mainPage.selectedCurses.splice(index, 1);
    }
    else {
        model.inputs.mainPage.selectedCurses.push(id);
    }
    updateView();
}

function handleEvent(id) {

}