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
var telefoon_1 = require("./models/telefoon");
var TelefoonSelect = (function () {
    function TelefoonSelect() {
        this.index = -1;
        this.expanded = false;
        this.countryCodeList = [
            { value: '+32', desc: '(+32) België', class: 'be' },
            { value: '+49', desc: '(+49) Duitsland', class: 'de' },
            { value: '+33', desc: '(+33) Frankrijk', class: 'fr' },
            { value: '+44', desc: '(+44) Groot-Brittannië', class: 'gb' },
            { value: '+31', desc: '(+31) Nederland', class: 'nl' },
            { value: '+352', desc: '(+352) Luxemburg', class: 'lu' }
        ];
        this.suggestions = [];
    }
    TelefoonSelect.prototype.bind = function () {
        if (this.telefoon && !this.telefoon.landcode) {
            this.telefoon.landcode = '+32';
        }
    };
    TelefoonSelect.prototype.landcodeChanged = function (e) {
        var _this = this;
        if (e.which !== 40 && e.which !== 38 && this.telefoon.landcode) {
            this.index = -1;
            this.suggestions = this.countryCodeList.filter(function (c) { return c.value.indexOf(_this.telefoon.landcode) > -1; });
            this.expanded = this.suggestions.length > 0;
        }
    };
    TelefoonSelect.prototype.suggestionClicked = function (suggestion) {
        this.telefoon.landcode = suggestion.value;
        this.collapse();
    };
    TelefoonSelect.prototype.toggleSuggestions = function () {
        if (this.isDisabled()) {
            return;
        }
        this.suggestions = this.countryCodeList;
        this.expanded = true;
        this.landcodeInput.focus();
    };
    TelefoonSelect.prototype.collapse = function () {
        this.index = -1;
        this.expanded = false;
    };
    TelefoonSelect.prototype.blur = function () {
        this.collapse();
    };
    TelefoonSelect.prototype.keydown = function (e) {
        var key = e.which;
        if (!this.expanded) {
            return true;
        }
        if (key === 40) {
            if (this.index < this.suggestions.length - 1) {
                this.index++;
            }
            else {
                this.index = 0;
            }
            this.telefoon.landcode = this.suggestions[this.index].value;
            return;
        }
        if (key === 38) {
            if (this.index === -1) {
                this.index = this.suggestions.length - 1;
            }
            else if (this.index > 0) {
                this.index--;
            }
            else {
                this.index = this.suggestions.length - 1;
            }
            this.telefoon.landcode = this.suggestions[this.index].value;
            return;
        }
        if (key === 27 || key === 13) {
            this.collapse();
            return;
        }
        return true;
    };
    TelefoonSelect.prototype.isDisabled = function () {
        return this.disabled;
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", telefoon_1.Telefoon)
    ], TelefoonSelect.prototype, "telefoon", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], TelefoonSelect.prototype, "disabled", void 0);
    return TelefoonSelect;
}());
exports.TelefoonSelect = TelefoonSelect;

//# sourceMappingURL=telefoon-select.js.map
