import { autoinject, bindable } from 'aurelia-framework';

@autoinject
export class Expander {
  @bindable public header: string;
  @bindable public content: string;
  @bindable expanded = false;

  public toggleExpander(expanded: boolean) {
    this.expanded = expanded;
  }
}
