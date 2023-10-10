console.log("geladen");

function ohneFehler(parameter) {
    if(Math.random()*10-2,5 >=0){
    console.log(parameter, "success");
    }
    else{mitfehler(parameter)}
}
function mitfehler(parameter) {
    console.log(parameter, "FAIL");
}
x = fetch("http://cats-fact.herokuapp.com/facts").then(ohneFehler);