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
export { StringValueConverter };

//# sourceMappingURL=string.js.map
