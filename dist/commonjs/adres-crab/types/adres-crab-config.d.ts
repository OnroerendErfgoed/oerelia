import { autocompleteType } from './../../autocomplete/models/autocomplete-type';
export interface IAdresCrabConfig {
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
