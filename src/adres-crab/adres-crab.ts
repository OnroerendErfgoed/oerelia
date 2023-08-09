import { inject, bindable, BindingEngine } from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { FoundationValidationRenderer } from '../foundation-validation-renderer/foundation-validation-renderer';
import { AdresregisterService } from '../services/adresregister.api-service';
import { autocompleteType } from '../autocomplete/models/autocomplete-type';
import { IAdresCrabConfig } from './types/adres-crab-config';
import { sortBy, uniqBy } from 'lodash';
import { Message } from '../utilities/message/message';
import { IAdresregisterAdres, ICrabAdres, IGemeente, 
  ILand, IPostcode, IStraat } from '../models/public-models';

@inject(ValidationController, ValidationControllerFactory, AdresregisterService, BindingEngine)
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
  public gemeente: IGemeente;
  public postcode: IPostcode;
  public straat: IStraat;
  public adres: IAdresregisterAdres;

  private vlaamseProvinciesNiscodes = ['10000', '70000', '40000', '20001', '30000'];
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

    if (this.data.provincie && !this.vlaamseProvinciesNiscodes.includes(this.data.provincie.niscode)) {
      this.config.postcode.autocompleteType = autocompleteType.Suggest;
      this.config.straat.autocompleteType = autocompleteType.Suggest;
    }
  
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
    if (!this.vlaamseProvinciesNiscodes.includes(this.data.gemeente.provincie.niscode)) {
      this.config.postcode.autocompleteType = autocompleteType.Suggest;
      this.config.straat.autocompleteType = autocompleteType.Suggest;
    }
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
        message: error.message,
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
      return this.filterPostcodes(mappedPostcodes, value)
    } catch (error) {
      this.data.postcode = undefined;
      Message.error({
        title: 'Er liep iets mis bij het ophalen van postcodes',
        message: error.message,
      });
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
}
