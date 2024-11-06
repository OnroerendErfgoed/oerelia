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
exports.RelevanteAfstandInput = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var RelevanteAfstandInput = (function () {
    function RelevanteAfstandInput() {
        this.relevanteAfstand = "0.0";
        this.max = "6";
        this.min = "0";
        this.floatMin = "0.0";
        this.floatMax = "6.0";
        this.increment = 0.1;
        this.disabled = false;
    }
    RelevanteAfstandInput.prototype.onMinusClick = function () {
        this.relevanteAfstand = (Number(this.relevanteAfstand) - this.increment).toFixed(1);
    };
    RelevanteAfstandInput.prototype.onPlusClick = function () {
        this.relevanteAfstand = (Number(this.relevanteAfstand) + this.increment).toFixed(1);
    };
    __decorate([
        (0, aurelia_framework_1.bindable)({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
        __metadata("design:type", String)
    ], RelevanteAfstandInput.prototype, "relevanteAfstand", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], RelevanteAfstandInput.prototype, "max", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], RelevanteAfstandInput.prototype, "min", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], RelevanteAfstandInput.prototype, "floatMin", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], RelevanteAfstandInput.prototype, "floatMax", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], RelevanteAfstandInput.prototype, "increment", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], RelevanteAfstandInput.prototype, "disabled", void 0);
    return RelevanteAfstandInput;
}());
exports.RelevanteAfstandInput = RelevanteAfstandInput;

//# sourceMappingURL=relevante-afstand-input.js.map
