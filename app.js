function init(){
    model.data.semesters[0].end = getNewDate();
    model.inputs.mainPage.toDate = getNewDate();
    filterStudentStatus();
    updateView();
}

function updateView(){
    let currentView = '';
    switch (model.app.currentPage){
        case 'mainPage':
            currentView = mainPageView();
            break;
        case 'profilePage':
            currentView = studentViewTest();
            break;
    }
    const app = document.getElementById('app');
    app.innerHTML = /*html*/`
        <div>
            ${currentView}
        </div>
    `;
}