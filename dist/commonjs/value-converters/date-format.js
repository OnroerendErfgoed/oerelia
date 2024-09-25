"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFormatValueConverter = void 0;
var moment_1 = require("moment");
var DateFormatValueConverter = (function () {
    function DateFormatValueConverter() {
    }
    DateFormatValueConverter.prototype.toView = function (value, format) {
        if (format === void 0) { format = 'DD-MM-YYYY'; }
        return value ? (0, moment_1.default)(value).format(format) : '-';
    };
    return DateFormatValueConverter;
}());
exports.DateFormatValueConverter = DateFormatValueConverter;

//# sourceMappingURL=date-format.js.map
