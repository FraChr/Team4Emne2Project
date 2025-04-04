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
            <div> ${drawHistory()} </div>
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
                <th> Kurs: </th>
                <td> Fagskolen </td>
            </tr>
            <tr>
                <th> Status: </th>
                <td> 
                    Startet, Fagskole 10.01.25 
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

//skal ikke brukes, bare hardkodet sånn at jeg har noe å gå etter
function drawHistory(){
    return /*HTML*/ `
        
        <table>
            <tr>
                <th> Historikk <button> ↑↓ </button> </th> 
            </tr>
            <tr>
                <td> 12.01.25 - Begynt på Fagskole </td> 
            </tr>
            <tr>
                <td> 10.01.25 - Fullført Start IT </td> 
            </tr>
            <tr>
                <td> 05.01.25 - Godkjent Fagskole søknad </td> 
            </tr>
            <tr>
                <td> 01.01.25 - Søkt Fagskole </td> 
            </tr>
            <tr>
                <td> 09.08.24 - Begynt på Start IT </td> 
            </tr>
            <tr>
                <td> 01.07.24 - Godkjent Start IT søknad </td> 
            </tr>
            <tr>
                <td> 23.06.24 - Søkt Start IT </td> 
            </tr>
        <table>
    `;
}



function makeHistory(){ 
    let row = '';
    for (let student of model.data.studentStatus){
        row += /*HTML*/ `
            <tr>
                <td> ${getStudentStatus(student.id)}</td>
            </tr>
        `;
    }

    return /*HTML*/ `
        <table> 
            <tr>
                <th> Historikk <button> ↑↓ </button> </th> 
            </tr>
            ${row}
        </table>
    `;
}