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
export { User };
var Actor = (function () {
    function Actor() {
    }
    return Actor;
}());
export { Actor };
var Attributes = (function () {
    function Attributes() {
    }
    return Attributes;
}());
export { Attributes };
var Persoonsgegevens = (function () {
    function Persoonsgegevens() {
    }
    return Persoonsgegevens;
}());
export { Persoonsgegevens };
var OrganisatieCode = (function () {
    function OrganisatieCode() {
    }
    return OrganisatieCode;
}());
export { OrganisatieCode };

//# sourceMappingURL=user.js.map
