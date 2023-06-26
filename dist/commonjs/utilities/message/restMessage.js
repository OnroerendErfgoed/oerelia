"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_1 = require("./message");
var RestMessage = (function () {
    function RestMessage(config) {
        var _this = this;
        this.restSuccess = true;
        this.customErrorFailed = false;
        this.restSuccess = String(config.result.code).startsWith('2');
        if (config.customErrors) {
            config.customErrors.forEach(function (message) {
                if (message.condition) {
                    _this.customErrorFailed = true;
                    _this.customError(message.error);
                }
            });
            if (this.customErrorFailed) {
                return;
            }
        }
        if (this.restSuccess && !this.customErrorFailed) {
            message_1.Message.success(config.success);
        }
        else {
            this.error(config.result);
        }
    }
    RestMessage.display = function (config) {
        return new RestMessage(config);
    };
    RestMessage.prototype.error = function (result) {
        var message = { title: result.response.message, message: '' };
        if (result.response.errors.length > 1) {
            result.response.errors.forEach(function (error) {
                message.message += "<li>" + error + "</li>";
            });
            message.message = "<ul>" + message.message + "</ul>";
        }
        else if (result.response.errors.length === 1) {
            message.message = result.response.errors[0] === message.title ? '' : result.response.errors[0];
        }
        else {
            message.message = "Er is iets mis gelopen:<br>" +
                ("<b>method:</b> " + result.requestMessage.method + "<br>") +
                ("<b>url:</b> " + result.requestMessage.url + "<br>") +
                ("<b>code:</b> " + result.code + "<br>");
        }
        return message_1.Message.error(message);
    };
    RestMessage.prototype.customError = function (config) {
        return message_1.Message.error(config);
    };
    return RestMessage;
}());
exports.RestMessage = RestMessage;

//# sourceMappingURL=restMessage.js.map
