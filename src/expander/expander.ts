import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class Expander {
  @bindable public header: string;
  @bindable public content: string;
  @bindable expanded = false;

  constructor(private eventAggregator: EventAggregator) { }

  public toggleExpander(expanded: boolean) {
    this.eventAggregator.publish('expanderCollapseAll')
    this.expanded = expanded;
  }
}
