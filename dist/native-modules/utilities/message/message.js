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
import * as toastr from 'toastr';
import { messageType } from './enums/messageTypes';
var Message = (function () {
    function Message(type, config) {
        this.defaults = {
            emitterOptions: {
                timeOut: 1000,
                extendedTimeOut: 0,
            },
            preventDuplicates: true,
            preventOpenDuplicates: true
        };
        this.emitter = toastr;
        config = __assign(__assign(__assign({}, this.defaults), config), { emitterOptions: __assign(__assign({}, this.defaults.emitterOptions), (config.emitterOptions || {})) });
        var messageElement = this.show(type, config);
        this.applyStyle(messageElement, config.style);
    }
    Message.info = function (config) {
        return new Message(messageType.info, config);
    };
    Message.success = function (config) {
        return new Message(messageType.success, config);
    };
    Message.warning = function (config) {
        return new Message(messageType.warning, config);
    };
    Message.error = function (config) {
        config.emitterOptions = config.emitterOptions || {};
        config.emitterOptions = __assign({ closeButton: true }, config.emitterOptions);
        return new Message(messageType.error, config);
    };
    Message.prototype.show = function (type, config) {
        try {
            var element = this.emitter[type](config.message, config.title, config.emitterOptions);
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
    return Message;
}());
export { Message };

//# sourceMappingURL=message.js.map
