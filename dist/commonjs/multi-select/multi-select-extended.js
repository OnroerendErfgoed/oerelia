"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var multi_select_base_1 = require("./multi-select-base");
var MultiSelectExtended = (function (_super) {
    __extends(MultiSelectExtended, _super);
    function MultiSelectExtended() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addOnChange = false;
        return _this;
    }
    MultiSelectExtended.prototype.addInput = function () {
        var _this = this;
        if (this.inputValue) {
            var exists = this.value.filter(function (item) {
                return item[_this.idProperty] === _this.inputValue;
            });
            if (exists.length <= 0) {
                this.value.push(this.options.find(function (o) { return o[_this.idProperty] === _this.inputValue; }));
            }
        }
        this.inputValue = null;
    };
    MultiSelectExtended.prototype.removeFromList = function (item) {
        var _this = this;
        var index = this.value.findIndex(function (l) { return l[_this.idProperty] === item[_this.idProperty]; });
        this.value.splice(index, 1);
    };
    MultiSelectExtended.prototype.bind = function () {
        if (!this.value) {
            this.value = [];
        }
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], MultiSelectExtended.prototype, "addOnChange", void 0);
    MultiSelectExtended = __decorate([
        aurelia_framework_1.autoinject
    ], MultiSelectExtended);
    return MultiSelectExtended;
}(multi_select_base_1.MultiSelectBase));
exports.MultiSelectExtended = MultiSelectExtended;

//# sourceMappingURL=multi-select-extended.js.map
