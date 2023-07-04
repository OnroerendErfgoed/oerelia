export interface ICrabAdres {
    gemeente: IGemeente;
    land: ILand;
    postcode: IPostcode;
    straat: IStraat;
    adres: IAdresregisterAdres;
}
export interface ILand {
    code: string;
    naam: string;
}
export interface IGemeente {
    naam: string;
    niscode: string;
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
export declare class Gemeente {
    id: number;
    naam: string;
    niscode?: number;
    constructor(id: number, naam: string, niscode?: number);
}
export declare class Straat {
    id: number;
    naam: string;
    constructor(id: number, naam: string);
}
export declare class Huisnummer {
    id: number;
    naam: string;
    constructor(id: number, naam: string);
}
