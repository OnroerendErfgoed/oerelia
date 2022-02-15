var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, bindable } from 'aurelia-framework';
var Expander = (function () {
    function Expander() {
        this.expanded = false;
    }
    Expander.prototype.toggleExpander = function (expanded) {
        this.expanded = expanded;
    };
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], Expander.prototype, "header", void 0);
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], Expander.prototype, "content", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], Expander.prototype, "expanded", void 0);
    Expander = __decorate([
        autoinject
    ], Expander);
    return Expander;
}());
export { Expander };

//# sourceMappingURL=expander.js.map
