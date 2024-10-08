var MessageParser = (function () {
    function MessageParser() {
    }
    MessageParser.parseHttpResponseMessage = function (response) {
        var result;
        result = {
            requestMessage: {
                url: response.requestMessage.url,
                method: response.requestMessage.method
            },
            code: response.statusCode,
            response: {
                errors: []
            }
        };
        var reg = /^https?:\/\//i;
        var customMessage = 'Er is een fout opgetreden';
        var url = response.requestMessage.url;
        if (url.includes('beeldbank.onroerenderfgoed.be')) {
            customMessage = 'Er is een fout opgetreden - Aanvraag tot informatie bij Beeldbank mislukt';
        }
        if (!reg.test(response.requestMessage.url)) {
            url = "".concat(response.requestMessage.baseUrl, "/").concat(url);
        }
        if (response.statusCode === 401 || response.statusCode === 403) {
            result.response.message = "Niet bevoegd (".concat(response.statusCode, ")");
            result.response.errors = [
                "U hebt niet voldoende rechten om deze data op te halen: ".concat(url)
            ];
        }
        else if (response.statusCode === 412) {
            result.response.message = customMessage;
            result.response.errors = [
                'Het was niet mogelijk om de wijzigingen aan deze fiche op te slaan omdat sinds het opvragen ' +
                    'van dit object een andere gebruiker deze fiche heeft gewijzigd.'
            ];
        }
        else if (response.content.errors || response.content.message) {
            var errors_1 = response.content.errors || [response.content.message];
            errors_1.forEach(function (error, index) {
                if (error.indexOf('ict@onroerenderfgoed.be') !== -1) {
                    var subject = 'Vraag of fout bij ' + response.requestMessage.url;
                    var errorInfo = 'Opgetreden fout: ' + new Date().toString() + ' - ' + response.statusText + ' \n \n';
                    var body = errorInfo + 'Gelieve hieronder uw probleem of vraag te omschrijven. Vermeld zeker de genomen stappen en voeg screenshots toe als bijlage ter verduidelijking:';
                    var hrefUrl = 'mailto: ict@onroerenderfgoed.be?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
                    errors_1[index] = error.replace('ict@onroerenderfgoed.be', "<a href='" + hrefUrl + "' target='_blank'>ict@onroerenderfgoed.be</a>");
                }
            });
            result.response.errors = errors_1;
            result.response.message = response.content.errors ? response.content.message : customMessage;
        }
        else if (response.statusCode === 0 || response.statusCode === 500) {
            var subject = 'Vraag of fout bij ' + response.requestMessage.url;
            var errorInfo = 'Opgetreden fout: ' + new Date().toString() + ' - ' + response.statusText + ' \n \n';
            var body = errorInfo + 'Gelieve hieronder uw probleem of vraag te omschrijven. Vermeld zeker de genomen stappen en voeg screenshots toe als bijlage ter verduidelijking:';
            var hrefUrl = 'mailto: ict@onroerenderfgoed.be?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            var oeUrl = "<a href='" + hrefUrl + "' target='_blank'>ict@onroerenderfgoed.be</a>";
            result.response.errors = [
                "Er liep iets mis bij het ophalen van ".concat(url, ".<br>\n         Mail naar ").concat(oeUrl, " om dit probleem te melden.")
            ];
        }
        else if (response.statusCode === 400) {
            result.response.errors = [
                "Fout bij valideren van ".concat(response.requestMessage.url, " (statuscode: 400)")
            ];
        }
        return result;
    };
    return MessageParser;
}());
export { MessageParser };

//# sourceMappingURL=messageParser.js.map
