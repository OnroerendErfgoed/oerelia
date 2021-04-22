"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageParser = (function () {
    function MessageParser() {
    }
    MessageParser.parseHttpResponseMessage = function (response) {
        var result;
        result = {
            code: response.statusCode,
            response: {
                errors: []
            }
        };
        if (response.content.errors || response.content.message) {
            var errors = response.content.errors || [response.content.message];
            if (result.code && result.code === 500) {
                errors.forEach(function (error) {
                    if (error.indexOf('ict@onroerenderfgoed.be') !== -1) {
                        error.replace('ict@onroerenderfgoed.be', '<a href="mailto: ict@onroerenderfgoed.be">ict@onroerenderfgoed.be</a>');
                    }
                });
            }
            result.response.errors = errors;
            result.response.message = response.content.errors ? response.content.message : 'Er is een fout opgetreden';
        }
        else if (response.statusCode === 0 || response.statusCode === 500) {
            var reg = /^https?:\/\//i;
            var url = response.requestMessage.url;
            if (!reg.test(response.requestMessage.url)) {
                url = response.requestMessage.baseUrl + "/" + url;
            }
            result.response.errors = [
                "Er liep iets mis bij het ophalen van " + url + ".<br>\n         Mail naar ict@onroerenderfgoed.be om dit probleem te melden."
            ];
        }
        return result;
    };
    return MessageParser;
}());
exports.MessageParser = MessageParser;

//# sourceMappingURL=messageParser.js.map
