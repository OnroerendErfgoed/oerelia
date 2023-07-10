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
