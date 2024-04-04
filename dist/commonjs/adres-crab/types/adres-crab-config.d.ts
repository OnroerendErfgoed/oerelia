import { autocompleteType } from "./../../autocomplete/models/autocomplete-type";
export interface IAdresCrabConfig {
    countryId?: string;
    postcode?: IConfigOption;
    straat?: IConfigOption;
    huisnummer?: IConfigOption;
    busnummer?: IConfigOption;
}
interface IConfigOption {
    required: boolean;
    autocompleteType: autocompleteType;
}
export {};
