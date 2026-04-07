function Berechnen(){
    let Startfarbe = BigInt(document.getElementById("startfarbe").value);
    let Mischfarbe = BigInt(document.getElementById("mischfarbe").value);
    let geheimA = BigInt(document.getElementById("geheimA").value);
    let geheimB = BigInt(document.getElementById("geheimB").value);

    let Apub = (Mischfarbe**geheimA) % Startfarbe;
    let Bpub = (Mischfarbe ** geheimB) % Startfarbe;

    let commonA = (Bpub**geheimA) % Startfarbe;
    let commonB = (Apub**geheimB) % Startfarbe;

    document.getElementById("ausgabe1").innerHTML += commonA;
    document.getElementById("ausgabe2").innerHTML += commonB;
}