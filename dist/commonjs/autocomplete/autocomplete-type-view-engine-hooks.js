"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutocompleteTypeViewEngineHooks = void 0;
var autocomplete_type_1 = require("./models/autocomplete-type");
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

//# sourceMappingURL=autocomplete-type-view-engine-hooks.js.map
