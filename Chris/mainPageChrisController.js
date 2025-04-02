function filter(param, courseId, eventId) {
    const filters = {
        event: (status, eventId) => status.eventId === eventId,
        course: (status, courseId) => status.courseId === courseId,
    };

    if(!filters[param]) {
        setError(`Invalid filter parameter ${param}`);
        return;
    }

    return model.data.studentStatus.filter(status =>  {
        return filters[param](status, courseId, eventId);
    });
}

function filterEvents() {
    return model.inputs.mainPage.selectedEvents.flatMap(event => filter('event', event));
}

function filterCourses() {
    return model.inputs.mainPage.selectedCurses.flatMap(course => filter('course', course));
}


function removeDuplicateStudentId() {

  const filtered = [...filterCourses(), ...filterEvents()];



  console.log('filtered', filtered);


  const unique = [];
  const seenStudentIds = new Set();

    for (const student of filtered) {
        if (!seenStudentIds.has(student.studentId)) {
            unique.push(student);
            seenStudentIds.add(student.studentId);
        }
    }

    console.log(`unique array: `,unique);
    console.log(`seenStudentIds: `, seenStudentIds);
    model.data.filteredStudents = unique;

    updateView();
}



// Move to individual student page;
function studentPage(studentId) {
    model.inputs.studentPage.studendId = studentId;
    model.app.currentPage = '';
    updateView();
}