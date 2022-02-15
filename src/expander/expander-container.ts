import { autoinject, children, bindable } from 'aurelia-framework';
import { Expander } from './expander';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

@autoinject
export class ExpanderContainer {
  @children('expander') expanders: Expander[] = [];
  @bindable private collapseOthers = false;
  private subscription: Subscription;

  constructor(private eventAggregator: EventAggregator) { }

  public bind() {
    console.log(this.expanders);
  }

  public collapseAll() {
    this.expanders.forEach((expander) => expander.expanded = false);
  }

  public attached() {
    this.subscription = this.eventAggregator.subscribe('expanderCollapseAll', this.collapseAll.bind(this));
  }

  public detached() {
    this.subscription?.dispose();
  }
}
