// function filter(param, id) {
//     const filters = {
//         event: (status, eventId) => status.eventId === id,
//         course: (status, courseId) => status.courseId === id,
//     };
//
//     if(!filters[param]) {
//         setError(`Invalid filter parameter ${param}`);
//         return;
//     }
//
//     return model.data.studentStatus.filter(status =>  {
//         return filters[param](status, id);
//     });
// }

function filterEvents() {
    let courses = filterCourses();
    const allSelected = 0;
    // console.log("courses in filterEvents() ",courses);
    let events = model.inputs.mainPage.selectedEvents;
    if(events.includes(allSelected)) {
        return model.data.studentStatus;
    }
    return courses.filter(course => events.includes(course.eventId))
}

function filterCourses() {
    let courses = model.inputs.mainPage.selectedCurses;
    const allSelected = 0;
    // console.log(courses);
    if(courses.includes(allSelected)) {
        return model.data.studentStatus;
    }
    return model.data.studentStatus.filter(status => courses.includes(status.courseId));
}


function removeDuplicateStudentId() {
  const filtered = [...filterEvents()];

//   console.log('courseIds', model.inputs.mainPage.selectedCurses);
//   console.log('eventIds', model.inputs.mainPage.selectedEvents);
//     console.log('events', filterEvents());
//   console.log('filtered', filtered);

  const unique = [];
  const seenStudentIds = new Set();

    for (const student of filtered) {
        if (!seenStudentIds.has(student.studentId)) {
            unique.push(student);
            seenStudentIds.add(student.studentId);
        }
    }

    // console.log(`unique array: `,unique);
    // console.log(`seenStudentIds: `, seenStudentIds);
    model.data.filteredStudents = unique;

    // updateView();
}



// Move to individual student page;
function studentPage(studentId) {
    model.inputs.studentPage.studendId = studentId;
    model.app.currentPage = '';
    updateView();
}