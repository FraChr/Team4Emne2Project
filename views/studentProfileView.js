// studentView(studentId);
function studentViewTest(){
    let studentId = model.inputs.studentPage.studentId;
    console.log(studentId);
    // model.app.currentPage = 'profilePage';

    return /*HTML*/`
        <div>
            <button onclick="getMainView()"> ← </button>
        </div>

        <div class="profile">
            <div>
                <div> ${drawStudentInfo(studentId)} </div>
                <div> ${drawCourseInfo(studentId)} </div>
            </div>
            <div>${drawHistory(studentId)} </div>
        </div>
    `;
}

function getMainView(){
    model.app.currentPage = 'mainPage';
    updateView();
}

function test(studentId){
    model.inputs.studentPage.studentId = studentId;
    model.app.currentPage = 'profilePage';
    updateView();
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

function makeCourseInfo(){
    return /*HTML*/ `
        <table id='studentCourseInfo'> 
            
            <tr>
                <th> Status: </th>
                <td> 
                    Fagskole - Startet - 10.01.25 
                    <button> Legg til hendelse </button>
                </td>
            </tr>
                <tr>
                    <th> Betalt: </th>
                    <td> 
                        Sum: 3000 kr
                        <button> Legg til hendelse </button>
                            <ul>
                                <li> 1000 kr - 02.02.25 </li>
                                <li> 2000 kr - 24.01.25 </li>
                            </ul>
                    </td>
                </tr>
        </table>
    `;
}

function drawCourseInfo(studentId){
    let payments = [];
    for (let payment of model.data.payments){
        if (payment.studentId === studentId){
            payments.push(payment);
        }
    }
   
    let studentStatuses = [];
    for (let status of model.data.studentStatus){
        if (status.studentId === studentId){
            studentStatuses.push(status);
        }
    }

    studentStatuses.sort((a,b) => new Date(a.date) - new Date(b.date));
    let latestStatus = studentStatuses.pop();
    let courseName = '';
    for (let course of model.data.courses){
        if (course.id === latestStatus.courseId){
            courseName = course.name;
        }
    }

    let eventName = '';
    for (let event of model.data.events){
        if (event.id === latestStatus.eventId){
            eventName = event.name;
        }
    }

    let paymentListHTML = '';
    let totalPaid = 0;
    
    for (const payment of payments) {
        paymentListHTML += /*HTML*/ `
            <li>
                ${payment.amount} kr - ${payment.date}
            </li>
        `;
        totalPaid += payment.amount;
    }

    return /*HTML*/ `
        <table id='studentCourseInfo'> 
            <tr>
                <th>Status:</th>
                <td>
                    ${courseName} - ${eventName} - ${toLocaleDate(latestStatus.date)}  
                </td>
                <td>
                    ${drawEventSelectorProfile()}
                    ${drawCourseSelectorProfile()}
                    ${drawUpdateButtonProfile()}
                </td>
            </tr>
            <tr>
                <th>Betalt:</th>
                <td>
                    Sum: ${totalPaid} kr
                    <ul>
                        ${paymentListHTML}
                    </ul>
                </td>
                <td>
                    ${drawPaymentSelectorProfile()}
                </td>
            </tr>
            <tr>
            
            </tr>
        </table>
    `;
}

// function drawHistory(studentId){ 
//     return /*HTML*/ `
//         <table> 
//             <tr>
//                 <th> Historikk <button> ↑↓ </button> </th> 
//             </tr>
            
//                 ${getStatusData(studentId, true).map(x => {
//                     return /*HTML*/`
//                         <tr>
//                             <td>
//                                 ${x.event.name}
//                             </td>
//                             <td>
//                                 ${x.course.name}
//                             </td>
//                             <td>
//                                 ${x.date}
//                             </td>
//                         </tr>
//                     `;
//                 }).join('')}
//         </table>
//     `;
// }

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
        <table> 
            <tr>
                <th> Historikk <button onclick='sortHistory()'> ↑↓ </button> </th> 
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

function drawEventSelectorProfile(){
    return /*HTML*/`
    <select id="userChoiceStatusProfile" onchange="model.inputs.studentPage.userChoiceStatus = this.value" required>
        <option value="" disabled selected> Legg til hendelse </option>
        <option value="1"> Søkt </option>
        <option value="2"> Godkjent </option>
        <option value="3"> Startet </option>
        <option value="4"> Avbrutt </option>
        <option value="5"> Fullført </option>
    </select>
        `;
        // ${payment ? `<option value="addPayment">Betal</option>` : ''}
    }

function drawCourseSelectorProfile(){
    return /*HTML */`
    <select id="userChoiceCourseProfile" onchange="model.inputs.studentPage.userChoiceCourse = this.value" required>
        <option value="" disabled selected> Velg kurs </option>
        <option value="1"> Start IT </option>
        <option value="2"> Frontend </option>
        <option value="3"> Fagskolen </option>
        <option value="4"> Get Prepared </option>
        <option value="5"> Get IT </option>
    </select>
    `;
}

function drawUpdateButtonProfile(){
    return /*HTML*/`
        <button id="statusButtonProfile" 
            onclick="changeStudentStatusProfile()">
            Oppdater
        </button>
    `;
}

function drawPaymentSelectorProfile(){
    return /*HTML*/`
    <select id="userChoiceCourseProfile" onchange="model.inputs.studentPage.userChoiceCourse = this.value" required>
        <option value="" disabled selected> Velg kurs </option>
        <option value="1"> Start IT </option>
        <option value="2"> Frontend </option>
        <option value="3"> Fagskolen </option>
        <option value="4"> Get Prepared </option>
        <option value="5"> Get IT </option>
    </select>
    
    <input type="number" id="paymentAmountInputProfile" onchange="model.inputs.paymentAmount = this.value" placeholder="Beløp" >
    <input type="date" onchange="model.inputs.profilePage.paymentDate" id="paymentDateInputProfile">
    
    <button id="statusButtonProfile" 
        onclick="addPaymentProfile()">
        Oppdater
    </button>
    `;
}