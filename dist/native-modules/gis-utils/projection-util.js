var ProjectionUtil = (function () {
    function ProjectionUtil() {
    }
    ProjectionUtil.defineLambert72 = function (proj4Object) {
        proj4Object.defs('EPSG:31370', '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 ' +
            '+lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl ' +
            '+towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs');
        proj4Object.defs('urn:ogc:def:crs:EPSG::31370', proj4Object.defs('EPSG:31370'));
        proj4Object.defs('urn:ogc:def:crs:EPSG:6.9:31370', proj4Object.defs('EPSG:31370'));
        proj4Object.defs('urn:x-ogc:def:crs:EPSG:31370', proj4Object.defs('EPSG:31370'));
        proj4Object.defs('http://www.opengis.net/gml/srs/epsg.xml#31370', proj4Object.defs('EPSG:31370'));
    };
    ProjectionUtil.defineWgs84 = function (proj4Object) {
        proj4Object.defs('EPSG:3812', '+proj=lcc +lat_1=49.83333333333334 +lat_2=51.16666666666666 ' +
            '+lat_0=50.797815 +lon_0=4.359215833333333 +x_0=649328 +y_0=665262 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 ' +
            '+units=m +no_defs');
    };
    return ProjectionUtil;
}());
export { ProjectionUtil };
