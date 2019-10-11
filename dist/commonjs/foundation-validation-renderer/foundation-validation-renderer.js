"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_1 = require("../utilities/message/message");
var FoundationValidationRenderer = (function () {
    function FoundationValidationRenderer() {
    }
    FoundationValidationRenderer.prototype.render = function (instruction) {
        for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
            var _b = _a[_i], result = _b.result, elements = _b.elements;
            for (var _c = 0, elements_1 = elements; _c < elements_1.length; _c++) {
                var element = elements_1[_c];
                this.remove(element, result);
            }
        }
        for (var _d = 0, _e = instruction.render; _d < _e.length; _d++) {
            var _f = _e[_d], result = _f.result, elements = _f.elements;
            for (var _g = 0, elements_2 = elements; _g < elements_2.length; _g++) {
                var element = elements_2[_g];
                this.add(element, result);
            }
        }
    };
    FoundationValidationRenderer.prototype.add = function (element, result) {
        if (result.valid) {
            return;
        }
        if (result.message && result.rule.messageKey.indexOf('required') === -1) {
            message_1.Message.error({
                title: result.rule.property.displayName || result.propertyName,
                message: result.message
            });
        }
        var container = this.getContainer(element);
        if (!container) {
            return;
        }
        container.classList.add('error');
    };
    FoundationValidationRenderer.prototype.remove = function (element, result) {
        if (result.valid) {
            return;
        }
        var container = this.getContainer(element);
        if (!container) {
            return;
        }
        container.classList.remove('error');
    };
    FoundationValidationRenderer.prototype.getContainer = function (element) {
        var container = element.closest('.placeholder-container');
        if (!container && (element.nodeName === 'FUZZY-DATE' || element.nodeName === 'TINY-MCE')) {
            container = element;
        }
        return container;
    };
    return FoundationValidationRenderer;
}());
exports.FoundationValidationRenderer = FoundationValidationRenderer;
