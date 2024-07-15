import * as ol from 'openlayers';
import { LayerType } from '../models/layerConfig.enums';

/**
 * VERY EXPERIMENTAL!
 * JS Openlayers 3+ layerswitcher with TS compatibilty, but not in TS!
 * Should be refactored to full TS/Aurelia support, tslint is fine.
 */
export class Layerswitcher extends ol.control.Control {
  public panel: HTMLDivElement;
  public closeButton: HTMLButtonElement;
  public button: HTMLButtonElement;
  public shownClassName: string;
  public hiddenClassName: string;
  public mapListeners: any[];
  public isShown: boolean = false;
  public tipLabel: string;
  public panelTitle: string;
  public element: Element;
  public options: any;

  constructor(optOptions: any) {
    super(optOptions);
    this.options = optOptions || {};

    this.tipLabel = this.options.tipLabel ?
      this.options.tipLabel : 'Legend';

    this.panelTitle = this.options.title ?
      this.options.title : 'Basic Layers';

    this.mapListeners = [];

    this.hiddenClassName = 'ol-unselectable ol-control layer-switcher';
    this.shownClassName = this.hiddenClassName + ' shown';

    this.hiddenClassName = 'ol-unselectable ol-control layer-switcher';
    this.shownClassName = this.hiddenClassName + ' shown';

    this.element = document.createElement('div');
    this.element.className = this.hiddenClassName;

    this.button = document.createElement('button');
    this.button.setAttribute('title', this.tipLabel);
    this.button.innerHTML = '<i class="fa fa-map"></i>';
    this.element.appendChild(this.button);

    this.closeButton = document.createElement('button');
    this.closeButton.setAttribute('title', 'Sluiten');
    this.closeButton.style.display = 'none';
    this.closeButton.innerHTML = '<i class="fa fa-remove"></i>';
    this.element.appendChild(this.closeButton);
    this.panel = document.createElement('div');
    this.panel.className = 'panel';
    this.element.appendChild(this.panel);

    const self = this;

    this.button.onclick = () => {
      self.showPanel();
      self.isShown = true;
      self.button.style.display = 'none';
      self.closeButton.style.display = 'inline-block';
    };

    this.closeButton.onclick = () => {
      self.hidePanel();
      self.isShown = false;
      self.button.style.display = 'inline-block';
      self.closeButton.style.display = 'none';
    };

    ol.control.Control.call(this, {
      element: this.element,
      target: this.options.target
    });
  }

  /**
   * Show the layer panel
   */
  public showPanel() {
    if (this.element.className !== this.shownClassName) {
      this.element.className = this.shownClassName;
      this.renderPanel();
    }
  }

  /**
   * Hide the layer panel
   */
  public hidePanel() {
    if (this.element.className !== this.hiddenClassName) {
      this.element.className = this.hiddenClassName;
    }
  }

  /**
   * Cause the panel to be re-draw to represent the current layer state.
   */
  public renderPanel() {
    this.ensureTopVisibleBaseLayerShown_();

    while (this.panel.firstChild) {
      this.panel.removeChild(this.panel.firstChild);
    }


    const p = document.createElement('p');
    p.innerHTML = this.panelTitle;
    this.panel.appendChild(p);
    const ul = document.createElement('ul');
    this.panel.appendChild(ul);
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
        this.hidePanel();
        this.button.style.display = 'inline-block';
        this.closeButton.style.display = 'none';
      }));
      this.renderPanel();
    }
  }

  /**
   * Ensure only the top-most base layer is visible if more than one is visible
   */
  public ensureTopVisibleBaseLayerShown_() {
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
  public setVisible_(lyr: any, visible: boolean) {
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
  public renderLayer_(lyr: any, idx:any) {
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
      
      const row = document.createElement('div')
      row.className = 'row';
      const div1 = document.createElement('div');
      div1.className = 'large-10 column';
      
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

      label.htmlFor = lyrId;
      label.innerHTML = lyrTitle;
      div1.appendChild(input);
      div1.appendChild(label);
      row.appendChild(div1);
      
      if (lyr.get('showLegend')) {
        row.appendChild(this.createLegend(lyr));
      }
      
      li.appendChild(row);
    }
    return li;
  }
  
  private createLegend(lyr: ol.layer.Base) {
    const legendDiv = document.createElement('div');
    legendDiv.className = 'large-2 column';
    
    if (lyr.get('layerType') === LayerType.Vector) {
      const style = lyr.get('style');
      const fill = style.fill;
      const stroke = style.stroke;
      legendDiv.style.width = '20px';
      legendDiv.style.height = '20px';
      legendDiv.style.backgroundColor = fill;
      legendDiv.style.border = '1px solid ' + stroke;
    } else if (lyr.get('legendItems')) {
      legendDiv.className = 'large-12 column';
      for (const legendUrl of lyr.get('legendItems')) {
        const legendImage = document.createElement('img');
        legendImage.src = legendUrl;
        legendImage.style.cssFloat = 'right';
        legendDiv.appendChild(legendImage);
      }
    }
    return legendDiv;
  }

  /**
   * Render all layers that are children of a group.
   * @private
   * @param {ol.layer.Group} lyr Group layer whos children will be rendered.
   * @param {Element} elm DOM element that children will be appended to.
   */
  public renderLayers_(lyr: any, elm: Element) {
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
  public forEachRecursive(lyr: any, fn: any) {
    lyr.getLayers().forEach((lyr2: any, idx: any, a: any) => {
      fn(lyr2, idx, a);
      if (lyr2.getLayers) {
        this.forEachRecursive(lyr2, fn);
      }
    }, this);
  }
}
