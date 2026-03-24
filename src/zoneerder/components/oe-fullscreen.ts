import Map from 'ol/Map';
import Control from 'ol/control/Control';

interface FullScreenOptions {
  className?: string;
  label?: string;
  tipLabel?: string;
  target?: HTMLElement;
  source?: string | Element;
}

export class OeFullscreen extends Control {
  private readonly options: FullScreenOptions;
  private source: Element;

  constructor(optOptions: FullScreenOptions = {}) {
    const className = optOptions.className || 'full-screen';
    const element = document.createElement('div');
    element.className = `${className} ol-control ol-unselectable`;

    const button = document.createElement('button');
    const tipLabel = optOptions.tipLabel ? optOptions.tipLabel : 'Vergroot / verklein het scherm';
    button.setAttribute('title', tipLabel);
    button.className = 'full-screen-false';
    element.appendChild(button);

    super({
      element,
      target: optOptions.target
    });

    this.options = optOptions || {};

    if (this.options.source instanceof Element) {
      this.source = this.options.source;
    } else if (typeof this.options.source === 'string') {
      this.source = document.getElementById(this.options.source);
    }

    button.addEventListener('click', this.toggleFullscreen.bind(this), false);
  }

  setMap(map: Map) {
    super.setMap(map);
    if (!this.fullscreenSupported()) {
      return;
    }
    const source = this.source || map.getTargetElement();
    source.addEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
  }

  private isFullScreen() {
    return !!(
      document['webkitIsFullScreen'] || document['mozFullScreen'] ||
      document['msFullscreenElement'] || document.fullscreenElement
    );
  }

  private handleFullscreenChange() {
    const button = this.element.firstElementChild as HTMLElement;
    if (!this.isFullScreen()) {
      button.className = 'full-screen-false';
    } else if (button.className === 'full-screen-false') {
      button.className = 'full-screen-true';
    } else {
      button.className = 'full-screen-false';
    }
  }

  private toggleFullscreen() {
    const button = this.element.firstElementChild as HTMLElement;
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
    const map = this.getMap();
    if (!map) {
      return;
    }
    const target = this.source || map.getTargetElement();
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
}
