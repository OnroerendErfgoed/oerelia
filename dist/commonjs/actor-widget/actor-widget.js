"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorWidget = (function () {
    function ActorWidget() {
        this.showActor = false;
        this.showFilters = false;
        this.showTable = true;
        this.isAdvancedSearch = false;
    }
    ActorWidget.prototype.toggleFilters = function (activate) {
        this.showTable = !activate;
        this.showActor = false;
        this.showFilters = activate;
    };
    ActorWidget.prototype.advancedSearch = function () {
        this.isAdvancedSearch = true;
        this.showFilters = false;
        this.showTable = true;
    };
    return ActorWidget;
}());
exports.ActorWidget = ActorWidget;

//# sourceMappingURL=actor-widget.js.map
