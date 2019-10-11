"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gemeente = (function () {
    function Gemeente(id, naam, niscode) {
        this.id = id;
        this.naam = naam;
        this.niscode = niscode;
    }
    return Gemeente;
}());
exports.Gemeente = Gemeente;
var Straat = (function () {
    function Straat(id, naam) {
        this.id = id;
        this.naam = naam;
    }
    return Straat;
}());
exports.Straat = Straat;
var Huisnummer = (function () {
    function Huisnummer(id, naam) {
        this.id = id;
        this.naam = naam;
    }
    return Huisnummer;
}());
exports.Huisnummer = Huisnummer;
