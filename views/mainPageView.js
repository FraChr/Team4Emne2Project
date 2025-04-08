function mainPageView(){
    return /*HTML*/`
        ${makeFilterButtonHtml()}
        ${makeDateAndSemesterSelect()}
        ${makeEventButtonsHtml()}
        ${makeTable()}
    `;
}