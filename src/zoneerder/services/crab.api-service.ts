import { HttpClient } from 'aurelia-http-client';
import * as toastr from 'toastr';
import { GeolocationResponse } from '../models/geolocationresponse';
import { Gemeente, Huisnummer, Straat } from '../models/locatie';

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
          toastr.error(res.content.message);
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
        return undefined;
      }).catch(error => {
        console.debug(error);
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
        return undefined;
      }).catch(error => {
        console.debug(error);
      });
    }
  }

  public getGemeentenByProvincie(provincie): Promise<void | any[]> {
    return this.crabGet(`crab/provincies/${provincie}/gemeenten`).then(response => {
      if (response.isSuccess) {
        const gemeenten: Gemeente[] = response.content.map(el => {
          return new Gemeente(el.id, el.niscode, el.naam);
        });
        gemeenten.sort(this.compare);
        return gemeenten;
      }
      return undefined;
    }).catch(error => {
      console.debug(error);
    });
  }

  public getGemeenten(): Promise<void | any[]> {
    if (this.gemeenten && this.gemeenten.length > 0) {
      return new Promise<any>(resolve => {
        resolve(this.gemeenten);
      });
    } else {
      return this.crabGet('crab/gewesten/2/gemeenten').then(responses => {
        if (responses.isSuccess) {
          let tempL: Gemeente[];
          tempL = JSON.parse(responses.response);
          tempL.sort(this.compare);
          tempL.forEach(el => {
            this.gemeenten.push(new Gemeente(el.id, el.niscode, el.naam));
          });
          return this.gemeenten;
        }
        return undefined;
      }).catch(error => {
        console.debug(error);
      });
    }
  }

  public getDeelgemeenten(gemeente) {
    return this.crabGet(`crab/gemeenten/${gemeente}/deelgemeenten`)
      .then(deelgemeenten => {
        if (deelgemeenten.isSuccess) {
          return deelgemeenten.content;
        } else {
          return [];
        }
      });
  }

  public getPostcodes(gemeente) {
    return this.crabGet(`crab/gemeenten/${gemeente}/postkantons`)
      .then(postcodes => {
        if (postcodes.isSuccess) {
          return postcodes.content;
        } else {
          return [];
        }
      });
  }

  public getStraten(gemeente) {
    return this.crabGet(`crab/gemeenten/${gemeente}/straten`)
      .then(straten => {
        if (straten.isSuccess) {
          const tempL: Straat[] = [];
          straten.content.forEach(element => {
            tempL.push(new Straat(element));
          });
          return tempL;
        } else {
          return [];
        }
      });
  }

  public getHuisnrs(straat) {
    return this.crabGet(`crab/straten/${straat}/huisnummers`)
      .then(huisnrs => {
        if (huisnrs.isSuccess) {
          const data = huisnrs.content.sort((a, b) => {
            return parseInt(a.label, 0) - parseInt(b.label, 0);
          });
          const tempL: Huisnummer[] = [];
          data.forEach(element => {
            tempL.push(new Huisnummer(element));
          });
          return tempL;
        } else {
          return [];
        }
      });
  }

  public suggestLocatie(value) {
    if (value === '') {
      return Promise.resolve([]);
    }
    return this.crabGet('geolocation/?locatie=' + value.toLowerCase() + '*')
      .then(response => {
        if (response.isSuccess) {
          return response.content;
        } else {
          return [];
        }
      });
  }

  public geolocate(value: string) {
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
  private compare(a, b) {
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
