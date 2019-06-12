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
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_framework_1 = require("aurelia-framework");
var nextID = 0;
var Autocomplete = (function () {
    function Autocomplete(element) {
        this.inputValue = '';
        this.placeholder = '';
        this.delay = 300;
        this.label = 'name';
        this.onEnter = null;
        this.expanded = false;
        this.updatingInput = false;
        this.suggestions = [];
        this.index = -1;
        this.suggestionsUL = null;
        this.userInput = '';
        this.element = null;
        this.element = element;
        this.id = nextID++;
    }
    Autocomplete.prototype.display = function (name) {
        this.updatingInput = true;
        this.inputValue = name;
        this.updatingInput = false;
    };
    Autocomplete.prototype.getName = function (suggestion) {
        if (suggestion == null) {
            return '';
        }
        return suggestion[this.label];
    };
    Autocomplete.prototype.collapse = function () {
        this.expanded = false;
        this.index = -1;
    };
    Autocomplete.prototype.select = function (suggestion) {
        this.value = suggestion;
        var name = this.getName(this.value);
        this.userInput = name;
        this.display(name);
        this.collapse();
    };
    Autocomplete.prototype.valueChanged = function () {
        this.select(this.value);
    };
    Autocomplete.prototype.inputValueChanged = function (value) {
        var _this = this;
        if (this.updatingInput) {
            return;
        }
        this.userInput = value;
        if (value === '') {
            this.value = null;
            this.collapse();
            return;
        }
        this.service.suggest(value)
            .then(function (suggestions) {
            var _a;
            _this.index = -1;
            (_a = _this.suggestions).splice.apply(_a, [0, _this.suggestions.length].concat(suggestions));
            if (suggestions.length === 1) {
                _this.select(suggestions[0]);
            }
            else if (suggestions.length === 0) {
                _this.collapse();
            }
            else {
                _this.expanded = true;
            }
        });
    };
    Autocomplete.prototype.scroll = function () {
        var ul = this.suggestionsUL;
        var li = ul.children.item(this.index === -1 ? 0 : this.index);
        if (li.offsetTop + li.offsetHeight > ul.offsetHeight) {
            ul.scrollTop += li.offsetHeight;
        }
        else if (li.offsetTop < ul.scrollTop) {
            ul.scrollTop = li.offsetTop;
        }
    };
    Autocomplete.prototype.keydown = function (e) {
        var key = e.which;
        if (this.value && this.onEnter && key === 13) {
            e.preventDefault();
            this.onEnter();
        }
        if (!this.expanded) {
            return true;
        }
        if (key === 40) {
            if (this.index < this.suggestions.length - 1) {
                this.index++;
                this.display(this.getName(this.suggestions[this.index]));
            }
            else {
                this.index = -1;
                this.display(this.userInput);
            }
            this.scroll();
            return false;
        }
        if (key === 38) {
            if (this.index === -1) {
                this.index = this.suggestions.length - 1;
                this.display(this.getName(this.suggestions[this.index]));
            }
            else if (this.index > 0) {
                this.index--;
                this.display(this.getName(this.suggestions[this.index]));
            }
            else {
                this.index = -1;
                this.display(this.userInput);
            }
            this.scroll();
            return false;
        }
        if (key === 27) {
            this.display(this.userInput);
            this.collapse();
            return false;
        }
        if (key === 13) {
            if (this.index >= 0) {
                this.select(this.suggestions[this.index]);
            }
            return false;
        }
        return true;
    };
    Autocomplete.prototype.blur = function () {
        this.select(this.value);
        var event = new CustomEvent('blur');
        this.element.dispatchEvent(event);
    };
    Autocomplete.prototype.suggestionClicked = function (suggestion) {
        this.select(suggestion);
    };
    Autocomplete.prototype.focus = function () {
        this.element.firstElementChild.focus();
    };
    __decorate([
        aurelia_binding_1.observable,
        __metadata("design:type", String)
    ], Autocomplete.prototype, "inputValue", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Autocomplete.prototype, "service", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay }),
        __metadata("design:type", String)
    ], Autocomplete.prototype, "value", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Autocomplete.prototype, "placeholder", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], Autocomplete.prototype, "delay", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Autocomplete.prototype, "label", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], Autocomplete.prototype, "disabled", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Autocomplete.prototype, "onEnter", void 0);
    Autocomplete = __decorate([
        aurelia_framework_1.inject(Element),
        __metadata("design:paramtypes", [Element])
    ], Autocomplete);
    return Autocomplete;
}());
exports.Autocomplete = Autocomplete;
