console.log("geladen");

function ohneFehler(parameter) {
    console.log(parameter, "Funktioniert");
}
function mitfehler(parameter) {
    console.log(parameter,"Fehler");
}
x = fetch("httpp://cat-fact.herokuapp.com/facts").then(ohneFehler).catch(mitfehler);