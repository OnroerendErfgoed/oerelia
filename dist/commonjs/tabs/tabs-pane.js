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
var aurelia_templating_1 = require("aurelia-templating");
var TabsPane = (function () {
    function TabsPane() {
    }
    __decorate([
        aurelia_templating_1.bindable,
        __metadata("design:type", Object)
    ], TabsPane.prototype, "model", void 0);
    __decorate([
        aurelia_templating_1.bindable,
        __metadata("design:type", Object)
    ], TabsPane.prototype, "tab", void 0);
    __decorate([
        aurelia_templating_1.bindable,
        __metadata("design:type", Object)
    ], TabsPane.prototype, "viewModel", void 0);
    __decorate([
        aurelia_templating_1.bindable,
        __metadata("design:type", Boolean)
    ], TabsPane.prototype, "active", void 0);
    __decorate([
        aurelia_templating_1.bindable,
        __metadata("design:type", Object)
    ], TabsPane.prototype, "tabViewModel", void 0);
    TabsPane = __decorate([
        aurelia_templating_1.containerless()
    ], TabsPane);
    return TabsPane;
}());
exports.TabsPane = TabsPane;
