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
        if(gewichtPar < 10 || gewichtPar > 500){
            throw new Error("ungueltiges Gewicht");
        }
        this.#gewicht = gewichtPar;
    }
    set gross(grossPar){   //gewicht in kg
        if(grossPar < 0.5 || grossPar > 3){
            throw new Error("ungueltige Groeße");
        }
        //this.#gross =  this.#gross.toFixed(1);
        this.#gross = grossPar;
    }

}

Person1 = new Person('Hans',80,1.8);console.log(Person1.name,Person1.bmi);
Person2 = new Person('Peter',60,2.4);console.log(Person2.name,Person2.bmi);
Person3 = new Person('Meier',45,1.5);console.log(Person3.name,Person3.bmi);
Person4 = new Person('Drau',5,1.0);console.log(Person4.name,Person4.bmi);