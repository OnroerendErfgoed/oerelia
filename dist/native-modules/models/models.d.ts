interface IType {
    id: number;
    naam: string;
    uri?: string;
}
interface IAdres {
    adrestype: IType;
    beschrijving: string;
    einddatum: string;
    gemeente: string;
    gemeente_id: number;
    huisnummer: string;
    huisnummer_id: number;
    id: number;
    land: string;
    land_omschrijving: string;
    omschrijving: string;
    postcode: string;
    startdatum: string;
    straat: string;
    straat_id: number;
    subadres: string;
    subadres_id: number;
}
interface IEmail {
    email: string;
    type: IType;
}
interface IRedenErkenning {
    id: number;
    reden_erkenning: string;
}
interface IId {
    extra_id: string;
    type: IType;
}
interface IRelatie {
    einddatum: string;
    id: number;
    omschrijving: string;
    startdatum: string;
    type: IType;
}
interface IActorStatusGebruiker {
    uri: string;
    omschrijving: string;
}
interface IActorStatusStatus {
    id: number;
    status: string;
}
interface IActorStatus {
    datum: string;
    gebruiker: IActorStatusGebruiker;
    opmerkingen: string;
    status: IActorStatusStatus;
}
interface ISystemActor {
    uri: string;
    description?: string;
}
interface IAttributes {
    cn: string;
    displayname: string;
    mail: string;
}
interface IPersoonsgegevens {
    naam: string;
    omschrijving: string;
    voornaam: string;
    rijksregisternummer: string;
}
interface IOrganisatieCode {
    type: string;
    description: string;
    value: string;
}
