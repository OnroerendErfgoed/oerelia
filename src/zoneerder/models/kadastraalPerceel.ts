export class KadastraalPerceel {
  public afdeling: string;
  public sectie: string;
  public capakey: string;
  public perceel: string;

  constructor(afdeling: string, sectie: string, capakey: string, perceel: string) {
    this.afdeling = afdeling;
    this.sectie = sectie;
    this.capakey = capakey;
    this.perceel = perceel;
  }
}
