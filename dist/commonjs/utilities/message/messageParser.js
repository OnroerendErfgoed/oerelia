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
            errors.forEach(function (error, index) {
                if (error.indexOf('ict@onroerenderfgoed.be') !== -1) {
                    var subject = 'Vraag of fout bij ' + response.requestMessage.url;
                    var errorInfo = 'Opgetreden fout: ' + new Date().toString() + ' - ' + response.statusText + ' \n \n';
                    var body = errorInfo + 'Gelieve hieronder uw probleem of vraag te omschrijven. Vermeld zeker de genomen stappen en voeg screenshots toe als bijlage ter verduidelijking:';
                    var hrefUrl = 'mailto: ict@onroerenderfgoed.be?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
                    errors[index] = error.replace('ict@onroerenderfgoed.be', "<a href='" + hrefUrl + "' target='_blank'>ict@onroerenderfgoed.be</a>");
                }
            });
            result.response.errors = errors;
            result.response.message = response.content.errors ? response.content.message : 'Er is een fout opgetreden';
        }
        else if (response.statusCode === 0 || response.statusCode === 500) {
            var reg = /^https?:\/\//i;
            var url = response.requestMessage.url;
            if (!reg.test(response.requestMessage.url)) {
                url = response.requestMessage.baseUrl + "/" + url;
            }
            var subject = 'Vraag of fout bij ' + response.requestMessage.url;
            var errorInfo = 'Opgetreden fout: ' + new Date().toString() + ' - ' + response.statusText + ' \n \n';
            var body = errorInfo + 'Gelieve hieronder uw probleem of vraag te omschrijven. Vermeld zeker de genomen stappen en voeg screenshots toe als bijlage ter verduidelijking:';
            var hrefUrl = 'mailto: ict@onroerenderfgoed.be?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            var oeUrl = "<a href='" + hrefUrl + "' target='_blank'>ict@onroerenderfgoed.be</a>";
            result.response.errors = [
                "Er liep iets mis bij het ophalen van " + url + ".<br>\n         Mail naar " + oeUrl + " om dit probleem te melden."
            ];
        }
        else if (response.statusCode === 400) {
            result.response.errors = [
                "Er liep iets mis bij het opslaan van " + response.requestMessage.url
            ];
        }
        return result;
    };
    return MessageParser;
}());
exports.MessageParser = MessageParser;

//# sourceMappingURL=messageParser.js.map
