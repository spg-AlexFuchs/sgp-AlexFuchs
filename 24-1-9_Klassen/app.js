class Person {
    /*Gewicht in kg, größe in m,und Name und Nmae und nme */

    name;
    #gewicht;        //damit private -> # davor hinzufügen
    #gross;

    constructor(name, gewicht, gross){
        this.name = name;
        this.gewicht = gewicht;
        this.gross = gross;

    }
    get gross(){
        return this.#gross;
    }
    get bmi(){
        return (this.#gewicht / (this.#gross*this.#gross)).toFixed(1);
    }
    get gewicht(){
        return this.#gewicht;
    }

    set gewicht(gewichtPar){   //gewicht in Kg
        if(gewichtPar < 1 || gewichtPar > 500){
            throw new Error("ungültiges Gewicht");
        }
        this.#gewicht = gewichtPar;
    }

    set gross(grossPar){   //gewicht in kg
        if(grossPar < 0.5 || grossPar > 3){
            throw new Error("ungültige Größe");
        }
        //this.#gross =  this.#gross.toFixed(1);
        this.#gross = grossPar;
    }

}

Person1 = new Person('Hans',80,1.8);
Person2 = new Person('Hans',60,3.4);
Person3 = new Person('Hans',45,1.5);
Person4 = new Person('Hans',5,1.0);
console.log(Person1.bmi);
console.log(Person2.bmi);
console.log(Person3.bmi);
console.log(Person4.bmi);