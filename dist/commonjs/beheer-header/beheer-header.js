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
var BeheerHeader = (function () {
    function BeheerHeader() {
        this.showMijnGegevens = false;
        this.navOpen = false;
    }
    BeheerHeader.prototype.toggleNav = function () {
        this.navOpen = !this.navOpen;
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], BeheerHeader.prototype, "role", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], BeheerHeader.prototype, "title", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], BeheerHeader.prototype, "baseUrl", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], BeheerHeader.prototype, "afmeldenUrl", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], BeheerHeader.prototype, "username", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], BeheerHeader.prototype, "userUrl", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], BeheerHeader.prototype, "showMijnGegevens", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], BeheerHeader.prototype, "changeUrl", void 0);
    return BeheerHeader;
}());
exports.BeheerHeader = BeheerHeader;

//# sourceMappingURL=beheer-header.js.map
