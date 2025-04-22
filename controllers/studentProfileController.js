function sortHistory() {
    model.inputs.studentPage.currentSortDirection = model.inputs.studentPage.currentSortDirection === 'asc' ? 'desc' : 'asc';
    updateView();
}