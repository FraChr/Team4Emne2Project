function updateView() {
    let currentView = '';
    switch (model.app.currentPage) {
        case 'mainPage':
            currentView = mainPageView();
            break;
    }
    const app = document.getElementById('app');
    app.innerHTML = /*html*/ `
        <div>
            ${currentView}
        </div>
    `;
}