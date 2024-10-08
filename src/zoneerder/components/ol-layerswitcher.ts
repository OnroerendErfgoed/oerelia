import * as ol from 'openlayers';
import { Guid } from 'typescript-guid';
import { LayerType } from '../models/layerConfig.enums';

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
    this.button.onclick = () => self.showPanel();
    this.closeButton.onclick = () => self.hidePanel();
    
    ol.control.Control.call(this, {
      element: this.element,
      target: this.options.target
    });
  }
  
  /**
   * Show the layer panel
   */
  public showPanel() {
    this.element.className = this.shownClassName;
    this.isShown = true;
    this.button.style.display = 'none';
    this.closeButton.style.display = 'inline-block';
    this.renderPanel();
  }
  
  /**
   * Hide the layer panel
   */
  public hidePanel() {
    this.element.className = this.hiddenClassName;
    this.isShown = false;
    this.button.style.display = 'inline-block';
    this.closeButton.style.display = 'none';
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
      this.mapListeners.push(
        map.getLayers().on("propertychange", () => this.renderPanel()),
        map.on('pointerdown', () => this.hidePanel())
      );
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
    if (lastVisibleBaseLyr) {
      this.setVisible_(lastVisibleBaseLyr, true);
    }
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
  public renderLayer_(lyr: any) {
    const self = this;
    const id = Guid.create();
    const li = document.createElement('li');
    const lyrTitle = lyr.get('title');
    const lyrId = lyr.get('title').replace(' ', '-') + '_' + id;
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
      
      label.htmlFor = lyrId;
      const title = document.createElement('span');
      title.innerHTML = lyrTitle;
      const row = document.createElement('div');
      row.className = 'row';
      row.appendChild(input);
      row.appendChild(label);
      li.appendChild(row);
      if (lyr.get('showLegend')) {
        this.addLegend(lyr, li, label);
      }
      label.appendChild(title);
    }
    return li;
  }
  
  private addLegend(lyr: ol.layer.Base, li: Element, label: Element) {
    const legendDiv = document.createElement('div');
    if (lyr.get('layerType') === LayerType.Vector) {
      legendDiv.style.backgroundColor = 'white';
      legendDiv.style.width = '14px';
      legendDiv.style.height = '14px';
      legendDiv.style.display = 'inline-block';
      legendDiv.style.verticalAlign = 'sub';
      legendDiv.style.marginRight = '4px';
      const legendGraphic = document.createElement('div');
      const style = lyr.get('style');
      const fillColor = style.fill;
      const strokeColor = style.stroke;
      const strokeStyle = style.lineDash ? 'dashed' : 'solid';
      legendGraphic.style.border = '1px ' + strokeStyle + ' ' + strokeColor;
      legendGraphic.style.height = '100%';
      legendDiv.appendChild(legendGraphic);
      
      if (style.hashed) {
        const diagonal = document.createElement('div');
        const lineLength = Math.sqrt(2) * 100;
        diagonal.style.position = 'absolute'; // Allow precise positioning
        diagonal.style.borderTop = '2px solid ' + fillColor;
        diagonal.style.width = lineLength + '%'; // Extend the line length
        diagonal.style.height = '0'; // Set height to zero for a horizontal line
        diagonal.style.top = '50%'; // Position the line vertically centered
        diagonal.style.left = '50%'; // Position the line horizontally centered
        diagonal.style.transform = 'translate(-50%, -50%) rotate(-45deg)'; // Center and rotate the line
        legendGraphic.style.position = 'relative'; // Ensure the container allows absolute positioning
        legendGraphic.appendChild(diagonal);
      } else {
        legendGraphic.style.backgroundColor = fillColor;
      }
      label.appendChild(legendDiv);
    } else if (lyr.get('legendItems')) {
      const legendRow = document.createElement('div');
      legendRow.className = 'row';
      legendDiv.className = 'large-12 column';
      for (const legendUrl of lyr.get('legendItems')) {
        const legendImage = document.createElement('img');
        legendImage.src = legendUrl;
        legendImage.style.marginLeft = '9px';
        legendDiv.appendChild(legendImage);
      }
      const legendSpan = document.createElement('span');
      legendSpan.appendChild(legendDiv);
      legendRow.appendChild(legendSpan);
      li.appendChild(legendRow);
    }
  }
  
  /**
   * Render all layers that are children of a group.
   * @private
   * @param {ol.layer.Group} lyr Group layer whos children will be rendered.
   * @param {Element} elm DOM element that children will be appended to.
   */
  public renderLayers_(lyr: any, elm: Element) {
    const lyrs = lyr.getLayers().getArray().slice().reverse();
    lyrs.forEach((l) => {
      if (l.get('title')) {
        elm.appendChild(this.renderLayer_(l));
      }
    })
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
