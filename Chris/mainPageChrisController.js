function filterStudents(id, param) {
    const filters = {
        event: (status, id) => status.eventId === id,
        course: (status, id) => status.courseId === id,
    };

    model.data.filteredStudents = model.data.studentStatus.filter(status =>  {
        const filterFunc = filters[param];
        return filterFunc ? filterFunc(status, id) : setError(`Id: ${id} or param: ${param} not set`);
    });
}