import { autocompleteType } from './models/autocomplete-type';
var AutocompleteTypeViewEngineHooks = (function () {
    function AutocompleteTypeViewEngineHooks() {
    }
    AutocompleteTypeViewEngineHooks.prototype.beforeBind = function (view) {
        var key = 'autocompleteType';
        view.overrideContext[key] = autocompleteType;
    };
    return AutocompleteTypeViewEngineHooks;
}());
export { AutocompleteTypeViewEngineHooks };
