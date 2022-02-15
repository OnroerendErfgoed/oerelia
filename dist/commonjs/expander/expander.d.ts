import { EventAggregator } from 'aurelia-event-aggregator';
export declare class Expander {
    private eventAggregator;
    header: string;
    content: string;
    expanded: boolean;
    constructor(eventAggregator: EventAggregator);
    toggleExpander(expanded: boolean): void;
}
