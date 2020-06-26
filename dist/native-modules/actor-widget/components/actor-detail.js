var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, bindable, customElement } from 'aurelia-framework';
var ActorDetail = (function () {
    function ActorDetail(element) {
        this.element = element;
        this.editMode = true;
    }
    ActorDetail.prototype.activate = function () {
        console.debug('actor-widget::details::activate');
    };
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], ActorDetail.prototype, "actor", void 0);
    ActorDetail = __decorate([
        autoinject(), customElement('actor-detail'),
        __metadata("design:paramtypes", [Element])
    ], ActorDetail);
    return ActorDetail;
}());
export { ActorDetail };

//# sourceMappingURL=actor-detail.js.map