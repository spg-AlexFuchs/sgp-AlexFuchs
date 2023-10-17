function Test() {
    let result = Math.random()*20-10;
    console.log(result);

    const outputDiv = document.getElementById("output");

    output.innerHTML += `<li>${result}</li>`;
    if(result <= 0){ 
        outputDiv.style.backgroundColor = "red";
        console.log("red");
    }
    else{
        outputDiv.style.backgroundColor = "transparent";
    }
}