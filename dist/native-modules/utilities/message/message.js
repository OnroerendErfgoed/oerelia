import * as toastr from 'toastr';
import { messageType } from './enums/messageTypes';
var Message = (function () {
    function Message(type, config) {
        this.emitter = toastr;
        this.applyDefaultOptions();
        this.applyOptions(config.emitterOptions);
        var messageElement = this.show(type, config);
        this.applyStyle(messageElement, config.style);
    }
    Message.info = function (config) {
        return new Message(messageType.info, config);
    };
    Message.success = function (config) {
        config.emitterOptions = { timeOut: 10000, extendedTimeOut: 5000 };
        return new Message(messageType.success, config);
    };
    Message.warning = function (config) {
        return new Message(messageType.warning, config);
    };
    Message.error = function (config) {
        config.emitterOptions = { timeOut: 0, extendedTimeOut: 0, closeButton: true };
        return new Message(messageType.error, config);
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
export { Message };
