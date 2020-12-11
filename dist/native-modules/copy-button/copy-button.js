var CopyButton = (function () {
    function CopyButton() {
        this.showCheckIcon = false;
    }
    CopyButton.prototype.copy = function () {
        var text = 'gekopieerde tekst';
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
                this.showCheckIcon = true;
                this.hideCheckIcon();
            }.bind(this));
        }
        else {
            this.showCheckIcon = true;
            this.IEClipboardCopy(text);
            this.hideCheckIcon();
        }
    };
    CopyButton.prototype.hideCheckIcon = function () {
        setTimeout(function () {
            this.showCheckIcon = false;
        }.bind(this), 20000);
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
export { CopyButton };

//# sourceMappingURL=copy-button.js.map
