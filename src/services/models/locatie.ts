export interface ICrabAdres {
  gemeente: IGemeente;
  land: ILand;
  postcode: IPostcode;
  straat: IStraat;
  adres: IAdresregisterAdres;
}

export interface ILand {
  code: string;
  naam: string;
}

export interface IGemeente {
  naam: string;
  niscode: string;
}

export interface IPostcode {
  nummer: string;
  uri: string;
}

export interface IStraat {
  id: string;
  naam: string;
  uri: string;
  omschrijving: string;
}

export interface IAdresregisterAdres {
  id?: string;
  huisnummer?: string;
  busnummer?: string;
  uri?: string;
}

export interface IProvincie {
  niscode: string;
  naam: string;
  gewest: IGewest;
}

export interface IGewest {
  naam: string;
  niscode: string;
}

export interface IPostinfo {
  namen: string[];
  postcode: string;
  status: string;
  uri: string;
}

export class Gemeente {
  public id: number;
  public naam: string;
  public niscode?: number;

  constructor(
    id: number,
    naam: string,
    niscode?: number
  ) {
    this.id = id;
    this.naam = naam;
    this.niscode = niscode;
  }
}

export class Straat {
  public id: number;
  public naam: string;

  constructor(
    id: number,
    naam: string
  ) {
    this.id = id;
    this.naam = naam;
  }
}

export class Huisnummer {
  public id: number;
  public naam: string;

  constructor(
    id: number,
    naam: string
  ) {
    this.id = id;
    this.naam = naam;
  }
}
