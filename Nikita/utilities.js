function createButtonHTML(name, onclick) {

    return /*HTML*/ `
    <button onclick='${onclick ?? ''}'>${name}</button>
    `;
}

function createButtonsHTML(type, datas) {
    let html = '';
    let onClick = ''
    switch (type) {
        case 'cours':
            onClick = 'handleCours';
            break;
        case 'event':
            onClick = 'handleEvent';
            break;
    }
    for (let data of datas) {
        html += createButtonHTML(data.name, `${onClick}(${data.id})`);
    }

    return html;
}

function capitalizeFirstLetter(str) {

    return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeAllSpaces(str) {

    return str.split(" ").join("");
}