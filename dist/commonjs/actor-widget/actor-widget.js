"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorWidget = (function () {
    function ActorWidget() {
        this.showActor = false;
        this.showFilters = false;
        this.showTable = true;
    }
    ActorWidget.prototype.toggleFilters = function (activate) {
        this.showTable = !activate;
        this.showActor = false;
        this.showFilters = activate;
    };
    return ActorWidget;
}());
exports.ActorWidget = ActorWidget;

//# sourceMappingURL=actor-widget.js.map
