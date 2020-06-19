export class User {
  constructor(
    public actor: Actor,
    public attributes: Attributes,
    public groups: string[],
    public organisatieCode: OrganisatieCode,
    public personid: string,
    public persoonsgegevens: Persoonsgegevens,
    public ssoToken: string,
    public userid: string
  ) {}

  public hasRole(role: string): boolean {
    const found = this.groups.find(group => group === role);
    return found ? true : false;
  }
}

export class Actor {
  public erkenningen: any;
  public id: string;
  public omschrijving: string;
  public uri: string;
}

export class Attributes {
  public cn: string;
  public displayname: string;
  public mail: string;
}

export class Persoonsgegevens {
  public naam: string;
  public omschrijving: string;
  public voornaam: string;
  public rijksregisternummer: string;
}

export class OrganisatieCode {
  public type: string;
  public description: string;
  public value: string;
}
