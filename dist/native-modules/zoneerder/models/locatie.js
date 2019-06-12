var Provincie = (function () {
    function Provincie(niscode, naam) {
        this.niscode = niscode;
        this.naam = naam;
    }
    return Provincie;
}());
export { Provincie };
var Deelgemeente = (function () {
    function Deelgemeente(niscode, naam) {
        this.niscode = niscode;
        this.naam = naam;
    }
    return Deelgemeente;
}());
export { Deelgemeente };
var Gemeente = (function () {
    function Gemeente(id, niscode, naam) {
        this.id = id;
        this.niscode = niscode;
        this.naam = naam;
    }
    return Gemeente;
}());
export { Gemeente };
var Straat = (function () {
    function Straat(straat) {
        if (straat) {
            this.id = straat.id;
            this.naam = straat.naam || straat.label;
        }
        else {
            this.id = null;
            this.naam = '';
        }
    }
    return Straat;
}());
export { Straat };
var Huisnummer = (function () {
    function Huisnummer(nummer) {
        if (nummer) {
            this.id = nummer.id;
            this.naam = nummer.naam || nummer.label;
        }
        else {
            this.id = null;
            this.naam = '';
        }
    }
    return Huisnummer;
}());
export { Huisnummer };
