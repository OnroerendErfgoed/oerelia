var Gemeente = (function () {
    function Gemeente(id, naam, niscode) {
        this.id = id;
        this.naam = naam;
        this.niscode = niscode;
    }
    return Gemeente;
}());
export { Gemeente };
var Straat = (function () {
    function Straat(id, naam) {
        this.id = id;
        this.naam = naam;
    }
    return Straat;
}());
export { Straat };
var Huisnummer = (function () {
    function Huisnummer(id, naam) {
        this.id = id;
        this.naam = naam;
    }
    return Huisnummer;
}());
export { Huisnummer };
