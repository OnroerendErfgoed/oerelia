import { HttpClient } from 'aurelia-http-client';
import { Huisnummer, Straat } from './models/locatie';
import { GeolocationResponse } from './models/geolocationresponse';
import { CapaKeyInfoResponse } from './models/capaKeyInfoResponse';
export declare class CrabService {
    private http;
    private landen;
    private provincies;
    private gemeenten;
    constructor(http: HttpClient);
    getLanden(): Promise<void | any[]>;
    getProvincies(): Promise<void | any[]>;
    getGemeentenByProvincie(provincie: number): Promise<void | any[]>;
    getGemeenten(): Promise<void | any[]>;
    getDeelgemeenten(gemeente: number): Promise<any>;
    getPostcodes(gemeente: number): Promise<any>;
    getStraten(gemeente: number): Promise<Straat[]>;
    getHuisnrs(straat: number): Promise<Huisnummer[]>;
    suggestLocatie(value: string): Promise<any>;
    geolocate(value: number): Promise<GeolocationResponse>;
    getInfoByCapakey(capakey: string): Promise<any[] | CapaKeyInfoResponse>;
    private compare;
    private crabGet;
}
