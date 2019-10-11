export class Adres {
  public id: number;
  public land: string;
  public gemeente: Gemeente;
  public postcode: Postcode;
  public straat: Straat;
  public huisnummer: Huisnummer;
  public subadres: string;
}

export class Gemeente {
  public id: number;
  public naam: string;
  public niscode?: number;
}

export class Postcode {
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

export class Straat {
  public id: number;
  public naam: string;
}

export class Huisnummer {
  public id: number;
  public naam: string;
}
