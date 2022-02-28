import { HttpResponseMessage } from 'aurelia-http-client';
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
    adres: IAdres;
    adressen: IAdres[];
    afkorting: string;
    emails: IEmail[];
    erkenningen: IErkenning[];
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
