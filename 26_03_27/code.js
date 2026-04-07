function Verschlusseln(){

    let eingabe = document.getElementById("text").value;
    let zahl = parseInt(document.getElementById("zahl").value);
    document.getElementById("ausgabe").innerHTML = '';

    for(let i=0;i<eingabe.length;i++){
        let w = String.fromCharCode((eingabe.charCodeAt(i) - 97 + zahl) % 26 + 97);     //Verschiebt Kleinbuchstabe um zahl im Alphabet mit Rundlauf.
        document.getElementById("ausgabe").innerHTML += w;
        //console.log(w);
    }
}

function Entschlusseln(){

    let eingabe = document.getElementById("text").value;
    let zahl = parseInt(document.getElementById("zahl").value)*-1;
    document.getElementById("ausgabe").innerHTML = '';

    for(let i=0;i<eingabe.length;i++){
        let w = String.fromCharCode((eingabe.charCodeAt(i) - 97 + zahl) % 26 + 97);     //Verschiebt Kleinbuchstabe um zahl im Alphabet mit Rundlauf.
        document.getElementById("ausgabe").innerHTML += w;
        //console.log(w);
    }
}

function Reset(){
    console.log("leeren");
    document.getElementById("ganzes").innerHTML = 'Eingabetext: <input id="text"> Zahl: <input id="zahl" type="number"></input>';
    document.getElementById("ausgabe").innerHTML = 'Hier kommt der Text heraus!';
}