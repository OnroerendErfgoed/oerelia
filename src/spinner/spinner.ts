import { bindable } from 'aurelia-framework';

export class Spinner {
  @bindable public active: boolean;
  @bindable public spinnerText: string;
}
