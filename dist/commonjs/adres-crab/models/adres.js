"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Huisnummer = exports.Straat = exports.Postcode = exports.Gemeente = exports.Adres = void 0;
var Adres = (function () {
    function Adres() {
    }
    return Adres;
}());
exports.Adres = Adres;
var Gemeente = (function () {
    function Gemeente() {
    }
    return Gemeente;
}());
exports.Gemeente = Gemeente;
var Postcode = (function () {
    function Postcode(id, naam) {
        this.id = id;
        this.naam = naam;
    }
    return Postcode;
}());
exports.Postcode = Postcode;
var Straat = (function () {
    function Straat() {
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

//# sourceMappingURL=adres.js.map
