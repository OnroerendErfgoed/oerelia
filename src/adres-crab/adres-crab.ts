import { inject, bindable, BindingEngine } from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { FoundationValidationRenderer } from '../foundation-validation-renderer/foundation-validation-renderer';
import { AdresregisterService } from '../services/adresregister.api-service';
import { autocompleteType } from '../autocomplete/models/autocomplete-type';
import { IAdresCrabConfig } from './types/adres-crab-config';
import { IAdresregisterAdres, ICrabAdres, IGemeente, ILand, IPostcode, IStraat } from 'services/models/locatie';
import { sortBy, uniqBy } from 'lodash';
import { Message } from '../utilities/message/message';

@inject(ValidationController, ValidationControllerFactory, AdresregisterService, BindingEngine)
export class AdresCrab {
  @bindable public disabled: boolean;
  @bindable public data: ICrabAdres;
  @bindable public config: IAdresCrabConfig = {
    huisnummer: { required: true, autocompleteType: autocompleteType.Auto }
  };
  @bindable copiedAdres: ICrabAdres;
  @bindable copyAvailable = false;
  @bindable freeSearchAllowed = true;

  public landen: ILand[] = [];
  public gemeente: IGemeente;
  public postcode: IPostcode;
  public straat: IStraat;
  public adres: IAdresregisterAdres;

  public freeHuisnummerSearch = false;
  public freeBusnummerSearch = false;
  public showBusnummerLinks = true;

  private suggest: any = {};

  constructor(
    public controller: ValidationController,
    private controllerFactory: ValidationControllerFactory,
    private adresregisterService: AdresregisterService,
    private bindingEngine: BindingEngine
  ) {
    this.controller = this.controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new FoundationValidationRenderer());

