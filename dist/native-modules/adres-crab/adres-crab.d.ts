import { BindingEngine } from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory } from 'aurelia-validation';
import { AdresregisterService } from '../services/adresregister.api-service';
import { IAdresCrabConfig } from './types/adres-crab-config';
import { IAdresregisterAdres, ICrabAdres, IGemeente, ILand, IPostcode, IStraat } from '../models/public-models';
export declare class AdresCrab {
    controller: ValidationController;
    private controllerFactory;
    private adresregisterService;
    private bindingEngine;
    disabled: boolean;
    data: ICrabAdres;
    config: IAdresCrabConfig;
    copiedAdres: ICrabAdres;
    copyAvailable: boolean;
    landen: ILand[];
    gemeente: IGemeente;
    postcode: IPostcode;
    straat: IStraat;
    adres: IAdresregisterAdres;
    private vlaamseProvinciesNiscodes;
    private suggest;
    private vrijAdres;
    constructor(controller: ValidationController, controllerFactory: ValidationControllerFactory, adresregisterService: AdresregisterService, bindingEngine: BindingEngine);
    bind(): void;
    parseField(value: any, property: any): void;
    landChanged(nv: ILand, ov: ILand): void;
    gemeenteChanged(): void;
    straatChanged(): void;
    copyAdres(): void;
    pasteAdres(): void;
    private loadLanden;
    private loadGemeenten;
    private loadPostcodes;
    private loadStraten;
    private loadHuisnrs;
    private loadBusnrs;
    private suggestFilter;
    private filterPostcodes;
    private filterHuisnummers;
    private filterBusnummers;
}
