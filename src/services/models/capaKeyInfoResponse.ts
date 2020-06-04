
export class CapaKeyInfoResponse {
  public percid: string;
  public sectie: CapaKeySection;
  public capakey: string;
}

export class CapaKeySection {
  public afdeling: CapaKeyAfdeling;
  public id: number;
}

export class CapaKeyAfdeling {
  public naam: string;
  public id: number;
  public gemeente: CapaKeyGemeente;
}

export class CapaKeyGemeente {
  public naam: string;
  public id: number;
}
