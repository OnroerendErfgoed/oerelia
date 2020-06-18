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
export { ActorWidget };

//# sourceMappingURL=actor-widget.js.map
