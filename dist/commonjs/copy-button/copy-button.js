"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CopyButton = (function () {
    function CopyButton() {
        this.showCheckIcon = false;
    }
    CopyButton.prototype.copy = function () {
        var text = 'hahahaha';
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
                this.showCheckIcon = true;
                setTimeout(function () {
                    this.showCheckIcon = false;
                }, 2000);
            }, function (err) {
                console.error('Could not copy text: ', err);
            });
        }
        else {
            this.showCheckIcon = true;
            this.IEClipboardCopy(text);
            setTimeout(function () {
                this.showCheckIcon = false;
            }, 2000);
        }
    };
    CopyButton.prototype.IEClipboardCopy = function (text) {
        var input = document.createElement('input');
        input.setAttribute('value', text);
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    };
    return CopyButton;
}());
exports.CopyButton = CopyButton;

//# sourceMappingURL=copy-button.js.map
