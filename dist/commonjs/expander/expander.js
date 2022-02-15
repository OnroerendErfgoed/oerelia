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
var Expander = (function () {
    function Expander(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.expanded = false;
    }
    Expander.prototype.toggleExpander = function (expanded) {
        this.eventAggregator.publish('expanderCollapseAll');
        this.expanded = expanded;
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Expander.prototype, "header", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Expander.prototype, "content", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Expander.prototype, "expanded", void 0);
    Expander = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
    ], Expander);
    return Expander;
}());
exports.Expander = Expander;

//# sourceMappingURL=expander.js.map
