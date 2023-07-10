import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { RestMessage } from '../utilities/message/restMessage';
import { MessageParser } from '../utilities/message/messageParser';
import { sortBy } from 'lodash';
import { IAdresregisterAdres, IGemeente, IGewest, ILand, IPostinfo, IProvincie, IStraat } from './models/locatie';
import { Niscode } from './models/niscode.enum';

declare const oeAppConfig: any;

@inject(HttpClient)
export class AdresregisterService {
  private landen: ILand[] = [];
  private provincies: IProvincie[] = [];
  private gemeenten: IGemeente[] = [];

  private gemeentenVlaamsGewest: IGemeente[] = [];
  private gemeentenWaalsGewest: IGemeente[] = [];
  private gemeentenBHGewest: IGemeente[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.http.configure(x => {
      x.withBaseUrl(oeAppConfig.crabpyUrl);
      x.withHeader('Accept', 'application/json');
      x.withHeader('X-Requested-With', '');
      x.withInterceptor({
        responseError(res) {
          RestMessage.display({ result: MessageParser.parseHttpResponseMessage(res) });
          throw res;
        }
      });
    });
  }

  async getLanden(): Promise<ILand[]> {
    if (this.landen && this.landen.length) {
      return this.landen;
    }

    const landen = await this.crabGet<ILand[]>('adressenregister/landen');
    this.landen = sortBy(landen, 'naam');
    return this.landen;
  }

  async getProvincies(): Promise<IProvincie[]> {
    if (this.provincies && this.provincies.length > 0) {
      return this.provincies;
    }

    const provinciesVlaamsGewest = await this.getProvinciesPerGewest(Niscode.VlaamsGewest);
    const provinciesWaalsGewest = await this.getProvinciesPerGewest(Niscode.WaalsGewest);

    this.provincies = this.provincies.concat(provinciesVlaamsGewest, provinciesWaalsGewest);

    return sortBy(this.provincies, 'naam');
  }
  
  getProvinciesPerGewest(niscode: Niscode): Promise<IProvincie[]> {
    return this.crabGet<IProvincie[]>(`adressenregister/gewesten/${niscode}/provincies`);
  }

  get vlaamseGemeenten(): IGemeente[] {
    return this.gemeentenVlaamsGewest;
  }

  get waalseGemeenten(): IGemeente[] {
    return this.gemeentenWaalsGewest;
  }

  get brusselseGemeenten(): IGemeente[] {
    return this.gemeentenBHGewest;
  }

  async getGemeenten(): Promise<IGemeente[]> {
    if (this.gemeenten && this.gemeenten.length) {
      return this.gemeenten;
    }
    const gewesten = await this.crabGet<IGewest[]>('adressenregister/gewesten');
    const gemeentenPromises = [];
    gewesten.forEach((gewest) => gemeentenPromises.push(this.getGemeentenPerGewest(gewest.niscode as Niscode)));

    const gemeenten = await Promise.all(gemeentenPromises);
    if (gemeenten[0] && gemeenten[1] && gemeenten[2]) {
      this.gemeentenVlaamsGewest = gemeenten[0];
      this.gemeentenWaalsGewest = gemeenten[1];
      this.gemeentenBHGewest = gemeenten[2];
      this.gemeenten = this.gemeenten.concat(
        this.gemeentenVlaamsGewest,
        this.gemeentenWaalsGewest,
        this.gemeentenBHGewest
      );
      return sortBy(this.gemeenten, 'naam');
    }
    return [];
  }

  getGemeentenPerGewest(niscode: Niscode): Promise<IGemeente[]> {
    return this.crabGet<IGemeente[]>(`adressenregister/gewesten/${niscode}/gemeenten`);
  }

  getPostinfo(gemeente: string): Promise<IPostinfo[]> {
    return this.crabGet<IPostinfo[]>(`adressenregister/gemeenten/${gemeente}/postinfo`);
  }

  getStraten(gemeente: string): Promise<IStraat[]> {
    return this.crabGet<IStraat[]>(`adressenregister/gemeenten/${gemeente}/straten`);
  }

  getAdressen(straat: string, huisnummer?: string): Promise<IAdresregisterAdres[]> {
    if (huisnummer) {
      return this.crabGet<IAdresregisterAdres[]>(`adressenregister/straten/${straat}/huisnummers/${huisnummer}`);
    }
    return this.crabGet<IAdresregisterAdres[]>(`adressenregister/straten/${straat}/adressen`);
  }

  async suggestLocatie(value: string): Promise<unknown> {
    if (value === '') {
      return [];
    }
    return this.crabGet('geolocation/?locatie=' + value.toLowerCase() + '*')
  }

  public geolocate(value: number): Promise<unknown> {
    return this.crabGet('geolocation/' + value);
  }

  private async crabGet<T>(endpoint: string): Promise<T> {
    return (await this.http.get(endpoint)).content;
  }
}
