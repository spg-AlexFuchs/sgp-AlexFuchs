
//console.log(durchgange);

function pruefen(){
    let a = document.getElementById("input").value;
    let d=1
    //let a = 187;
    let sum=0;
    let durchgange = Math.pow(10,16);

    for(let i=1;i<durchgange;i=i*10){
        if(d%2==0){
            let number = Math.floor((a/i)%10);
            if(number*2>9){
                sum += (2*number)-9;
            }
            else{
                sum+= number*2;
            }
        }
        else{
            sum += Math.floor((a/i)%10);
        }
        //sum += Math.floor((a/i)%10);    //Math.floor zwingt zum Abrunden    modulo berechnet den rest (zb 187%10=7) 
        console.log(sum);  
        d++;  
    }

    if(sum%10==0){
        document.getElementById("label").innerHTML = "Nummer ist gültig!!!"
    }

    console.log(sum);
}


