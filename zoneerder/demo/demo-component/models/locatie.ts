export class Provincie {
  public niscode: number;
  public naam: string;

  constructor(
    niscode: number,
    naam: string
  ) {
    this.niscode = niscode;
    this.naam = naam;
  }
}

export class Deelgemeente {
  public niscode: number;
  public naam: string;

  constructor(
    niscode: number,
    naam: string
  ) {
    this.niscode = niscode;
    this.naam = naam;
  }
}

export class Gemeente {
  public id: number;
  public niscode: number;
  public naam: string;

  constructor(
    id: number,
    niscode: number,
    naam: string
  ) {
    this.id = id;
    this.niscode = niscode;
    this.naam = naam;
  }
}

export class Straat {
  public id: number;
  public naam: string;
  constructor(straat?) {
    if (straat) {
      this.id = straat.id;
      this.naam = straat.naam || straat.label;
    } else {
      this.id = null;
      this.naam = '';
    }
  }
}

export class Huisnummer {
  public id: number;
  public naam: string;
  constructor(nummer?) {
    if (nummer) {
      this.id = nummer.id;
      this.naam = nummer.naam || nummer.label;
    } else {
      this.id = null;
      this.naam = '';
    }
  }
}
