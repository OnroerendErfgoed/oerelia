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
export { ActorWidget };

//# sourceMappingURL=actor-widget.js.map
