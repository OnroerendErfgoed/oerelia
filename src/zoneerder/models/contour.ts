export class Contour {
  public coordinates: [number, number][][][] ;
  public crs: object;
  public type: string;

  constructor(c?: Contour) {
    if (c) {
      this.coordinates = c.coordinates;
      this.crs = c.crs;
      this.type = c.type;
    }
  }
}