    this.loadLanden();
    this.suggest.gemeenten = { suggest: (value: string) => this.loadGemeenten(value) };
    this.suggest.postcodes = { suggest: (value) => this.loadPostcodes(value) };
    this.suggest.straten = { suggest: (value) => this.loadStraten(value) };
    this.suggest.huisnummers = { suggest: (value) => this.loadHuisnrs(value) };
    this.suggest.busnummers = { suggest: (value) => this.loadBusnrs(value) };
  }

  public bind() {
    if (this.data.adres && !this.data.adres.id) {
      this.onHuisnummerNietGevondenClicked();
    }
    this.data.adres = this.data.adres || { id: undefined, uri: undefined, huisnummer: undefined, busnummer: undefined };

    ValidationRules
      .ensure('land').required()
      .ensure('gemeente').required()
      .ensure('postcode').required()
      .ensure('straat').required()
      .on(this.data);

    ValidationRules
      .ensure('huisnummer').required()
        .when(() => this.config.huisnummer.required)
      .on(this.data.adres)

    ValidationRules
      .ensure('gemeente').required()
      .ensure('postcode').required()
      .ensure('straat').required()
      .on(this);

    this.bindingEngine
      .propertyObserver(this.data, 'land')
      .subscribe((nv, ov) => {
        this.landChanged(nv, ov);
      });
  
    this.data.land = this.data.land || { code: 'BE', naam: 'België' };
    if (this.data.land.code !== 'BE') {
      this.gemeente = this.data.gemeente ? { naam: this.data.gemeente.naam, niscode: this.data.gemeente.niscode } : undefined
      this.postcode = this.data.postcode ? { nummer: this.data.postcode.nummer, uri: this.data.postcode.uri } : undefined;
      this.straat = this.data.straat ? { id: this.data.straat.id, naam: this.data.straat.naam, omschrijving: this.data.straat.omschrijving, uri: this.data.straat.uri } 
                                     : undefined;
      this.adres = this.data.adres ? { id: this.data.adres.id, uri: this.data.adres.uri, busnummer: this.data.adres.busnummer, huisnummer: this.data.adres.huisnummer }
                                   : undefined;
    }
  }

  public parseField(value, property) {
    this.data[property] = { naam: value };
  }

  public landChanged(nv: ILand, ov: ILand) {
    if (nv.code !== 'BE') {
      this.gemeente = undefined;
      this.straat = undefined;
      this.postcode = undefined;
      this.adres = undefined;

      this.data.gemeente = undefined;
      this.data.straat = undefined;
      this.data.postcode = undefined;
      this.data.adres = undefined;
    }
  }

  public gemeenteChanged() {
    if (!this.data.gemeente) {
      this.data.straat = undefined;
      this.data.postcode = undefined;
      this.data.adres = undefined;
      this.straatChanged();
    }
  }

  public straatChanged() {
    if (!this.data.straat) {
      this.data.adres = undefined;
    }
  }

  public copyAdres(): void {
    this.copiedAdres = this.data;
  }

  public pasteAdres(): void {
    this.data.land = this.copiedAdres.land;
    this.data.gemeente = this.copiedAdres.gemeente;
    this.data.postcode = this.copiedAdres.postcode;
    this.data.straat = this.copiedAdres.straat;
    this.data.adres = this.copiedAdres.adres;
  }

  public onHuisnummerNietGevondenClicked(): void {
    this.freeHuisnummerSearch = true;
    this.freeBusnummerSearch = true;
    this.showBusnummerLinks = false;
  }

  public onHuisnummerSuggestiesClicked(): void {
    this.freeHuisnummerSearch = false;
    this.freeBusnummerSearch = false;
    this.showBusnummerLinks = true;
  }

  public onBusnummerNietGevondenClicked(): void {
    this.freeBusnummerSearch = true;
  }

  public onBusnummerSuggestiesClicked(): void {
    this.freeBusnummerSearch = false;
  }

  private async loadLanden() {
    try {
      const landen = await this.adresregisterService.getLanden();
      if (landen) {
        const staticLanden: ILand[] = [
          { code: 'BE', naam: 'België' },
          { code: 'DE', naam: 'Duitsland' },
          { code: 'FR', naam: 'Frankrijk' },
          { code: 'GB', naam: 'Groot-Brittanië' },
          { code: 'NL', naam: 'Nederland' },
          { code: 'LU', naam: 'Luxemburg' },
          { code: 'divider', naam: '─────────────────────────' },
        ];
        this.landen = staticLanden;
        landen.forEach(land => {
          const exists = this.landen.find((obj) => obj.code === land.code);
          if (!exists) {
            this.landen.push(land);
          }
        });
      }
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van laden',
        message: error.message
      });
      throw error;
    }
  }

  private async loadGemeenten(value: string) {
    try {
      const gemeenten = await this.adresregisterService.getGemeenten();
      const adresGemeenten = gemeenten.map((gemeente: IGemeente) => ({
        naam: gemeente.naam,
        niscode: gemeente.niscode,
      }));
  
      return this.suggestFilter(adresGemeenten, value);
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van gemeenten',
        message: error.message,
      });
      throw error;
    }
  }

  private async loadPostcodes(value: string) {
    const gemeente = this.data.gemeente ? this.data.gemeente.naam : undefined;
    if (!gemeente) {
      this.data.postcode = undefined;
      return;
    }

    try {
      const postcodes = await this.adresregisterService.getPostinfo(gemeente);
      const mappedPostcodes = postcodes.map((postcode) => ({ nummer: postcode.postcode, uri: postcode.uri } as IPostcode));
      return this.filterPostcodes(mappedPostcodes, value)
    } catch (error) {
      this.data.postcode = undefined;
      Message.error({
        title: 'Er liep iets mis bij het ophalen van postcodes',
        message: error.message,
      });
      throw error;
    }
  }

  private async loadStraten(value: string) {
    const niscode = this.data.gemeente ? this.data.gemeente.niscode : undefined;
    if (!niscode) { return; }
    try {
      const straten = await this.adresregisterService.getStraten(niscode);
      return this.suggestFilter(straten, value);
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van straten',
        message: error.message,
      });
      throw error;
    }
  }

  private async loadHuisnrs(value: string) {
    const straat = this.data.straat ? this.data.straat.id : undefined;
    if (!straat) { return; }

    try {
      const huisnrs = await this.adresregisterService.getAdressen(straat);
      return this.filterHuisnummers(huisnrs, value);
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van huisnummers',
        message: error.message,
      });
      throw error;
    }
  }

  private async loadBusnrs(value: string) {
    const straat = this.data.straat ? this.data.straat.id : undefined;
    const huisnummer = this.data.adres ? this.data.adres.huisnummer : undefined;

    if (!straat || !huisnummer) { return; }

    try {
      const huisnrs = await this.adresregisterService.getAdressen(straat, huisnummer);
      return this.filterBusnummers(huisnrs, value);
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van busnummers',
        message: error.message,
      });
      throw error;
    }
  }

  private suggestFilter(data: any, value: string) {
    return data.filter((obj) => {
      return obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

  private filterPostcodes(postcodes: IPostcode[], searchPostcode: string): IPostcode[] | [] {
    return postcodes.filter((postcode: IPostcode) => postcode.nummer.includes(searchPostcode));
  }

  private filterHuisnummers(adressen: IAdresregisterAdres[], searchHuisnummer: string): IAdresregisterAdres[] | [] {
    return uniqBy(sortBy(adressen.filter((adres: IAdresregisterAdres) => adres.huisnummer.includes(searchHuisnummer))), 'huisnummer') as IAdresregisterAdres[];
  }

  private filterBusnummers(adressen: IAdresregisterAdres[], searchBusnummer: string): IAdresregisterAdres[] | [] {
    return adressen.filter((adres: IAdresregisterAdres) => adres.busnummer.includes(searchBusnummer));
  }
}
