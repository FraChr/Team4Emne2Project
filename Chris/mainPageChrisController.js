function filterStudentStatus() {
    const filtered = [...filterEvents()];
    model.data.filteredStudents = removeDuplicateStudent(filtered);
    updateView();
}

function filterEvents() {
    const allEvents = 0;
    const courses = filterCourses();
    const events = model.inputs.mainPage.selectedEvents;
    if(events.includes(allEvents)) {
        return courses;
    }
    return courses.filter(course => events.includes(course.eventId))
}

function filterCourses() {
    const allSelected = 0;
    const courses = model.inputs.mainPage.selectedCurses;
    if(courses.includes(allSelected)) {
        return model.data.studentStatus;
    }
    return model.data.studentStatus.filter(status => courses.includes(status.courseId));
}

function removeDuplicateStudent(filtered) {
    const unique = [];
    const seenStudentIds = new Set();

    for (const student of filtered) {
        if (!seenStudentIds.has(student.studentId)) {
            unique.push(student);
            seenStudentIds.add(student.studentId);
        }
    }
    return unique;
}



// Move to individual student page;
function studentPage(studentId) {
    model.inputs.studentPage.studendId = studentId;
    model.app.currentPage = '';
    updateView();
}