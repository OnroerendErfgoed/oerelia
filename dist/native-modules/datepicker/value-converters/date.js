import * as moment from 'moment';
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
export { DateValueConverter };

//# sourceMappingURL=date.js.map
