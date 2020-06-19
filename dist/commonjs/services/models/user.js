"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(actor, attributes, groups, organisatieCode, personid, persoonsgegevens, ssoToken, userid) {
        this.actor = actor;
        this.attributes = attributes;
        this.groups = groups;
        this.organisatieCode = organisatieCode;
        this.personid = personid;
        this.persoonsgegevens = persoonsgegevens;
        this.ssoToken = ssoToken;
        this.userid = userid;
    }
    User.prototype.hasRole = function (role) {
        var found = this.groups.find(function (group) { return group === role; });
        return found ? true : false;
    };
    return User;
}());
exports.User = User;
var Actor = (function () {
    function Actor() {
    }
    return Actor;
}());
exports.Actor = Actor;
var Attributes = (function () {
    function Attributes() {
    }
    return Attributes;
}());
exports.Attributes = Attributes;
var Persoonsgegevens = (function () {
    function Persoonsgegevens() {
    }
    return Persoonsgegevens;
}());
exports.Persoonsgegevens = Persoonsgegevens;
var OrganisatieCode = (function () {
    function OrganisatieCode() {
    }
    return OrganisatieCode;
}());
exports.OrganisatieCode = OrganisatieCode;

//# sourceMappingURL=user.js.map
