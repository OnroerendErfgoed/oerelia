var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { bindable } from "aurelia-framework";
import * as moment from "moment";
var Systemfields = (function () {
    function Systemfields() {
    }
    Systemfields.prototype.formatDate = function (date) {
        return date ? moment(date).format("DD/MM/YYYY [om] HH:mm") : undefined;
    };
    Systemfields.prototype.attached = function () {
        var _a, _b, _c, _d, _e, _f;
        this.createdAt = this.formatDate((_a = this.systemfields) === null || _a === void 0 ? void 0 : _a.created_at);
        this.createdBy = (_c = (_b = this.systemfields) === null || _b === void 0 ? void 0 : _b.created_by) === null || _c === void 0 ? void 0 : _c.description;
        this.updatedAt = this.formatDate((_d = this.systemfields) === null || _d === void 0 ? void 0 : _d.updated_at);
        this.updatedBy = (_f = (_e = this.systemfields) === null || _e === void 0 ? void 0 : _e.updated_by) === null || _f === void 0 ? void 0 : _f.description;
    };
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], Systemfields.prototype, "systemfields", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], Systemfields.prototype, "status", void 0);
    return Systemfields;
}());
export { Systemfields };

//# sourceMappingURL=systemfields.js.map
