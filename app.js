// document.addEventListener("DOMContentLoaded", () => {
//     updateView();
// });
window.onload = async () => {
    try {
        await loadFromJson(); // Wait for all resources to load first
        console.log("Finished loading Resources");

        // Now that everything is loaded, update the view
        if (typeof updateView === "function") {
            updateView(); // Update the view after resources are loaded
        } else {
            console.error("updateView is not defined after loading resources.");
        }
    } catch (error) {
        console.error("Error loading resources:", error);
    }
};


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