import * as ol from 'openlayers';

export class Geolocate extends ol.control.Control {
  public options: any;
  public element: Element;
  public button: HTMLButtonElement;
  public geolocation: ol.Geolocation;
  public positionFeature: ol.Feature;

  constructor(optOptions: any) {
    console.debug('Geolocate::constructor', optOptions);
    super(optOptions);
    this.options = optOptions || {};

    const tipLabel = this.options.tipLabel ? this.options.tipLabel : 'Zoom naar je eigen locatie';

    this.element = document.createElement('div');
    this.element.className = 'ol-geolocate ol-control ol-unselectable';

    this.button = document.createElement('button');
    this.button.setAttribute('title', tipLabel);
    this.button.innerHTML = '<i class="fa fa-map-marker"></i>';
    this.element.appendChild(this.button);

    this.geolocation = new ol.Geolocation({
      projection: this.getMap().getView().getProjection(),
      trackingOptions: {
        enableHighAccuracy: true
      }
    });

    this.positionFeature = new ol.Feature();
    this.positionFeature.setStyle(
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 6,
          fill: new ol.style.Fill({
            color: '#3399CC',
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );


    this.button.addEventListener('click', this._zoomToLocation.bind(this), false);

    ol.control.Control.call(this, {
      element: this.element,
      target: this.options.target
    });

    const map = this.getMap();
    const source = new ol.source.Vector({
      features: [this.positionFeature]
    });
    const layer = new ol.layer.Vector({
      source: source
    });
    map.addLayer(layer);
  }

  private _zoomToLocation() {
    console.debug('_zoomToLocation');
    if (!this.geolocation) {
      return;
    }
    const zoomLevel = this.options.zoomLevel;
    const map = this.getMap();
    const view = map.getView();
    this.geolocation.setTracking(true);
    this.geolocation.on('change:position', () => {
      const coordinates = this.geolocation.getPosition();
      view.setCenter(coordinates);
      if (zoomLevel) {
        view.setZoom(zoomLevel);
      }
      this.geolocation.setTracking(false);
      this.positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);

      // const marker = document.getElementById('marker');
      // marker.classList.remove('hide');
      // const overlayId = 'markerOverlay';
      // const overlay = map.getOverlayById(overlayId);
      // if (!overlay) {
      //   map.addOverlay(
      //     new ol.Overlay({
      //       id: overlayId,
      //       position: position,
      //       positioning: 'center-center',
      //       element: marker,
      //       stopEvent: false
      //     })
      //   );
      // } else {
      //   overlay.setPosition(position);
      // }
    });
  }
}
