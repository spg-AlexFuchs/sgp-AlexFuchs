// So liegt der Normalwert bei Männern laut Deutscher Gesellschaft für Ernährung
// im Intervall von 20 bis 25 kg / m², während er sich
// bei Frauen im Intervall von 19 bis 24 kg / m² befindet.

class Person {
    /* Gewicht in kg, Größe in m */
    #name;
    #gewicht;
    #groesse;
    #geschlecht;
    constructor(gewichtPar, groessePar,geschlechtPar) {
        this.#name;
        this.gewicht = gewichtPar;
        this.groesse = groessePar;
        this.#geschlecht = geschlechtPar;
    }

    set name(namePar) {
        if (typeof namePar !== 'string') {
            throw new Error('ungültiger Name');
        }
        if (namePar.length < 3) {
            throw new Error('Name zu kurz');
        }
        this.#name = namePar;
    }

    set gewicht(gewichtPar) {
        // gewicht in kg
        if (gewichtPar < 10 || gewichtPar > 500) {
            throw new Error('ungültiges Gewicht');
        }
        this.#gewicht = gewichtPar;
    }
    get gewicht() {
        return this.#gewicht;
    }
    set groesse(groessePar) {
        if (groessePar < 0.5 || groessePar > 3.0) {
            throw new Error('ungültige Groesse');
        }
        this.#groesse = groessePar;
    }

    get bmi() {
        const nmbr = this.#gewicht / (this.#groesse * this.#groesse);
        return Math.round(nmbr * 10) / 10;
    }

    set geschlecht(geschlechtPar){
        this.#geschlecht = geschlechtPar;
    }

    get beschreibung(){
        if(this.bmi <=25 && this.bmi >= 20 && this.#geschlecht == 'm'){
            return ", welcher sich im Normalbereich für Männer befindet.";
        }
        if(this.bmi >25 && this.#geschlecht == 'm'){
            return ", welcher sich oberhalb des Normalbereiches für Männer befindet.";
        }
        if(this.bmi < 20 && this.#geschlecht == 'm'){
            return ", welcher sich unterhalb des Normalbereiches für Männer befindet.";
        }
        if(this.bmi <=24 && this.bmi >= 19 && this.#geschlecht == 'w'){
            return ", welcher sich im Normalbereich für Frauen befindet."
        }
        if(this.bmi < 19 && this.#geschlecht == 'w'){
            return ", welcher sich unterhalb des Normalbereiches für Frauen befindet."
        }
        if(this.bmi > 24 && this.#geschlecht == 'w'){
            return ", welcher sich oberhalb des Normalbereiches für Frauen befindet."
        }
    }
    
    output() {
        return (
            'Bei ' +
            this.#gewicht +
            'kg und ' +
            this.#groesse +
            'm größe haben sie einen BMI von ' +
            this.bmi +
            this.beschreibung
        );
    }
}

function BMIBerechnen(){
    PersonenRechner = new Person(document.getElementById("Gewicht").value,document.getElementById("Groesse").value,document.getElementById("Geschlecht").value);
    console.log(PersonenRechner.output());
    document.getElementById("ausgabe").innerHTML = PersonenRechner.output();
}