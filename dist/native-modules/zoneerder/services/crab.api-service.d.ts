import { HttpClient } from 'aurelia-http-client';
import { GeolocationResponse } from '../models/geolocationresponse';
import { Huisnummer, Straat } from '../models/locatie';
export declare class CrabService {
    private http;
    private crabpyUrl;
    private landen;
    private provincies;
    private gemeenten;
    constructor(http: HttpClient, crabpyUrl: string);
    getLanden(): Promise<void | any[]>;
    getProvincies(): Promise<void | any[]>;
    getGemeentenByProvincie(provincie: any): Promise<void | any[]>;
    getGemeenten(): Promise<void | any[]>;
    getDeelgemeenten(gemeente: any): Promise<any>;
    getPostcodes(gemeente: any): Promise<any>;
    getStraten(gemeente: any): Promise<Straat[]>;
    getHuisnrs(straat: any): Promise<Huisnummer[]>;
    suggestLocatie(value: any): Promise<any>;
    geolocate(value: string): Promise<GeolocationResponse>;
    private compare;
    private crabGet;
}
