import { HttpResponseMessage } from 'aurelia-http-client';

export interface IErkenning {
  erkend_als: string;
  erkend_voor: string;
  erkenningsnummer: string;
  geldigheid: string;
  id: number;
  omschrijving: string;
  reden_erkenning: IRedenErkenning;
  type: string;
  type_erkenning_id: number;
  uri: string;
}

export interface ISystemFields {
  created_at: string;
  updated_at: string;
  created_by: ISystemActor;
  updated_by: ISystemActor;
}

export interface ITelefoon {
  landcode: string;
  nummer: string;
  type: IType;
  volledig_nummer: string;
}

export interface IActor {
  adres: IAdres;
  adressen: IAdres[];
  afkorting: string;
  emails: IEmail[];
  erkenningen: IErkenning[];
  id: number;
  ids: IId[];
  info: unknown[];
  naam: string;
  omschrijving: string;
  opmerkingen: string;
  relaties: IRelatie[]
  self: string;
  status: IActorStatus;  
  systemfields: ISystemFields;
  telefoons: ITelefoon[];
  type: IType;
  types: string[];
  uri: string;
  urls: string[];
  voornaam: string;
  zichtbaarheid: IType;
}

export class Actor {
  public erkenningen: IErkenning[];
  public id: string;
  public omschrijving: string;
  public uri: string;
}

export interface IRangeHeader {
  start: number;
  end: number;
}

export interface IResponse<IType> {
  content: IType[];
  lastRow: number
}

/* User object */
export interface IUser {
  actor: IActor;
  attributes: IAttributes;
  organisatieCode: IOrganisatieCode;
  persoonsgegevens: IPersoonsgegevens;
  groups: string[];
  sso_token: string;
  personid: string;
  userid: string;
}

export interface IPersoonsgegevens {
  naam: string;
  omschrijving: string;
  voornaam: string;
  rijksregisternummer: string;
}

export interface IOrganisatieCode {
  type: string;
  description: string;
  value: string;
}

export interface IAttributes {
  cn: string;
  displayname: string;
  mail: string;
}

export interface IHeader {
  key: string;
  value: string;
}

export type ParamsType = Record<string, unknown>

export interface IHttpOptions {
  params?: ParamsType;
  headers?: IHeader[];
  responseType?: string;
}

export interface IHttpResponse<IType> extends HttpResponseMessage {
  content: IType;
}

export interface IApiObject {
  etag?: string;
}

export interface IValidationResult{
  valid: boolean;
  message: string;
}

export interface TabViewModel {
  currentViewModel: {
    validate?: () => Promise<IValidationResult>
  };
}

export interface ITab<T> {
  id: string;
  label: string,
  viewModel: string,
  closable: boolean,
  active: boolean,
  model?: T,
  edit?: boolean,
  newTab?: boolean,
  showInput?: boolean
}

export class Tab<T> {
  public id: string;
  public label: string;
  public viewModel: string;
  public closable: boolean;
  public active: boolean;
  public model?: T;
  public edit?: boolean;
  public newTab?: boolean;

  constructor(tabApi: ITab<T>) {
    Object.assign(this, tabApi);
  }
}

export interface IModel<T> {
  model: T;
  edit?: boolean;
  active?: boolean;
  tabid: string;
  application?: string;
}

export interface IStatus {
  id: number;
  status_id: number;
  naam: string;
  opmerkingen: string;
  datum: string;
  aanpasser_uri: string;
  aanpasser_omschrijving: string;
}

export interface IKoppelingResponse {
  total_ref_tekst: string;
  applications: IApplication[];
  zichtbaarheid_tekst: string;
}

export interface IAuteur {
  id: number;
  naam: string;
  voornaam?: string;
  uri?: string;
  actor_uri?: string;
  pseudoniem: string;
  achternaam_voornaam?: string;
  omschrijving?: string;
  naamsvermelding: INaamsVermelding;
  type: IAuteurType;
  afkorting: string;
  orcid: string;
  kbo?: string;
  ror?: string;
  wikidata?: string;
  status?: IAuteurStatus;
  statussen: IAuteurStatus[];
  emailadressen: IAuteurEmailAdres[];
  relaties: IAuteurRelatie[];
  systemfields: ISystemFields;
}

export interface IAuteurStatus {
  id: number;
  status_id: number;
  naam: ActiefStatus;
  opmerkingen: string;
  datum: string;
  aanpasser_uri: string;
  aanpasser_omschrijving: string;
}

export interface IAuteurEmailAdres {
  auteur_id: number;
  emailadres: string;
  verborgen: boolean;
  primair: boolean;
}

export interface IAuteurRelatie {
  id?: number;
  type?: IRelatieType;
  van_id?: number;
  naar_id: number;
  van_omschrijving?: string;
  naar_omschrijving?: string;
  naar_uri?: string;
  startdatum?: string;
  einddatum?: string;
}

export interface IRelatieType {
  id: number;
  naam: AuteurRelatieTypeEnum;
}

export interface IZoneerderServiceConfig {
  crabpyUrl: string;
  agivGrbUrl: string;
  beschermingenWMSUrl: string;
}
