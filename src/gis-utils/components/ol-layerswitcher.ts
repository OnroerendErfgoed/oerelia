import * as ol from 'openlayers';

export class Layerswitcher extends ol.control.Control {
  public element: Element;
  public openButton: HTMLButtonElement;
  public tipLabel: string;
  public panel: LayerswitcherPanel;
  public options: any;

  constructor(optOptions: any) {
    super(optOptions);

    this.options = optOptions || {};
    this.tipLabel = this.options.tipLabel ? this.options.tipLabel : 'Legend';
    this.panel = this.options.panel ? this.options.panel : {};

    this.element = document.createElement('div');
    this.element.className = 'ol-unselectable button-container ol-control layer-switcher';
    this.openButton = document.createElement('button');
    this.openButton.setAttribute('title', this.tipLabel);
    this.openButton.className = 'open-button';
    this.openButton.innerHTML = '<i class="fa fa-map"></i>';
    this.element.appendChild(this.openButton);
    this.panel.openButton = this.openButton;

    this.openButton.onclick = () => {
      if (this.openButton.classList.contains('selected')) {
        this.hide();
      } else {
        this.show();
      }
    };

    ol.control.Control.call(this, {
      element: this.element,
      target: this.options.target
    });
  }

  private show() {
    this.panel.show();
    this.openButton.classList.add('selected');
  }

  private hide() {
    this.panel.hide();
    this.openButton.classList.remove('selected');
  }
}

export class LayerswitcherPanel extends ol.control.Control {
  public element: Element;
  public openButton: HTMLButtonElement;
  public closeButton: HTMLButtonElement;
  public panelTitle: string;
  public mapListeners: any[] = [];
  public options: any;

  constructor(optOptions) {
    super(optOptions);

    this.options = optOptions || {};
    this.panelTitle = this.options.title ? this.options.title : 'Legende';

    this.element = document.createElement('div');
    this.element.className = 'ol-unselectable panel-container ol-control layer-switcher hide';

    ol.control.Control.call(this, {
      element: this.element,
      target: this.options.target
    });
  }

  public show() {
    this.element.classList.remove('hide');
    this.renderPanel();
  }

  public hide() {
    this.element.classList.add('hide');
  }

  /**
   * Cause the panel to be re-draw to represent the current layer state.
   */
  public renderPanel() {
    this.ensureTopVisibleBaseLayerShown_();

    // reset the panel
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }

    const panelTitle = document.createElement('h5');
    panelTitle.className = 'pane-title';
    panelTitle.innerHTML = this.panelTitle;
    this.element.appendChild(panelTitle);

    this.closeButton = document.createElement('button');
    this.closeButton.setAttribute('title', 'Sluiten');
    this.closeButton.className = 'close-button';
    this.closeButton.innerHTML = '<i class="fa fa-remove"></i>';
    this.element.appendChild(this.closeButton);

    this.closeButton.onclick = () => {
      this.hide();
      this.openButton.classList.remove('selected');
    };

    this.element.appendChild(document.createElement('hr'));

    const ul = document.createElement('ul');
    this.element.appendChild(ul);

