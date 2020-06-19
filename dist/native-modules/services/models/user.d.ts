export declare class User {
    actor: Actor;
    attributes: Attributes;
    groups: string[];
    organisatieCode: OrganisatieCode;
    personid: string;
    persoonsgegevens: Persoonsgegevens;
    ssoToken: string;
    userid: string;
    constructor(actor: Actor, attributes: Attributes, groups: string[], organisatieCode: OrganisatieCode, personid: string, persoonsgegevens: Persoonsgegevens, ssoToken: string, userid: string);
    hasRole(role: string): boolean;
}
export declare class Actor {
    erkenningen: any;
    id: string;
    omschrijving: string;
    uri: string;
}
export declare class Attributes {
    cn: string;
    displayname: string;
    mail: string;
}
export declare class Persoonsgegevens {
    naam: string;
    omschrijving: string;
    voornaam: string;
    rijksregisternummer: string;
}
export declare class OrganisatieCode {
    type: string;
    description: string;
    value: string;
}
