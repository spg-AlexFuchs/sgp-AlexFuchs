"use strict";
const z= 17;

const ul= document.getElementById("meineUL");

function addElement(){
    const li= document.createElement("li");
    li.innerHTML = "neues Element";
    ul.appendChild(li);
}

function addText(){
    const text= document.createElement("li");
    const inhalt = document.getElementById("textfeld").value;
    text.innerHTML = inhalt;
    ul.appendChild(text);
}