"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Huisnummer = exports.Straat = exports.Gemeente = exports.Deelgemeente = exports.Provincie = void 0;
var Provincie = (function () {
    function Provincie(niscode, naam) {
        this.niscode = niscode;
        this.naam = naam;
    }
    return Provincie;
}());
exports.Provincie = Provincie;
var Deelgemeente = (function () {
    function Deelgemeente(niscode, naam) {
        this.niscode = niscode;
        this.naam = naam;
    }
    return Deelgemeente;
}());
exports.Deelgemeente = Deelgemeente;
var Gemeente = (function () {
    function Gemeente(id, niscode, naam) {
        this.id = id;
        this.niscode = niscode;
        this.naam = naam;
    }
    return Gemeente;
}());
exports.Gemeente = Gemeente;
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
exports.Straat = Straat;
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
exports.Huisnummer = Huisnummer;

//# sourceMappingURL=locatie.js.map
