function studentView(){
    let studentId = model.inputs.studentPage.studentId;

    return /*HTML*/`
        <div>
            <div>
                <button onclick='getMainView()' class='backButton'> ← </button>
            </div>
            <div class="profile">
                <div>
                    <div> ${drawStudentInfo(studentId)} </div>
                    <div> ${drawCourseInfo(studentId)} </div>
                </div>
                <div class='historyContainer'> ${drawHistory(studentId)} </div>
            </div>
        </div>
    `;
}

function drawStudentInfo(studentId){
    let studentInfo = model.data.students;
    for (let student of model.data.students){
        if(student.id === studentId){
            studentInfo = student;
        }
    }
    
    return /*HTML*/ `
        <table id='studentPeronalInfo'> 
            <tr> 
                <th> Navn: </th>
                <td> ${studentInfo.name} </td>
            </tr>
            <tr> 
                <th> Get Academy Mail: </th>
                <td> ${studentInfo.getAcademyMail} </td>
            </tr>
            <tr> 
                <th> Discord: </th>
                <td> ${studentInfo.discord} </td>
            </tr>
            <tr> 
                <th> Mobil: </th>
                <td> ${studentInfo.tlf} </td>
            </tr>
            <tr>
                <th> Privat Mail: </th>
                <td> ${studentInfo.privateMail} </td>
            </tr>
        </table>
    `;
}

function drawCourseInfo(studentId){
    let studentStatuses = getStatusData(studentId, true);

    studentStatuses.sort((a,b) => new Date(a.date) - new Date(b.date));
    let latestStatus = studentStatuses.pop();

    return /*HTML*/ `
        <table id='studentCourseInfo'> 
            <tr>
                <th style='width: 80px'> Status: </th>
                <td>
                    ${latestStatus.course.name} - ${latestStatus.event.name} - ${toLocaleDate(latestStatus.date)}
                </td>
                <td style='width: 200px'>
                    ${createEventSelector()}
                    ${createCourseSelector()}
                    
                </td>
            </tr>
            <tr>
                <th style='width: 80px'> Betalt: </th>
                <td>
                    <ul>
                      ${makePaymentHtml(studentId)}
                    </ul>
                </td>
                <td  style='width: 200px'>
                    ${drawPaymentSelectorProfile2()}
                </td>
            </tr>
            <tr style='border: none;  background-color: #222831;' >
                <td style='border: none;'>
                </td>
                <td style='border: none;'>
                </td>
                <td style='border: none;'>
                    ${createUpdateStatusButton()}
                </td>
            </tr>
        </table>
    `;
}

function drawPaymentSelectorProfile2() {
    const courseSelector = createCourseSelector();
    const paymentInput = createPaymentInput(false);

    return courseSelector + paymentInput;
}

function paymentListElementHtml(coursePayments) {
    return coursePayments.map(payment => {
        return `
            <li>
                ${getCourse(payment.course).name} - ${payment.amount},- ${toLocaleDate(payment.date)}
            </li>
        `
    }).join('');
}

function makePaymentHtml(studentId) {
    let payments = getPaymentData(studentId, true);

    return Object.keys(payments.sum).map(courseId => {
        const course = getCourse(Number(courseId));
        const total = payments.sum[courseId];

        const coursePayments = payments.pay.filter(p => Number(p.course) === Number(courseId));

        return `
            <span class="orangeTextColor">${course.name}</span> - Total sum: <span class="orangeTextColor">${total},-</span>
            
            ${paymentListElementHtml(coursePayments)}
        `
    }).join(`<br>`)
}


function drawHistory(studentId){ 
    const historyData = getStatusData(studentId, true);
    historyData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
    
        if (model.inputs.studentPage.currentSortDirection === 'asc') {
            return dateA - dateB; 
        } else {
            return dateB - dateA; 
        }
    });
    return /*HTML*/ `
        <table class='historyTable'> 
            <tr>
                <th> Historikk <button onclick='sortHistory()' class='buttonOrange'> ↑↓ </button> </th> 
            </tr>
            
                ${historyData.map(x => {
                    return /*HTML*/`
                        <tr>
                            <td>
                                ${x.event.name}
                            </td>
                            <td>
                                ${x.course.name}
                            </td>
                            <td>
                                ${toLocaleDate(x.date)}
                            </td>
                        </tr>
                    `;
                }).join('')}
        </table>
    `;
}


