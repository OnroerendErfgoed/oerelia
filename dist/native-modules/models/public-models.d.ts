import { HttpResponseMessage } from "aurelia-http-client";
export interface IErkenning {
    erkend_als: string;
    erkend_voor: string;
    erkenningsnummer: string;
    geldigheid: string;
    id: number;
    omschrijving: string;
    reden_erkenning: IRedenErkenning;
    type: string;
    type_erkenning_id: number;
    uri: string;
}
export interface IErkenningNew {
    id: number;
    erkenningsnummer: string;
    startdatum: string;
    einddatum: string;
    opmerkingen: string;
    erkend_als: IErkendAls;
    reden_erkenning: IRedenErkenning;
    oorsprong_erkenning: IOorsprongErkenning;
}
export interface IOorsprongErkenning {
    id: string;
    uri: string;
}
export interface IErkendAls {
    id: number;
    erkend_als: string;
    type_erkenning: string;
}
export interface ISystemFields {
    created_at: string;
    updated_at: string;
    created_by: ISystemActor;
    updated_by: ISystemActor;
}
export interface ITelefoon {
    landcode: string;
    nummer: string;
    type: IType;
    volledig_nummer: string;
}
export interface IActor {
    adres: IActorAdres;
    adressen: IActorAdres[];
    afkorting: string;
    emails: IEmail[];
    erkenningen: IErkenning[] | IErkenningNew[];
    id: number;
    ids: IId[];
    info: unknown[];
    naam: string;
    omschrijving: string;
    opmerkingen: string;
    relaties: IRelatie[];
    self: string;
    status: IActorStatus;
    systemfields: ISystemFields;
    telefoons: ITelefoon[];
    type: IType;
    types: string[];
    uri: string;
    urls: string[];
    voornaam: string;
    zichtbaarheid: IType;
}
export declare class Actor {
    erkenningen: IErkenning[] | IErkenningNew[];
    id: string;
    omschrijving: string;
    uri: string;
}
export interface IRangeHeader {
    start: number;
    end: number;
}
export interface IResponse<IType> {
    content: IType[];
    lastRow: number;
}
export interface IUser {
    actor: IActor;
    attributes: IAttributes;
    organisatieCode: IOrganisatieCode;
    persoonsgegevens: IPersoonsgegevens;
    groups: string[];
    sso_token: string;
    personid: string;
    userid: string;
}
export interface IPersoonsgegevens {
    naam: string;
    omschrijving: string;
    voornaam: string;
    rijksregisternummer: string;
}
export interface IOrganisatieCode {
    type: string;
    description: string;
    value: string;
}
export interface IAttributes {
    cn: string;
    displayname: string;
    mail: string;
}
export interface IHeader {
    key: string;
    value: string;
}
export declare type ParamsType = Record<string, unknown>;
export interface IHttpOptions {
    params?: ParamsType;
    headers?: IHeader[];
    responseType?: string;
}
export interface IHttpResponse<IType> extends HttpResponseMessage {
    content: IType;
}
export interface IApiObject {
    etag?: string;
}
export interface IValidationResult {
    valid: boolean;
    message: string;
}
export interface TabViewModel {
    currentViewModel: {
        validate?: () => Promise<IValidationResult>;
    };
}
export interface ITab<T> {
    id: string;
    label: string;
    viewModel: string;
    closable: boolean;
    active: boolean;
    model?: T;
    edit?: boolean;
    newTab?: boolean;
    showInput?: boolean;
}
export declare class Tab<T> {
    id: string;
    label: string;
    viewModel: string;
    closable: boolean;
    active: boolean;
    model?: T;
    edit?: boolean;
    newTab?: boolean;
    constructor(tabApi: ITab<T>);
}
export interface IModel<T> {
    model: T;
    edit?: boolean;
    active?: boolean;
    tabid: string;
    application?: string;
}
export interface IStatus {
    id: number;
    status_id: number;
    naam: string;
    opmerkingen: string;
    datum: string;
    aanpasser_uri: string;
    aanpasser_omschrijving: string;
}
export interface IKoppelingResponse {
    total_ref_tekst: string;
    applications: IApplication[];
    zichtbaarheid_tekst: string;
}
export interface IAuteur {
    id: number;
    naam: string;
    voornaam?: string;
    uri?: string;
    actor_uri?: string;
    pseudoniem: string;
    achternaam_voornaam?: string;
    omschrijving?: string;
    naamsvermelding: INaamsVermelding;
    type: IAuteurType;
    afkorting: string;
    orcid: string;
    kbo?: string;
    ror?: string;
    wikidata?: string;
    status?: IAuteurStatus;
    statussen: IAuteurStatus[];
    emailadressen: IAuteurEmailAdres[];
    relaties: IAuteurRelatie[];
    systemfields: ISystemFields;
}
export interface IAuteurStatus {
    id: number;
    status_id: number;
    naam: ActiefStatus;
    opmerkingen: string;
    datum: string;
    aanpasser_uri: string;
    aanpasser_omschrijving: string;
}
export interface IAuteurEmailAdres {
    auteur_id: number;
    emailadres: string;
    verborgen: boolean;
    primair: boolean;
}
export interface IAuteurRelatie {
    id?: number;
    type?: IRelatieType;
    van_id?: number;
    naar_id: number;
    van_omschrijving?: string;
    naar_omschrijving?: string;
    naar_uri?: string;
    startdatum?: string;
    einddatum?: string;
}
export interface IRelatieType {
    id: number;
    naam: AuteurRelatieTypeEnum;
}
export interface IZoneerderServiceConfig {
    crabpyUrl: string;
    agivGrbUrl: string;
    beschermingenWMSUrl: string;
}
export interface ICrabAdres {
    gemeente: IGemeente;
    land: ILand;
    provincie?: IProvincie;
    postcode: IPostcode;
    straat: IStraat;
    adres: IAdresregisterAdres;
}
export interface ILand {
    code: string;
    naam?: string;
}
export interface IGemeente {
    id?: number;
    naam: string;
    niscode: string;
    provincie?: IProvincie;
}
export interface IDeelgemeente {
    niscode: string;
    naam: string;
}
export interface IPostcode {
    nummer: string;
    uri: string;
}
export interface IStraat {
    id: string;
    naam: string;
    uri: string;
    omschrijving: string;
}
export interface IAdresregisterAdres {
    id?: string;
    huisnummer?: string;
    busnummer?: string;
    uri?: string;
}
export interface IProvincie {
    niscode: string;
    naam: string;
    gewest: IGewest;
}
export interface IGewest {
    naam: string;
    niscode: string;
}
export interface IPostinfo {
    namen: string[];
    postcode: string;
    status: string;
    uri: string;
}
export interface IActorAdres {
    gemeente: IGemeente;
    land: ILand;
    provincie?: IProvincie;
    postcode: IPostcode;
    straat: IStraat;
    adres: IAdresregisterAdres;
}
export interface ILocatieSuggest {
    id: string;
    locatie: string;
}
export interface IGeolocationResponse {
    id: string;
    locatie: string;
    type: string;
    boundingbox: IBoundingbox;
}
export interface IBoundingbox {
    lowerleft: {
        lat: number;
        lon: number;
    };
    upperright: {
        lat: number;
        lon: number;
    };
}
