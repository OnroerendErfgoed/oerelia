import { autoinject, children } from 'aurelia-framework';
import { Expander } from './expander';

@autoinject
export class ExpanderContainer {
  @children('expander') expanders: Expander[] = [];

  public collapseAll() {
    this.expanders.forEach((expander) => expander.expanded = false);
  }
}
