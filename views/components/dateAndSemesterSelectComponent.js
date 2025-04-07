function makeDateAndSemesterSelect() {
    let list = '';
    for (const semester of model.data.semesters) {
        list += /*HTML*/`
        <option ${semester.id === model.inputs.mainPage.semesterId ? "selected" : ""} value=${semester.id}>
            ${semester.name}
        </option>
        `;
    }
    return /*HTML*/ `
    <div>
        <input type='date' onchange='handleFromDateInput(this.value)' value='${model.inputs.mainPage.fromDate}' max='${model.inputs.mainPage.toDate}'>
        <input type='date' onchange='handleToDateInput(this.value)' value='${model.inputs.mainPage.toDate}' min='${model.inputs.mainPage.fromDate}'>
        <select onchange= 'uppdateDateAndSemesterInputs(Number(this.value))'>
            ${list}
        </select>
    </div>
    `;
}