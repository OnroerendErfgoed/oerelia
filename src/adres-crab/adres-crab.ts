import { inject, bindable, BindingEngine } from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { FoundationValidationRenderer } from '../foundation-validation-renderer/foundation-validation-renderer';
import { AdresregisterService } from '../services/adresregister.api-service';
import { autocompleteType } from '../autocomplete/models/autocomplete-type';
import { IAdresCrabConfig } from './types/adres-crab-config';
import { IAdresregisterAdres, ICrabAdres, IGemeente, ILand, IPostcode, IPostinfo, IStraat } from 'services/models/locatie';

@inject(ValidationController, ValidationControllerFactory, AdresregisterService, BindingEngine)
export class AdresCrab {
  @bindable public disabled: boolean;
  @bindable public data: ICrabAdres;
  @bindable public config: IAdresCrabConfig = {
    huisnummer: { required: true, autocompleteType: autocompleteType.Auto }
  };
  @bindable copiedAdres: ICrabAdres;
  @bindable copyAvailable = false;

  public landen: ILand[] = [];
  public gemeente: IGemeente;
  public postcode: IPostcode;
  public straat: IStraat;
  public adres: IAdresregisterAdres;
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
    // this.suggest.huisnummers = { suggest: (value) => this.loadHuisnrs(value) };
  }

  public bind() {
    ValidationRules
      .ensure('land').required()
      .ensure('gemeente').required()
      .ensure('postcode').required()
      .ensure('straat').required()
      .ensure('huisnummer')
        .required()
          .when(() => this.config.huisnummer.required)
      .on(this.data);

    ValidationRules
      .ensure('gemeente').required()
      .ensure('postcode').required()
      .ensure('straat').required()
      .ensure('huisnummer')
        .required()
          .when(() => this.config.huisnummer.required)
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
    if (nv.code === 'BE' || ov.code === 'BE') {
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

  public huisnummerParser(value) {
    // if (value) {
    //   return new Huisnummer(null, value);
    // } else {
    //   return undefined;
    // }

    return value;
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

  private loadLanden() {
    this.adresregisterService.getLanden().then(landen => {
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
    }).catch(error => {
      console.debug(error);
    });
  }

  private loadGemeenten(value: string) {
    return new Promise(resolve => {
      this.adresregisterService.getGemeenten().then(gemeenten => {
        resolve(this.suggestFilter(gemeenten, value));
      });
    });
  }

  private loadPostcodes(value: string) {
    const gemeente = this.data.gemeente ? this.data.gemeente.naam : undefined;
    return new Promise((resolve) => {
      if (gemeente) {
        this.adresregisterService.getPostinfo(gemeente).then((postcodes) => {
          resolve(this.filterPostcodes(postcodes, value));
        });
      } else {
        this.data.postcode = undefined;
      }
    });
  }

  private loadStraten(value: string) {
    const niscode = this.data.gemeente ? this.data.gemeente.niscode : undefined;
    return new Promise((resolve) => {
      if (niscode) {
        this.adresregisterService.getStraten(niscode).then(straten => {
          resolve(this.suggestFilter(straten, value));
        });
      }
    });
  }

  // private loadHuisnrs(value: string) {
  //   const straat = this.data.straat ? this.data.straat.id : undefined;
  //   return new Promise((resolve) => {
  //     if (straat) {
  //       this.crabService.getHuisnrs(straat).then(huisnrs => {
  //         resolve(this.suggestFilter(huisnrs, value));
  //       });
  //     }
  //   });
  // }

  private suggestFilter(data: any, value: string) {
    return data.filter((obj) => {
      return obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

  private filterPostcodes(postcodes: IPostinfo[], searchPostcode: string): IPostinfo[] | [] {
    return postcodes.filter((postcode: IPostinfo) => postcode.postcode.includes(searchPostcode));
  }
}
