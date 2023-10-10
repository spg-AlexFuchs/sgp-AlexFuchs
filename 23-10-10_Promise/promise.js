console.log("geladen");

function ohneFehler(parameter) {
    console.log(parameter, "success");
}
function mitfehler(parameter) {
    console.log(parameter,"FAIL");
}
x = fetch("httpp://cat-fact.herokuapp.com/facts").then(ohneFehler).catch(mitfehler);