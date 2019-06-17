"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var autocomplete_type_1 = require("./autocomplete-type");
var AutocompleteTypeViewEngineHooks = (function () {
    function AutocompleteTypeViewEngineHooks() {
    }
    AutocompleteTypeViewEngineHooks.prototype.beforeBind = function (view) {
        var key = 'autocompleteType';
        view.overrideContext[key] = autocomplete_type_1.autocompleteType;
    };
    return AutocompleteTypeViewEngineHooks;
}());
exports.AutocompleteTypeViewEngineHooks = AutocompleteTypeViewEngineHooks;
