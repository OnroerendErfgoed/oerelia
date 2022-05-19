import { inject, bindable, BindingEngine } from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { FoundationValidationRenderer } from '../foundation-validation-renderer/foundation-validation-renderer';
import { Adres, Postcode, Huisnummer } from './models/adres';
import { CrabService } from '../services/crab.api-service';
import { autocompleteType } from '../autocomplete/models/autocomplete-type';
import { IAdresCrabConfig } from './types/adres-crab-config';

@inject(ValidationController, ValidationControllerFactory, CrabService, BindingEngine)
export class AdresCrab {
  @bindable public disabled: boolean;
  @bindable public data: Adres;
  @bindable public config: IAdresCrabConfig = {
    huisnummer: { required: true, autocompleteType: autocompleteType.Auto }
  };
  public landen: any[] = [];
  public gemeente: string;
  public postcode: string;
  public straat: string;
  public huisnummer: string;
  private suggest: any = {};

  constructor(
    public controller: ValidationController,
    private controllerFactory: ValidationControllerFactory,
    private crabService: CrabService,
    private bindingEngine: BindingEngine
  ) {
    this.controller = this.controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new FoundationValidationRenderer());

    this.loadLanden();
    this.suggest.gemeenten = { suggest: (value) => this.loadGemeenten(value) };
    this.suggest.postcodes = { suggest: (value) => this.loadPostcodes(value) };
    this.suggest.straten = { suggest: (value) => this.loadStraten(value) };
    this.suggest.huisnummers = { suggest: (value) => this.loadHuisnrs(value) };
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
  
    this.data.land = this.data.land || 'BE';
    if (this.data.land !== 'BE') {
      this.gemeente = this.data.gemeente ? this.data.gemeente.naam : undefined;
      this.postcode = this.data.postcode ? this.data.postcode.naam : undefined;
      this.straat = this.data.straat ? this.data.straat.naam : undefined;
      this.huisnummer = this.data.huisnummer ? this.data.huisnummer.naam : undefined;
    }
  }

  public parseField(value, property) {
    this.data[property] = { naam: value };
  }

  public landChanged(nv, ov) {
    if (nv === 'BE' || ov === 'BE') {
      this.gemeente = undefined;
      this.straat = undefined;
      this.postcode = undefined;
      this.huisnummer = undefined;

      this.data.gemeente = undefined;
      this.data.straat = undefined;
      this.data.postcode = undefined;
      this.data.huisnummer = undefined;
      this.data.subadres = undefined;
    }
  }

  public gemeenteChanged() {
    if (!this.data.gemeente) {
      this.data.straat = undefined;
      this.data.postcode = undefined;
      this.straatChanged();
    }
  }

  public straatChanged() {
    if (!this.data.straat) {
      this.data.huisnummer = undefined;
    }
  }

  public huisnummerParser(value) {
    if (value) {
      return new Huisnummer(null, value);
    } else {
      return undefined;
    }
  }

  private loadLanden() {
    this.crabService.getLanden().then(landen => {
      if (landen) {
        const firstOptions = [
          { id: 'BE', naam: 'België' },
          { id: 'DE', naam: 'Duitsland' },
          { id: 'FR', naam: 'Frankrijk' },
          { id: 'GB', naam: 'Groot-Brittanië' },
          { id: 'NL', naam: 'Nederland' },
          { id: 'LU', naam: 'Luxemburg' },
          { naam: '─────────────────────────', disabled: true }
        ];
        this.landen = firstOptions;
        landen.forEach(land => {
          const exists = this.landen.find((obj) => obj.id === land.id);
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
      this.crabService.getGemeenten().then(gemeenten => {
        resolve(this.suggestFilter(gemeenten, value));
      });
    });
  }

  private loadPostcodes(value: string) {
    const gemeente = this.data.gemeente ? this.data.gemeente.id : undefined;
    return new Promise((resolve) => {
      if (gemeente) {
        this.crabService.getPostcodes(gemeente).then((postcodes) => {
          postcodes.forEach(postcode => { postcode.naam = String(postcode.id); });
          resolve(this.suggestFilter(postcodes, value));
        });
      } else {
        this.data.postcode = new Postcode(Number(value), value);
      }
    });
  }

  private loadStraten(value: string) {
    const gemeente = this.data.gemeente ? this.data.gemeente.id : undefined;
    return new Promise((resolve) => {
      if (gemeente) {
        this.crabService.getStraten(gemeente).then(straten => {
          resolve(this.suggestFilter(straten, value));
        });
      }
    });
  }

  private loadHuisnrs(value: string) {
    const straat = this.data.straat ? this.data.straat.id : undefined;
    return new Promise((resolve) => {
      if (straat) {
        this.crabService.getHuisnrs(straat).then(huisnrs => {
          resolve(this.suggestFilter(huisnrs, value));
        });
      }
    });
  }

  private suggestFilter(data: any, value: string) {
    return data.filter((obj) => {
      return obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }
}
