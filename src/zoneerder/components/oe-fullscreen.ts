import * as ol from 'openlayers';
import { olx } from 'openlayers';
import FullScreenOptions = olx.control.FullScreenOptions;

export class OeFullscreen extends ol.control.Control {
  public options: FullScreenOptions;
  public element: Element;
  public layer: ol.layer.Vector;
  private watchId = null;
  private source: Element;
  private changeType: string;

  constructor(optOptions: FullScreenOptions) {
    super(optOptions);
    this.options = optOptions || {};

    const tipLabel = this.options.tipLabel ? this.options.tipLabel : 'Vergroot / verklein het scherm';

    const className = this.options.className || 'full-screen';
    this.element = document.createElement('div');
    this.element.className = `${className} ol-control ol-unselectable`;

    if (this.options.source instanceof Element) {
      this.source = this.options.source;
    } else {
      this.source = document.getElementById(this.options.source);
    }

    const button = document.createElement('button');
    button.setAttribute('title', tipLabel);
    button.className = 'full-screen-false';
    button.addEventListener('click', this.toggleFullscreen.bind(this), false);
    this.element.appendChild(button);

    ol.control.Control.call(this, {
      element: this.element,
      target: this.options.target
    });
  }

  setMap(map: ol.Map) {
    super.setMap(map);
    if (!this.fullscreenSupported()) {
      return;
    }
    const source = this.source || this.getMap().getTargetElement();
    source.addEventListener("fullscreenchange", this.handleFullscreenChange.bind(this));
  }

  private isFullScreen() {
    return !!(
      document['webkitIsFullScreen'] || document['mozFullScreen'] ||
      document['msFullscreenElement'] || document.fullscreenElement
    );
  }

  private handleFullscreenChange() {
    const button = this.element.firstElementChild;
    if (!this.isFullScreen()) {
      button.className = 'full-screen-false';
    } else if (button.className === 'full-screen-false') {
      button.className = 'full-screen-true';
    } else {
      button.className = 'full-screen-false';
    }
  }

  private toggleFullscreen() {
    const button = this.element.firstElementChild;
    button.className === 'full-screen-false' ? this.openFullscreen() : this.closeFullscreen();
  }

  private fullscreenSupported() {
    const body = document.body;
    return body['webkitRequestFullscreen'] ||
      (body['mozRequestFullScreen'] && document['mozFullScreenEnabled']) ||
      (body['msRequestFullscreen'] && document['msFullscreenEnabled']) ||
      (body.requestFullscreen && document.fullscreenEnabled)
  }

  private openFullscreen() {
    const target = this.source || this.getMap().getTargetElement();
    if (target.requestFullscreen) {
      void target.requestFullscreen();
    } else if (target['webkitRequestFullscreen']) { /* Safari */
      target['webkitRequestFullscreen']();
    } else if (target['msRequestFullscreen']) { /* IE11 */
      target['msRequestFullscreen']();
    }
  }

  private closeFullscreen() {
    if (document.exitFullscreen) {
      void document.exitFullscreen();
    } else if (document['webkitExitFullscreen']) { /* Safari */
      document['webkitExitFullscreen']();
    } else if (document['msExitFullscreen']) { /* IE11 */
      document['msExitFullscreen']();
    }
  }

  private getChangeType() {
    if (this.changeType) {
      return this.changeType;
    }
    const body = document.body;
    if (body['webkitRequestFullscreen']) {
      this.changeType = 'webkitfullscreenchange';
    } else if (body['mozRequestFullScreen']) {
      this.changeType = 'mozfullscreenchange';
    } else if (body['msRequestFullscreen']) {
      this.changeType = 'MSFullscreenChange';
    } else if (body.requestFullscreen) {
      this.changeType = 'fullscreenchange';
    }
    return this.changeType;
  }
}
