function updateView() {
    let currentView = '';
    switch (model.app.currentPage) {
        case 'mainPageChris':
            currentView = mainPageChrisView();
            break;
    }
    const app = document.getElementById('app');
    app.innerHTML = /*html*/ `
        <div>
            ${currentView}
        </div>
    `;
}