import moment from 'moment';
var DateFormatValueConverter = (function () {
    function DateFormatValueConverter() {
    }
    DateFormatValueConverter.prototype.toView = function (value, format) {
        if (format === void 0) { format = 'DD-MM-YYYY'; }
        return value ? moment(value).format(format) : '-';
    };
    return DateFormatValueConverter;
}());
export { DateFormatValueConverter };
