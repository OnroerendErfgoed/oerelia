import { HttpClient } from 'aurelia-http-client';
import { Niscode } from './models/niscode.enum';
import { IAdresregisterAdres, IGemeente, IGeolocationResponse, ILand, ILocatieSuggest, IPostinfo, IProvincie, IStraat } from '../models/public-models';
export declare class AdresregisterService {
    private http;
    private landen;
    private provincies;
    private gemeenten;
    private gemeentenVlaamsGewest;
    private gemeentenWaalsGewest;
    private gemeentenBHGewest;
    constructor(http: HttpClient);
    getLanden(): Promise<ILand[]>;
    getProvincies(): Promise<IProvincie[]>;
    getProvinciesPerGewest(niscode: Niscode): Promise<IProvincie[]>;
    readonly vlaamseGemeenten: IGemeente[];
    readonly waalseGemeenten: IGemeente[];
    readonly brusselseGemeenten: IGemeente[];
    getGemeenten(): Promise<IGemeente[]>;
    getGemeentenPerGewest(niscode: Niscode): Promise<IGemeente[]>;
    getPostinfo(gemeente: string): Promise<IPostinfo[]>;
    getStraten(gemeente: string): Promise<IStraat[]>;
    getAdressen(straat: string, huisnummer?: string): Promise<IAdresregisterAdres[]>;
    suggestLocatie(value: string): Promise<ILocatieSuggest[]>;
    geolocate(value: number): Promise<IGeolocationResponse>;
    private crabGet;
}
