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
var ExpanderContainer = (function () {
    function ExpanderContainer() {
        this.expanders = [];
    }
    ExpanderContainer.prototype.collapseAll = function () {
        this.expanders.forEach(function (expander) { return expander.expanded = false; });
    };
    __decorate([
        aurelia_framework_1.children('expander'),
        __metadata("design:type", Array)
    ], ExpanderContainer.prototype, "expanders", void 0);
    ExpanderContainer = __decorate([
        aurelia_framework_1.autoinject
    ], ExpanderContainer);
    return ExpanderContainer;
}());
exports.ExpanderContainer = ExpanderContainer;

//# sourceMappingURL=expander-container.js.map
