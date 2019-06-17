var Contour = (function () {
    function Contour(c) {
        if (c) {
            this.coordinates = c.coordinates;
            this.crs = c.crs;
            this.type = c.type;
        }
    }
    return Contour;
}());
export { Contour };
