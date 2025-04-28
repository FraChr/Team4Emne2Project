function mainPageView(){
    return /*HTML*/`
        <div class='mainPageBody'>
            ${makeFilterButtonHtml()}
            ${makeDateAndSemesterSelect()}
            ${makeEventButtonsHtml()}
            ${makeTable()}
        </div>
    `;
}