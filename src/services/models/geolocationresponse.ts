export class GeolocationResponse {
  public id: string;
  public locatie: string;
  public type: string;
  public boundingbox: Boundingbox;
}

export class Boundingbox {
  public lowerleft: {lat: number, lon: number};
  public upperright: {lat: number, lon: number};
}
