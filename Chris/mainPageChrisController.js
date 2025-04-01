function filterStudents(param, id) {
    const filters = {
        event: (status, id) => status.eventId === id,
        course: (status, id) => status.courseId === id,
    };

    if(!filters[param]) {
        setError(`Invalid filter parameter ${param}`);
        return;
    }

    model.data.filteredStudents = model.data.studentStatus.filter(status =>  {
        return filters[param](status, id);
    });
}

// Move to individual student page;
function studentPage(studentId) {
    model.inputs.studentPage.studendId = studentId;
    model.app.currentPage = '';
    updateView();
}