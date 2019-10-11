import { HttpClient } from 'aurelia-http-client';
import { Gemeente, Huisnummer, Straat } from './models/locatie';
import { GeolocationResponse } from './models/geolocationresponse';
import { RestMessage } from '../message/restMessage';
import { MessageParser } from '../message/messageParser';

export class CrabService {
  private landen: any[] = [];
  private provincies: any[] = [];
  private gemeenten: Gemeente[] = [];

  constructor(
    private http: HttpClient,
    private crabpyUrl: string
  ) {
    this.http.configure(x => {
      x.withBaseUrl(this.crabpyUrl);
      x.withHeader('Accept', 'application/json');
      x.withHeader('X-Requested-With', '');
      x.withInterceptor({
        responseError(res) {
          RestMessage.display({ result: MessageParser.parseHttpResponseMessage(res) });
          return res;
        }
      });
    });
  }

  public getLanden(): Promise<void | any[]> {
    if (this.landen && this.landen.length > 0) {
      return new Promise<any>(resolve => {
        resolve(this.landen);
      });
    } else {
      return this.crabGet('crab/landen').then(response => {
        if (response.isSuccess) {
          this.landen = response.content;
          this.landen.sort(this.compare);
          return this.landen;
        }
        return [];
      });
    }
  }

  public getProvincies(): Promise<void | any[]> {
    if (this.provincies && this.provincies.length > 0) {
      return new Promise<any>(resolve => {
        resolve(this.provincies);
      });
    } else {
      return this.crabGet('crab/gewesten/2/provincies').then(response => {
        if (response.isSuccess) {
          this.provincies = response.content;
          this.provincies.sort(this.compare);
          return this.provincies;
        }
        return [];
      });
    }
  }

  public getGemeentenByProvincie(provincie: number): Promise<void | any[]> {
    return this.crabGet(`crab/provincies/${provincie}/gemeenten`).then(response => {
      if (response.isSuccess) {
        const gemeenten: Gemeente[] = response.content.map(el => {
          return new Gemeente(el.naam, el.id, el.niscode);
        });
        gemeenten.sort(this.compare);
        return gemeenten;
      }
      return [];
    });
  }

  public getGemeenten(): Promise<void | any[]> {
    if (this.gemeenten && this.gemeenten.length > 0) {
      return new Promise<any>(resolve => {
        resolve(this.gemeenten);
      });
    } else {
      return Promise.all([
        this.crabGet('crab/gewesten/1/gemeenten'),
        this.crabGet('crab/gewesten/2/gemeenten'),
        this.crabGet('crab/gewesten/3/gemeenten')
      ]).then(responses => {
        if (responses[0].isSuccess && responses[1].isSuccess && responses[2].isSuccess) {
          this.gemeenten = this.gemeenten.concat(responses[0].content, responses[1].content, responses[2].content);
          this.gemeenten = this.gemeenten.map(el => {
            return new Gemeente(el.id, el.naam, el.niscode);
          });
          this.gemeenten.sort(this.compare);
          return this.gemeenten;
        }
        return [];
      });
    }
  }

  public getDeelgemeenten(gemeente: number) {
    return this.crabGet(`crab/gemeenten/${gemeente}/deelgemeenten`).then(response => {
      if (response.isSuccess) {
        return response.content;
      }
      return [];
    });
  }

  public getPostcodes(gemeente: number) {
    return this.crabGet(`crab/gemeenten/${gemeente}/postkantons`).then(response => {
      if (response.isSuccess) {
        return response.content;
      }
      return [];
    });
  }

  public getStraten(gemeente: number) {
    return this.crabGet(`crab/gemeenten/${gemeente}/straten`).then(response => {
      if (response.isSuccess) {
        const straten: Straat[] = response.content.map(el => {
          return new Straat(el.id, el.label);
        });
        return straten;
      }
      return [];
    });
  }

  public getHuisnrs(straat: number) {
    return this.crabGet(`crab/straten/${straat}/huisnummers`).then(response => {
      if (response.isSuccess) {
        const huisnummers: Huisnummer[] = response.content.map(el => {
          return new Huisnummer(el.id, el.label);
        });
        huisnummers.sort((a, b) => {
          return parseInt(a.naam, 0) - parseInt(b.naam, 0);
        });
        return huisnummers;
      }
      return [];
    });
  }

  public suggestLocatie(value: string) {
    if (value === '') {
      return Promise.resolve([]);
    }
    return this.crabGet('geolocation/?locatie=' + value.toLowerCase() + '*')
      .then(response => {
        if (response.isSuccess) {
          return response.content;
        }
        return [];
      });
  }

  public geolocate(value: number) {
    return this.crabGet('geolocation/' + value)
      .then(response => {
        if (response.isSuccess) {
          return (response.content as GeolocationResponse);
        } else {
          return null;
        }
      });
  }

  /**
   * Compare function for sorting of 'gemeenten'
   * @param a gemeente
   * @param b gemeente
   */
  private compare(a: any, b: any) {
    if (a.naam < b.naam) {
      return -1;
    } else if (a.naam > b.naam) {
      return 1;
    } else {
      return 0;
    }
  }

  private crabGet(endpoint) {
    return this.http.get(endpoint);
  }
}
