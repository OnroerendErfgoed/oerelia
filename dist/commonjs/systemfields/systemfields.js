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
exports.Systemfields = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var moment = require("moment");
var Systemfields = (function () {
    function Systemfields() {
    }
    Systemfields.prototype.formatDate = function (date) {
        return moment(date).format('DD/MM/YYYY [om] HH:mm');
    };
    Systemfields.prototype.attached = function () {
        this.createdAt = this.formatDate(this.systemfields.created_at);
        this.createdBy = this.systemfields.created_by.description;
        this.updatedAt = this.formatDate(this.systemfields.updated_at);
        this.updatedBy = this.systemfields.updated_by.description;
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Systemfields.prototype, "systemfields", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Systemfields.prototype, "status", void 0);
    return Systemfields;
}());
exports.Systemfields = Systemfields;

//# sourceMappingURL=systemfields.js.map
