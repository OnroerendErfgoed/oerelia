var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { bindingMode, observable } from 'aurelia-binding';
import { bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { autocompleteType } from './models/autocomplete-type';
var nextID = 0;
var Autocomplete = (function () {
    function Autocomplete(element) {
        this.inputValue = '';
        this.placeholder = '';
        this.delay = 300;
        this.label = 'name';
        this.minlength = 2;
        this.type = autocompleteType.Auto;
        this.huisnummer = '';
        this.field = '';
        this.expanded = false;
        this.updatingInput = false;
        this.suggestions = [];
        this.index = -1;
        this.suggestionsUL = null;
        this.userInput = '';
        this.element = null;
        this.loaded = false;
        this.element = element;
        this.id = nextID++;
    }
    Autocomplete.prototype.attached = function () {
        this.loaded = true;
        if (this.value) {
            this.valueChanged();
        }
    };
    Autocomplete.prototype.display = function (name) {
        this.updatingInput = true;
        this.inputValue = name;
        this.updatingInput = false;
    };
    Autocomplete.prototype.getName = function (suggestion) {
        if (suggestion == null) {
            return '';
        }
        if (this.labelParser) {
            return this.labelParser(suggestion);
        }
        return suggestion[this.label];
    };
    Autocomplete.prototype.collapse = function () {
        this.expanded = false;
        this.index = -1;
    };
    Autocomplete.prototype.select = function (suggestion) {
        var displayName = '';
        if (typeof suggestion === 'string') {
            switch (this.field) {
                case 'postcode':
                    this.value = { nummer: suggestion };
                    break;
                case 'straat':
                    this.value = { naam: suggestion };
                    break;
                case 'huisnummer':
                    this.value = { huisnummer: suggestion };
                    break;
                case 'busnummer':
                    this.value = { huisnummer: this.huisnummer, busnummer: suggestion };
                    break;
            }
            displayName = suggestion;
        }
        else {
            this.value = suggestion;
            displayName = this.getName(this.value);
        }
        this.display(displayName);
        this.collapse();
    };
    Autocomplete.prototype.valueChanged = function () {
        if (this.loaded) {
            this.select(this.value);
        }
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
        if (value.length >= this.minlength) {
            this.service.suggest(value)
                .then(function (suggestions) {
                var _a;
                _this.index = -1;
                if (!suggestions) {
                    _this.collapse();
                }
                else {
                    (_a = _this.suggestions).splice.apply(_a, __spreadArray([0, _this.suggestions.length], suggestions, false));
                    if (suggestions.length === 1 && _this.type !== autocompleteType.Suggest) {
                        _this.select(suggestions[0]);
                    }
                    else if (suggestions.length === 0) {
                        _this.collapse();
                    }
                    else {
                        _this.expanded = true;
                    }
                }
            });
        }
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
            if (this.suggestions && this.index < this.suggestions.length - 1) {
                this.index++;
                this.display(this.getName(this.suggestions[this.index]));
            }
            else {
                this.index = -1;
                this.display(this.userInput);
            }
            this.scroll();
            return;
        }
        if (key === 38) {
            if (this.index === -1) {
                this.index = this.suggestions && this.suggestions.length - 1;
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
            return;
        }
        if (key === 27) {
            this.display(this.userInput);
            this.collapse();
            return;
        }
        if (key === 13) {
            if (this.index >= 0) {
                this.select(this.suggestions[this.index]);
            }
            return;
        }
        return true;
    };
    Autocomplete.prototype.blur = function () {
        if ((this.getName(this.value) === this.inputValue) || (this.type !== autocompleteType.Suggest)) {
            this.select(this.value);
            var event_1 = new CustomEvent('blur');
            this.element.dispatchEvent(event_1);
            return;
        }
        var customValue = this.parser ? this.parser(this.inputValue) : this.defaultParser(this.inputValue);
        this.select(customValue);
    };
    Autocomplete.prototype.suggestionClicked = function (suggestion) {
        this.select(suggestion);
    };
    Autocomplete.prototype.focus = function () {
        this.element.firstElementChild.focus();
    };
    Autocomplete.prototype.resetUserInput = function () {
        this.userInput = '';
    };
    Autocomplete.prototype.defaultParser = function (value) {
        return value.trim();
    };
    __decorate([
        observable,
        __metadata("design:type", String)
    ], Autocomplete.prototype, "inputValue", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], Autocomplete.prototype, "service", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], Autocomplete.prototype, "value", void 0);
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], Autocomplete.prototype, "placeholder", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Number)
    ], Autocomplete.prototype, "delay", void 0);
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], Autocomplete.prototype, "label", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Boolean)
    ], Autocomplete.prototype, "disabled", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Function)
    ], Autocomplete.prototype, "labelParser", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Function)
    ], Autocomplete.prototype, "onEnter", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Number)
    ], Autocomplete.prototype, "minlength", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Number)
    ], Autocomplete.prototype, "type", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], Autocomplete.prototype, "parser", void 0);
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], Autocomplete.prototype, "huisnummer", void 0);
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], Autocomplete.prototype, "field", void 0);
    Autocomplete = __decorate([
        inject(Element),
        __metadata("design:paramtypes", [Element])
    ], Autocomplete);
    return Autocomplete;
}());
export { Autocomplete };

//# sourceMappingURL=autocomplete.js.map
