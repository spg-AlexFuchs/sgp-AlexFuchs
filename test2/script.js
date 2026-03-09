
function Hinzufugen(){
    var name = document.getElementById("name").value;
    var alter = parseInt(document.getElementById("alter").value, 10);
    var stadt = document.getElementById("stadt").value;

    if(name.trim() === "" || stadt.trim() === "" || isNaN(alter) || alter <= 0){
        alert("Bitte alle Felder korrekt ausfüllen!");
        return;
    }

    datenCache.push({ name: name.trim(), alter: alter, stadt: stadt.trim() });
    renderTable();
}

var datenCache = [];

function renderTable(){
    var tabelle = document.getElementById("tabelle");
    while(tabelle.rows.length > 1) {
        tabelle.deleteRow(1);
    }

    datenCache.forEach(function(person) {
        var zeile = tabelle.insertRow();
        zeile.insertCell(0).textContent = person.name;
        zeile.insertCell(1).textContent = person.alter;
        zeile.insertCell(2).textContent = person.stadt;
    });
}

function Laden(){
    fetch('./data.json')
        .then((response) => response.json())
        .then((daten) => {
            datenCache = daten;
            renderTable();
        })
        .catch((err) => {
            console.error('Fehler beim Laden:', err);
            alert('Konnte data.json nicht laden. Stelle sicher, dass du die Seite über einen Webserver öffnest.');
        });
}

function Speichern(){
    var json = JSON.stringify(datenCache, null, 2);
    var blob = new Blob([json], {type: 'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('Datei wurde zum Download vorbereitet (data.json).');
}

function Sorteiren(){
    for(let i = 0; i < datenCache.length - 1; i++){
        for(let j = 0; j < datenCache.length - 1 - i; j++){
            let a = datenCache[j].name.toLowerCase();
            let b = datenCache[j+1].name.toLowerCase();
            if(a > b){
                // swap
                let tmp = datenCache[j];
                datenCache[j] = datenCache[j+1];
                datenCache[j+1] = tmp;
            }
        }
    }
    renderTable();
}