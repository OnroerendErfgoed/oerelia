import * as ol from 'openlayers';

export class Geolocate extends ol.control.Control {
  public options;
  public element: Element;
  public layer: ol.layer.Vector;

  constructor(optOptions) {
    super(optOptions);
    this.options = optOptions || {};

    const tipLabel = this.options.tipLabel ? this.options.tipLabel : 'Zoom naar je eigen locatie';

    this.element = document.createElement('div');
    this.element.className = 'ol-geolocate ol-control ol-unselectable';

    const button = document.createElement('button');
    button.setAttribute('title', tipLabel);
    button.innerHTML = '<i class="fa fa-map-marker"></i>';
    this.element.appendChild(button);
    button.addEventListener('click', this._zoomToLocation.bind(this), false);

    ol.control.Control.call(this, {
      element: this.element,
      target: this.options.target
    });
  }

  private _zoomToLocation() {
    const map = this.getMap();
    const view = map.getView();
    const zoomLevel = this.options.zoomLevel ? this.options.zoomLevel : 12;

    const source = this.layer ? this.layer.getSource() : this._createLayer(map).getSource();

    console.debug('**** voor', source.getFeatures().length);
    source.clear(true);
    console.debug('**** na', source.getFeatures().length);
    const positionFeature = this._createFeature();

    navigator.geolocation.getCurrentPosition(function(pos) {
      console.debug('**** klik voor', source.getFeatures().length);
      const coordinates = ol.proj.transform(
        [pos.coords.longitude, pos.coords.latitude],
        'EPSG:4326',
        view.getProjection()
      );
      view.setCenter(coordinates);
      view.setZoom(zoomLevel);
      positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
      source.addFeatures([
        positionFeature
      ]);
      console.debug('**** klik na', source.getFeatures().length);
    });
  }

  private _createLayer(map: ol.Map): ol.layer.Vector {
    const source = new ol.source.Vector();
    const layer = new ol.layer.Vector({
      source: source
    });
    map.addLayer(layer);
    return layer;
  }

  private _createFeature(): ol.Feature {
    const feature = new ol.Feature();
    feature.setStyle(
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 6,
          fill: new ol.style.Fill({
            color: '#3399CC'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2
          })
        })
      })
    );
    return feature;
  }
}
