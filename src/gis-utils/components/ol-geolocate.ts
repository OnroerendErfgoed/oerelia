import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { transform } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import OlControl from 'ol/control/Control';

export class Geolocate extends OlControl {
  public options;
  public layer: VectorLayer<VectorSource>;
  private map: Map;
  private watchId = null;

  constructor(optOptions) {
    const options = optOptions || {};
    const element = document.createElement('div');
    element.className = 'ol-geolocate ol-control ol-unselectable';

    const button = document.createElement('button');
    const tipLabel = options.tipLabel ? options.tipLabel : 'Zoom naar je eigen locatie';
    button.setAttribute('title', tipLabel);
    button.innerHTML = '<i class="fa fa-map-marker"></i>';
    element.appendChild(button);

    super({
      element,
      target: options.target
    });

    this.options = options;
    button.addEventListener('click', this._zoomToLocation.bind(this), false);
  }

  public setMap(map: Map) {
    super.setMap(map);
    this.map = map;
  }

  private _zoomToLocation() {
    const map = this.map;
    if (!map) {
      return;
    }
    const view = map.getView();

    if(!this.layer) {
      this.layer = this._createLayer(map);
    }
    const source = this.layer.getSource();
    const positionFeature = this._createFeature();

    const self = this;

    if (this.options.geolocateTracking) {
      if (this.watchId) {
        navigator.geolocation.clearWatch(this.watchId);
        source.clear(true);
        this.watchId = null;
      } else {
        this.watchId =  navigator.geolocation.watchPosition(function(pos) {
          self._addPositionFeature(pos, view, source, positionFeature);
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: true
        });
      }
    } else {
      navigator.geolocation.getCurrentPosition(function(pos) {
        self._addPositionFeature(pos, view, source, positionFeature);
      });
    }
  }

  private _createLayer(map: Map): VectorLayer<VectorSource> {
    const source = new VectorSource();
    const layer = new VectorLayer({
      source: source
    });
    map.addLayer(layer);
    return layer;
  }

  private _createFeature(): Feature {
    const feature = new Feature();
    feature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC'
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2
          })
        })
      })
    );
    return feature;
  }

  private _addPositionFeature(pos, view, source, positionFeature) {
    const zoomLevel = this.options.zoomLevel ? this.options.zoomLevel : 12;
    const coordinates = transform(
      [pos.coords.longitude, pos.coords.latitude],
      'EPSG:4326',
      view.getProjection()
    )

    view.setCenter(coordinates);
    view.setZoom(zoomLevel);
    positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
    source.clear(true);
    source.addFeatures([
      positionFeature
    ]);
  }
}
