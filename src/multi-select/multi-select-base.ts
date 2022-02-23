import { bindable } from 'aurelia-templating';

export abstract class MultiSelectBase {
  @bindable public options: unknown[];
  @bindable public value: unknown[];
  @bindable public placeholder: string;
  @bindable public disabled: boolean;
  @bindable public idProperty: string = 'id';
  @bindable public labelProperty: string = 'label';
}
