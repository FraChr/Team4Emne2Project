function makeFilterButtonHtml() {
    return /*HTML*/`
        <div class="buttons">
            <div>
                ${createButtonsHTML('courses')} 
            </div>
            <div>
                ${createButtonsHTML('events')} 
            </div>
        </div>
    `;
}

function createButtonHTML(name, id, buttonsType, buttonClass) {
    return /*HTML*/ `
        <button class='${buttonClass ?? ''}' onclick='handleOnclick(${id}, "${buttonsType}")'>${name}</button>
    `;
}

function createButtonsHTML(buttonsType) {
    let html = '';
    let showAllButtonId = 0;
    let selectedCoursesButtons = model.inputs.mainPage.selectedCurses;
    let selectedEventsButtons = model.inputs.mainPage.selectedEvents;
    let coursesData = model.data.courses;
    let eventsData = model.data.events;

    let ShowAllButtonName = buttonsType === 'courses' ? 'Se alle kurs' : 'Se alle hendelser';
    let selectedButtons = buttonsType === 'courses' ? selectedCoursesButtons : selectedEventsButtons;
    let dataSet = buttonsType === 'courses' ? coursesData : eventsData;

    for (const data of dataSet) {
        let buttonClass = 'filterbuttons';
        if (selectedButtons.includes(data.id) || selectedButtons.at(0) === showAllButtonId) {
            buttonClass = 'pushedButton';
        }
        html += /*HTML*/` ${createButtonHTML(data.name, data.id, buttonsType, buttonClass)}`;
    }

    let buttonClass = selectedButtons.at(0) === showAllButtonId ? 'pushedButton' : 'filterbuttons';
    html += /*HTML*/` ${createButtonHTML(ShowAllButtonName, showAllButtonId, buttonsType, buttonClass)}`;

    return html;
}