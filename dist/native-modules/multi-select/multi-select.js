var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
var MultiSelect = (function () {
    function MultiSelect(element) {
        this.textValue = '';
        this.expanded = false;
        this.mouseover = false;
        this.element = null;
        this.element = element;
    }
    MultiSelect.prototype.bind = function () {
        this.updateTextValue();
    };
    MultiSelect.prototype.valueChanged = function () {
        this.value.length > 0 && this.updateTextValue();
    };
    MultiSelect.prototype.toggleList = function () {
        var _this = this;
        this.expanded = !this.expanded;
        var el = this.element;
        this.value.forEach(function (obj) {
            el.querySelector("li[data-id=\"" + obj[_this.idProperty] + "\"]").classList.add('selected');
        });
    };
    MultiSelect.prototype.optionClicked = function (option, target) {
        var _this = this;
        var index = this.value.findIndex(function (obj) { return obj[_this.idProperty] === option[_this.idProperty]; });
        if (index < 0) {
            var obj = {};
            obj[this.idProperty] = option[this.idProperty];
            obj[this.labelProperty] = option[this.labelProperty];
            this.value.push(obj);
        }
        else {
            this.value.splice(index, 1);
        }
        target.classList.toggle('selected');
        this.updateTextValue();
        this.element.querySelector('input[readonly]').focus();
        this.expanded = true;
    };
    MultiSelect.prototype.updateTextValue = function () {
        var _this = this;
        var values = this.value.map(function (val) { return val[_this.labelProperty]; }).join(', ');
        this.textValue = values;
    };
    MultiSelect.prototype.reset = function () {
        this.updateTextValue();
        var selected = this.element.querySelectorAll('li.selected');
        selected.forEach(function (el) {
            el.classList.remove('selected');
        });
    };
    __decorate([
        bindable,
        __metadata("design:type", Array)
    ], MultiSelect.prototype, "options", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Array)
    ], MultiSelect.prototype, "value", void 0);
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], MultiSelect.prototype, "textValue", void 0);
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], MultiSelect.prototype, "placeholder", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "disabled", void 0);
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], MultiSelect.prototype, "idProperty", void 0);
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], MultiSelect.prototype, "labelProperty", void 0);
    MultiSelect = __decorate([
        inject(Element),
        __metadata("design:paramtypes", [Element])
    ], MultiSelect);
    return MultiSelect;
}());
export { MultiSelect };

//# sourceMappingURL=multi-select.js.map
