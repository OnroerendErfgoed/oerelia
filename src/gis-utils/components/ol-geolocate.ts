import * as ol from 'openlayers';

export class Geolocate extends ol.control.Control {
  public options: any;
  public element: Element;
  public button: HTMLButtonElement;
  public geolocation: ol.Geolocation;

  constructor(optOptions: any) {
    console.debug('Draw::constructor', optOptions);
    super(optOptions);
    this.options = optOptions || {};

    const tipLabel = this.options.tipLabel ? this.options.tipLabel : 'Zoom naar je eigen locatie';

    this.element = document.createElement('div');
    this.element.className = 'ol-geolocate ol-control ol-unselectable';

    this.button = document.createElement('button');
    this.button.setAttribute('title', tipLabel);
    this.element.className = 'ol-control';
    this.button.innerHTML = '<i class="fa fa-map-marker"></i>';
    this.element.appendChild(this.button);

    this.geolocation = new ol.Geolocation({
      projection: this.options.projection,
      trackingOptions: {
        enableHighAccuracy: true
      }
    });
    //
    // this.button.onclick = () => {
    //   this._zoomToLocation();
    // };

    ol.control.Control.call(this, {
      element: this.element,
      target: this.options.target
    });
  }

  click() {
      console.debug('click');
      console.debug(this.getMap());
  }

  private _zoomToLocation() {
    if (!this.geolocation) {
      return;
    }
    const zoomLevel = this.options.zoomLevel;
    const map = this.getMap();
    const view = map.getView();
    this.geolocation.setTracking(true);
    this.geolocation.once('change:position', () => {
      const position = this.geolocation.getPosition();
      view.setCenter(position);
      if (zoomLevel) {
        view.setZoom(zoomLevel);
      }
      this.geolocation.setTracking(false);

      const marker = document.getElementById('marker');
      marker.classList.remove('hide');
      const overlayId = 'markerOverlay';
      const overlay = map.getOverlayById(overlayId);
      if (!overlay) {
        map.addOverlay(
          new ol.Overlay({
            id: overlayId,
            position: position,
            positioning: 'center-center',
            element: marker,
            stopEvent: false
          })
        );
      } else {
        overlay.setPosition(position);
      }
    });
  }
}
