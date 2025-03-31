function createButtonHTML(name, onclick) {

    return /*HTML*/ `
    <button onclick='${onclick ?? ''}'>${name}</button>
    `;
}

function createButtonsHTML(names) {
    let html = '';
    for (let name of names) {
        html += createButtonHTML(name, 'handle' + capitalizeFirstLetter(removeAllSpaces(name)) + '()');
    }

    return html;
}

function capitalizeFirstLetter(str) {

    return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeAllSpaces(str) {

    return str.split(" ").join("");
}