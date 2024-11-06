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
exports.CopyButton = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var CopyButton = (function () {
    function CopyButton() {
        this.clipboardTitle = 'Kopiëren';
        this.showCheckIcon = false;
    }
    CopyButton.prototype.copy = function () {
        var url = this.element;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url.innerText).then(function () {
                this.showCheckIcon = true;
                this.hideCheckIcon();
            }.bind(this));
        }
        else {
            this.showCheckIcon = true;
            this.IEClipboardCopy(url.innerText);
            this.hideCheckIcon();
        }
    };
    CopyButton.prototype.hideCheckIcon = function () {
        setTimeout(function () {
            this.showCheckIcon = false;
        }.bind(this), 2000);
    };
    CopyButton.prototype.IEClipboardCopy = function (text) {
        var input = document.createElement('input');
        input.setAttribute('value', text);
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", HTMLElement)
    ], CopyButton.prototype, "element", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], CopyButton.prototype, "clipboardTitle", void 0);
    return CopyButton;
}());
exports.CopyButton = CopyButton;

//# sourceMappingURL=copy-button.js.map
