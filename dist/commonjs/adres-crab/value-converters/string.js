"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringValueConverter = (function () {
    function StringValueConverter() {
    }
    StringValueConverter.prototype.fromView = function (value) {
        if (value) {
            return value.trim();
        }
    };
    return StringValueConverter;
}());
exports.StringValueConverter = StringValueConverter;

//# sourceMappingURL=string.js.map
