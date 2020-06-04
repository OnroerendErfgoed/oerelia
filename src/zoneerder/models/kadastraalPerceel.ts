export class KadastraalPerceel {
  public afdeling: string;
  public sectie: string;
  public capakey: string;
  public oppervlakte: string;
  public perceel: string;

  constructor(afdeling: string, sectie: string, capakey: string, oppervlakte: string, perceel: string) {
    this.afdeling = afdeling;
    this.sectie = sectie;
    this.capakey = capakey;
    this.oppervlakte = oppervlakte;
    this.perceel = perceel;
  }
}
