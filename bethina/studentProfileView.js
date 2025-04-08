studentView();
function studentView(){
    let app = document.getElementById('app');

    app.innerHTML = /*HTML*/`
        <div>
            <button> ← </button>
        </div>

        <div class="profile">
            <div>
                <div> ${drawStudentInfo()} </div>
                <div> ${drawCourseInfo()} </div>
            </div>
            <div> ${makeHistory()} </div>
        </div>
    `;

}

function drawStudentInfo(){
    let studentInfo = model.data.students;
    for (let student of model.data.students){
        if(student.id === model.inputs.studentPage.studendId){
            studentInfo = student;
            break;
        }
    }
    
    return /*HTML*/ `
        <table id="studentPeronalInfo"> 
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

function drawCourseInfo(){
    return /*HTML*/ `
        <table id="studentCourseInfo"> 
            
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


function makeHistory(){ 
    return /*HTML*/ `
        <table> 
            <tr>
                <th> Historikk <button> ↑↓ </button> </th> 
            </tr>
            <tr> 
                <td> ${getStudentStatus(model.inputs.studentPage.studendId)} </td> 
            </tr>
        </table>
    `;
}