"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var toastr = require("toastr");
var messageTypes_1 = require("./enums/messageTypes");
var Message = (function () {
    function Message(type, config) {
        this.emitter = toastr;
        this.applyDefaultOptions();
        this.applyOptions(config.emitterOptions);
        var messageElement = this.show(type, config);
        this.applyStyle(messageElement, config.style);
    }
    Message.info = function (config) {
        return new Message(messageTypes_1.messageType.info, config);
    };
    Message.success = function (config) {
        config.emitterOptions = config.emitterOptions || {};
        config.emitterOptions = __assign({ timeOut: 10000, extendedTimeOut: 5000 }, config.emitterOptions);
        return new Message(messageTypes_1.messageType.success, config);
    };
    Message.warning = function (config) {
        return new Message(messageTypes_1.messageType.warning, config);
    };
    Message.error = function (config) {
        config.emitterOptions = config.emitterOptions || {};
        config.emitterOptions = __assign({ timeOut: 0, extendedTimeOut: 0, closeButton: true }, config.emitterOptions);
        return new Message(messageTypes_1.messageType.error, config);
    };
    Message.prototype.show = function (type, config) {
        try {
            var element = this.emitter[type](config.message, config.title);
            return element ? element[0] : undefined;
        }
        catch (e) {
            console.debug('[MESSAGE]: Failed to show message' + e);
        }
    };
    Message.prototype.applyStyle = function (element, styles) {
        try {
            if (element && styles) {
                for (var style in styles) {
                    if (style) {
                        element.style[style] = styles[style];
                    }
                }
            }
        }
        catch (e) {
            console.debug('[MESSAGE]: Failed to apply styles' + e);
        }
    };
    Message.prototype.applyDefaultOptions = function () {
        try {
            var defaultOptions = { preventDuplicates: true, preventOpenDuplicates: true };
            this.applyOptions(defaultOptions);
        }
        catch (e) {
            console.debug('[MESSAGE]: Failed to apply default emitter options' + e);
        }
    };
    Message.prototype.applyOptions = function (options) {
        try {
            for (var option in options) {
                if (options[option] !== undefined) {
                    this.emitter.options[option] = options[option];
                }
            }
        }
        catch (e) {
            console.debug('[MESSAGE]: Failed to apply emitter options' + e);
        }
    };
    return Message;
}());
exports.Message = Message;

//# sourceMappingURL=message.js.map
