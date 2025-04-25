function makeDateAndSemesterSelect(){
    let list = model.data.semesters.reduce((result, semester) => {
        result += /*HTML*/`
            <option ${semester.id === model.inputs.mainPage.semesterId ? "selected" : ""} value=${semester.id}>
                ${semester.name}
            </option>
        `;
        return result;
    }, '');

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