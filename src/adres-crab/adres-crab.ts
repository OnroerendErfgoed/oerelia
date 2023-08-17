import { inject, bindable, BindingEngine } from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { FoundationValidationRenderer } from '../foundation-validation-renderer/foundation-validation-renderer';
import { AdresregisterService } from '../services/adresregister.api-service';
import { autocompleteType } from '../autocomplete/models/autocomplete-type';
import { IAdresCrabConfig } from './types/adres-crab-config';
import { uniqBy } from 'lodash';
import { Message } from '../utilities/message/message';
import { IAdresregisterAdres, ICrabAdres, IGemeente, 
  ILand, IPostcode } from '../models/public-models';

@inject(ValidationController, ValidationControllerFactory, AdresregisterService)
export class AdresCrab {
  @bindable public disabled: boolean;
  @bindable public data: ICrabAdres;
  @bindable public config: IAdresCrabConfig = {
    postcode: { required: true, autocompleteType: autocompleteType.Auto },
    straat: { required: true, autocompleteType: autocompleteType.Auto },
    huisnummer: { required: true, autocompleteType: autocompleteType.Auto },
    busnummer: { required: false, autocompleteType: autocompleteType.Suggest }
  };
  @bindable copiedAdres: ICrabAdres;
  @bindable copyAvailable = false;

  public landen: ILand[] = [];

  private vlaamseProvinciesNiscodes = ['10000', '70000', '40000', '20001', '30000'];
  private suggest: any = {};
  private vrijAdres: boolean = false;

  constructor(
    public controller: ValidationController,
    private controllerFactory: ValidationControllerFactory,
    private adresregisterService: AdresregisterService
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
      .on(this.data.adres);

    ValidationRules
      .ensure('gemeente').required()
      .ensure('postcode').required()
      .ensure('straat').required()
      .on(this);

    if (this.data.provincie && !this.isVlaamseProvincie(this.data.provincie)) {
      this.config.postcode.autocompleteType = autocompleteType.Suggest;
      this.config.straat.autocompleteType = autocompleteType.Suggest;
    }
  
    this.data.land = this.data.land || { code: 'BE', naam: 'België' };
  }

  public landChanged() {
    this.data.gemeente = undefined;
    this.data.straat = undefined;
    this.data.postcode = undefined;
    this.resetAdres();
  }

  public gemeenteChanged() {
    if (!this.isVlaamseProvincie(this.data.gemeente.provincie)) {
      this.config.postcode.autocompleteType = autocompleteType.Suggest;
      this.config.straat.autocompleteType = autocompleteType.Suggest;
    } else {
      this.config.postcode.autocompleteType = autocompleteType.Auto;
      this.config.straat.autocompleteType = autocompleteType.Auto;
    }
    this.data.straat = undefined;
    this.data.postcode = undefined;
    this.straatChanged();
  }

  public straatChanged() {
    this.resetAdres();
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
          { code: 'divider', naam: '─────────────────────────' }
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
    }
  }

  private async loadGemeenten(value: string) {
    try {
      const gemeenten = await this.adresregisterService.getGemeenten();
      const adresGemeenten = gemeenten.map((gemeente: IGemeente) => ({
        naam: gemeente.naam,
        niscode: gemeente.niscode,
        provincie: gemeente.provincie
      }));
  
      return this.suggestFilter(adresGemeenten, value);
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van gemeenten',
        message: error.message
      });
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
      return this.filterPostcodes(mappedPostcodes, value);
    } catch (error) {
      this.data.postcode = undefined;
      Message.error({
        title: 'Er liep iets mis bij het ophalen van postcodes',
        message: error.message
      });
    }
  }

  private async loadStraten(value: string) {
    const gemeenteNiscode = this.data.gemeente ? this.data.gemeente.niscode : undefined;
    const postcodeUri = this.data.postcode ? this.data.postcode.uri : undefined;
    if (!gemeenteNiscode || !postcodeUri) {
      this.vrijAdres = true;
      return;
    }
    if (postcodeUri) {
      this.vrijAdres = false;
    }
    try {
      const straten = await this.adresregisterService.getStraten(gemeenteNiscode);
      return this.suggestFilter(straten, value);
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van straten',
        message: error.message
      });
    }
  }

  private async loadHuisnrs(value: string) {
    const straatId = this.data.straat ? this.data.straat.id : undefined;
    if (
      this.vrijAdres ||
      (this.data.gemeente.provincie && !this.isVlaamseProvincie(this.data.gemeente.provincie))) {
      return;
    }
    if (!straatId) {
      this.vrijAdres = true;
      return;
    }
    this.vrijAdres = false;

    try {
      const huisnrs = await this.adresregisterService.getAdressen(straatId);
      return this.filterHuisnummers(huisnrs, value);
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van huisnummers',
        message: error.message
      });
    }
  }

  private async loadBusnrs(value: string) {
    const straatId = this.data.straat ? this.data.straat.id : undefined;
    const huisnummer = this.data.adres ? this.data.adres.huisnummer : undefined;

    if (!this.data.adres.id || !huisnummer || this.vrijAdres) { return; }

    try {
      const huisnrs = await this.adresregisterService.getAdressen(straatId, huisnummer);
      return this.filterBusnummers(huisnrs, value);
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van busnummers',
        message: error.message
      });
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

  private filterHuisnummers(adressen: IAdresregisterAdres[], searchHuisnummer: string):
    IAdresregisterAdres[] | [] {
    const adresList = uniqBy(adressen
      .filter((adres: IAdresregisterAdres) => adres.huisnummer
        .includes(searchHuisnummer)),'huisnummer') as IAdresregisterAdres[];
    return adresList.sort((a, b) => a.huisnummer.localeCompare(b.huisnummer, 'en', { numeric: true }));
  }

  private filterBusnummers(adressen: IAdresregisterAdres[], searchBusnummer: string):
    IAdresregisterAdres[] | [] {
    return adressen.filter((adres: IAdresregisterAdres) => adres.busnummer
      .includes(searchBusnummer))
      .sort((a, b) => a.huisnummer.localeCompare(b.huisnummer, 'en', { numeric: true }));
  }

  private resetAdres() {
    this.data.adres = { id: undefined, uri: undefined, huisnummer: undefined, busnummer: undefined };
  }

  private landCodeMatcher(a: { code: number }, b: { code: number }): boolean {
    return (!!a && !!b) && (a.code === b.code);
  }

  private isVlaamseProvincie(provincie) {
    return this.vlaamseProvinciesNiscodes.includes(provincie.niscode);
  }
}
