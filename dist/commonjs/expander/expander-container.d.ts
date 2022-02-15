import { Expander } from './expander';
import { EventAggregator } from 'aurelia-event-aggregator';
export declare class ExpanderContainer {
    private eventAggregator;
    expanders: Expander[];
    private allowMultipleExpanded;
    private subscription;
    constructor(eventAggregator: EventAggregator);
    bind(): void;
    collapseAll(): void;
    attached(): void;
    detached(): void;
}