    this.renderLayers_(this.getMap(), ul);
  }

  /**
   * Set the map instance the control is associated with.
   * @param {ol.Map} map The map instance.
   */
  public setMap(map: any) {
    // Clean up listeners associated with the previous map
    for (const mapListener of this.mapListeners) {
      this.getMap().unset(mapListener);
    }
    this.mapListeners.length = 0;
    // Wire up listeners etc. and store reference to new map
    ol.control.Control.prototype.setMap.call(this, map);
    if (map) {
      this.mapListeners.push(map.on('pointerdown', () => {
        this.hide();
        this.openButton.classList.remove('selected');
      }));
      this.renderPanel();
    }
  }

  /**
   * Ensure only the top-most base layer is visible if more than one is visible
   */
  private ensureTopVisibleBaseLayerShown_() {
    let lastVisibleBaseLyr;
    this.forEachRecursive(this.getMap(), (l: any) => {
      if (l.get('type') === 'base' && l.getVisible()) {
        lastVisibleBaseLyr = l;
      }
    });
    if (lastVisibleBaseLyr) { this.setVisible_(lastVisibleBaseLyr, true); }
  }

  /**
   * Toggle the visible state of a layer.
   * Takes care of hiding other layers in the same exclusive group if the layer
   * is toggle to visible.
   * @private
   * @param {ol.layer.Base} The layer whos visibility will be toggled.
   */
  private setVisible_(lyr: any, visible: boolean) {
    const map = this.getMap();
    lyr.setVisible(visible);
    if (visible && lyr.get('type') === 'base') {
      // Hide all other base layers regardless of grouping
      this.forEachRecursive(map, (l: any) => {
        if (l !== lyr && l.get('type') === 'base') {
          l.setVisible(false);
        }
      });
    }
  }

  /**
   * Render all layers that are children of a group.
   * @private method
   * @param {ol.layer.Base} lyr Layer to be rendered (should have a title property).
   * @param {Number} idx Position in parent group list.
   */
  private renderLayer_(lyr: any, idx: any) {
    const self = this;
    const li = document.createElement('li');
    const lyrTitle = lyr.get('title');
    const lyrId = lyr.get('title').replace(' ', '-') + '_' + idx;
    const label = document.createElement('label');

    if (lyr.getLayers) {
      li.className = 'group';
      label.innerHTML = lyrTitle;
      li.appendChild(label);
      const ul = document.createElement('ul');
      li.appendChild(ul);
      this.renderLayers_(lyr, ul);
    } else {
      const input = document.createElement('input');
      if (lyr.get('type') === 'base') {
        input.type = 'radio';
        input.name = 'base';
      } else {
        input.type = 'checkbox';
      }
      input.id = lyrId;
      input.checked = lyr.get('visible');
      input.onchange = (e) => {
        const check: string = 'checked';
        self.setVisible_(lyr, (e as any).target[check]);
      };
      li.appendChild(input);
      label.htmlFor = lyrId;
      label.innerHTML = lyrTitle;
      li.appendChild(label);

      const legendImages = lyr.get('legendImages');
      if (legendImages && legendImages.length > 0) {
        let container = document.createElement('container');
        container.className = 'legend-container';

        legendImages.forEach(legendImage => {
          const span = document.createElement('span');
          span.className = 'legend-layer';

          const image = document.createElement('img');
          image.className = 'legend-image';
          image.src = legendImage.url;

          span.appendChild(image);

          const titleLabel = document.createElement('label');
          titleLabel.innerHTML = legendImage.title;

          span.appendChild(titleLabel);
          container.appendChild(span);
        })

        li.appendChild(container);
      }
    }
    return li;
  }

  /**
   * Render all layers that are children of a group.
   * @private
   * @param {ol.layer.Group} lyr Group layer whos children will be rendered.
   * @param {Element} elm DOM element that children will be appended to.
   */
  private renderLayers_(lyr: any, elm: Element) {
    const lyrs = lyr.getLayers().getArray().slice().reverse();
    for (let i = 0, l; i < lyrs.length; i++) {
      l = lyrs[i];
      if (l.get('title')) {
        elm.appendChild(this.renderLayer_(l, i));
      }
    }
  }

  /**
   * Call the supplied function for each layer in the passed layer group
   * recursing nested groups.
   * @param {ol.layer.Group} lyr The layer group to start iterating from.
   * @param {Function} fn Callback which will be called for each ol.layer.Base
   * found under lyr. The signature for fn is the same as ol.Collection#forEach
   */
  private forEachRecursive(lyr: any, fn: any) {
    lyr.getLayers().forEach((lyr2: any, idx: any, a: any) => {
      fn(lyr2, idx, a);
      if (lyr2.getLayers) {
        this.forEachRecursive(lyr2, fn);
      }
    }, this);
  }
}
