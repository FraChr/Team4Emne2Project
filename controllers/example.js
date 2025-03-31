test();
function test() {
    let courses = [];
    let events = [];
    for (let cours of model.data.courses) {
        courses.push(cours.name);
    }
    for (let event of model.data.events) {
        events.push(event.name);
    }
    document.getElementById("app").innerHTML = /*HTML*/`
        <div>
            ${createButtonsHTML(courses)} 
            ${createButtonHTML('Se alle kurs', 'handleSeAlleKurs()')}
        </div>
        
        <div>
            ${createButtonsHTML(events)} 
            ${createButtonHTML('Se alle hendelser', 'handleSeAlleHendelser()')}
        </div>
    `;
}