function checkButtonStatus(){
    const {userChoiceStatus, userChoiceCourse} = model.inputs.mainPage;

    model.inputs.mainPage.enableStatusButton = !!(userChoiceStatus || userChoiceCourse);

    model.inputs.payment.enablePayment = userChoiceStatus === 'addPayment' || model.app.currentPage === 'profilePage';


    updatePaymentInputs();
    updateStatusButton();
}

function eventSelectionInput(input, value){
    set(input, value);
    checkButtonStatus();
}

function changeStudentStatus(){
    const newStudentStatus = model.inputs.mainPage.userChoiceStatus;
    const studentCourse = model.inputs.mainPage.userChoiceCourse;

    let statusID = generateId('data.studentStatus');
    let todaysDate = getNewDate();

    if (newStudentStatus === 'addPayment' || newStudentStatus === ""){
        addPayment(studentCourse);
    }
    else {
        model.inputs.mainPage.studentIds.push(model.inputs.studentPage.studentId)
        for (const chosenStudent of model.inputs.mainPage.studentIds){
            model.data.studentStatus.push(
                {
                    id: statusID,
                    eventId: parseInt(newStudentStatus),
                    courseId: parseInt(studentCourse),
                    studentId: parseInt(chosenStudent),
                    date: todaysDate
                });
        }
    }

    updateView();
    resetInputs ({
        'inputs.payment.enablePayment': false,
        'inputs.payment.date': '',
        'inputs.payment.amount': 0,
        'inputs.mainPage.studentIds': [],
        'inputs.mainPage.userChoiceStatus': ''
    });
}

function addPayment(studentCourse) {
    const maxDecimalPlaces = 2;
    let paymentId = generateId('data.payments');

    if(model.app.currentPage === 'profilePage'){
        model.inputs.mainPage.studentIds.push(model.inputs.studentPage.studentId)
    }

    for (const student of model.inputs.mainPage.studentIds){
        model.data.payments.push(
            {
                id: paymentId,
                courseId: parseInt(studentCourse),
                studentId: parseInt(student),
                amount: Number(model.inputs.payment.amount).toFixed(maxDecimalPlaces),
                date: model.inputs.payment.date
            });
    }
}

function pushStudentId(studentId, isCheckAll, checkAllState){
    const studentIds = model.inputs.mainPage.studentIds;
    const included = studentIds.includes(studentId);

    if (isCheckAll && !checkAllState){
        removeFromStudentIds(studentId, studentIds);
        return;
    }
    if (isCheckAll && !included){
        addToStudentIds(studentId, studentIds);
        return;
    }
    if (!isCheckAll && included){
        removeFromStudentIds(studentId, studentIds);
        return;
    }
    if (!isCheckAll && !included){
        addToStudentIds(studentId, studentIds);
    }
}

function removeFromStudentIds(studentId, studentIds){
    const index = studentIds.indexOf(studentId);
    studentIds.splice(index, 1);
}

function addToStudentIds(studentId, studentIds){
    studentIds.push(studentId);
}

function handleOnclick(id, buttonsType){
    let selectedButtons;
    let selectAllButtonId = 0;

    switch (buttonsType){
        case 'courses':
            selectedButtons = model.inputs.mainPage.selectedCurses;
            break;
        case 'events':
            selectedButtons = model.inputs.mainPage.selectedEvents;
            break;
    }

    if (id === selectAllButtonId){
        if (selectedButtons[0] !== selectAllButtonId){
            selectedButtons.splice(1);
            selectedButtons[0] = selectAllButtonId;
        }
    } 
    else {
        if (selectedButtons.includes(id)){
            if (selectedButtons.length > 1) {
                let index = selectedButtons.indexOf(id);
                selectedButtons.splice(index, 1);
            }
        }
        else {
            if (selectedButtons[0] == selectAllButtonId){
                selectedButtons.splice(0,selectedButtons.length);
            }
            selectedButtons.push(id);
        }
    }
    filterStudentStatus();
    updateView();
}

function filterStudentStatus(){
    const filtered = [...filterEvents()];
    model.data.filteredStudents = removeDuplicateStudent(filtered);
    model.inputs.mainPage.studentIds = [];
}

function filterEvents(){
    const allEvents = 0;
    const courses = filterCourses();
    const events = model.inputs.mainPage.selectedEvents;
    if (events.includes(allEvents)){
        return courses;
    }
    return courses.filter(course => events.includes(course.eventId));
}

function filterCourses(){
    const allCourses = 0;
    const courses = model.inputs.mainPage.selectedCurses;
    const terms = filterTerms();
    if (courses.includes(allCourses)){
        return terms;
    }
    return terms.filter(status => courses.includes(status.courseId));
}

function filterTerms(){
    const toDate = model.inputs.mainPage.toDate;
    const fromDate = model.inputs.mainPage.fromDate;
    return model.data.studentStatus.filter(status => status.date >= fromDate && status.date <= toDate);
}

function removeDuplicateStudent(filtered){
     return Object.values(filtered.reduce((res, student) => {
        const {studentId} = student;
        if(!res[studentId]){
            res[studentId] = student;
        }
        return res;
    }, {}))
     .sort(sortByName);
}

function sortByName(firstVal, secondVal){
    const firstName = getStudent(firstVal.studentId).name;
    const secondName = getStudent(secondVal.studentId).name;
    return firstName.localeCompare(secondName);
}

function uppdateDateAndSemesterInputs(selectedSemesterId){
    model.inputs.mainPage.semesterId = selectedSemesterId;
    for (const semester of model.data.semesters) {
        if (semester.id === selectedSemesterId) {
            model.inputs.mainPage.fromDate = semester.start;
            model.inputs.mainPage.toDate = semester.end;
            break;
        }
    }
    filterStudentStatus();
    updateView();
}

function handleFromDateInput(inputedDate) {
    model.inputs.mainPage.fromDate = inputedDate;
    updateView();
}

function handleToDateInput(inputedDate) {
    model.inputs.mainPage.toDate = inputedDate;
    updateView();
}

function getStudentView(studentId){
    model.inputs.studentPage.studentId = studentId;
    model.app.currentPage = 'profilePage';
    updateView();
}