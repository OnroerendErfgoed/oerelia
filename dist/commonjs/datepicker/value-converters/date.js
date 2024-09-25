"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateValueConverter = void 0;
var moment = require("moment");
var DateValueConverter = (function () {
    function DateValueConverter() {
    }
    DateValueConverter.prototype.toView = function (value) {
        if (value) {
            return moment(value).format('DD/MM/YYYY');
        }
    };
    DateValueConverter.prototype.fromView = function (value) {
        if (value) {
            return moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
    };
    return DateValueConverter;
}());
exports.DateValueConverter = DateValueConverter;

//# sourceMappingURL=date.js.map
