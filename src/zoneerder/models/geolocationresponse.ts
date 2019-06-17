import { Boundingbox } from './boundingbox';

export class GeolocationResponse {
  public id: string;
  public locatie: string;
  public type: string;
  public boundingbox: Boundingbox;
}
