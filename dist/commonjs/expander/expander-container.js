"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var ExpanderContainer = (function () {
    function ExpanderContainer(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.expanders = [];
        this.allowMultipleExpanded = false;
    }
    ExpanderContainer.prototype.bind = function () {
        console.log(this.expanders);
    };
    ExpanderContainer.prototype.collapseAll = function () {
        if (!this.allowMultipleExpanded) {
            this.expanders.forEach(function (expander) { return expander.expanded = false; });
        }
    };
    ExpanderContainer.prototype.attached = function () {
        this.subscription = this.eventAggregator.subscribe('expanderCollapseAll', this.collapseAll.bind(this));
    };
    ExpanderContainer.prototype.detached = function () {
        this.subscription && this.subscription.dispose();
    };
    __decorate([
        aurelia_framework_1.children('expander'),
        __metadata("design:type", Array)
    ], ExpanderContainer.prototype, "expanders", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], ExpanderContainer.prototype, "allowMultipleExpanded", void 0);
    ExpanderContainer = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
    ], ExpanderContainer);
    return ExpanderContainer;
}());
exports.ExpanderContainer = ExpanderContainer;

//# sourceMappingURL=expander-container.js.map
