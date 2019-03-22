import * as ol from 'openlayers';
/**
 * VERY EXPERIMENTAL!
 * JS Openlayers 3+ layerswitcher with TS compatibilty, but not in TS!
 * Should be refactored to full TS/Aurelia support, tslint is fine.
 */
export declare class Layerswitcher extends ol.control.Control {
    panel: HTMLDivElement;
    closeButton: HTMLButtonElement;
    button: HTMLButtonElement;
    shownClassName: string;
    hiddenClassName: string;
    mapListeners: any[];
    isShown: boolean;
    tipLabel: string;
    panelTitle: string;
    element: Element;
    options: any;
    constructor(optOptions: any);
    /**
     * Show the layer panel
     */
    showPanel(): void;
    /**
     * Hide the layer panel
     */
    hidePanel(): void;
    /**
     * Cause the panel to be re-draw to represent the current layer state.
     */
    renderPanel(): void;
    /**
     * Set the map instance the control is associated with.
     * @param {ol.Map} map The map instance.
     */
    setMap(map: any): void;
    /**
     * Ensure only the top-most base layer is visible if more than one is visible
     */
    ensureTopVisibleBaseLayerShown_(): void;
    /**
     * Toggle the visible state of a layer.
     * Takes care of hiding other layers in the same exclusive group if the layer
     * is toggle to visible.
     * @private
     * @param {ol.layer.Base} The layer whos visibility will be toggled.
     */
    setVisible_(lyr: any, visible: boolean): void;
    /**
     * Render all layers that are children of a group.
     * @private method
     * @param {ol.layer.Base} lyr Layer to be rendered (should have a title property).
     * @param {Number} idx Position in parent group list.
     */
    renderLayer_(lyr: any, idx: any): HTMLLIElement;
    /**
     * Render all layers that are children of a group.
     * @private
     * @param {ol.layer.Group} lyr Group layer whos children will be rendered.
     * @param {Element} elm DOM element that children will be appended to.
     */
    renderLayers_(lyr: any, elm: Element): void;
    /**
     * Call the supplied function for each layer in the passed layer group
     * recursing nested groups.
     * @param {ol.layer.Group} lyr The layer group to start iterating from.
     * @param {Function} fn Callback which will be called for each ol.layer.Base
     * found under lyr. The signature for fn is the same as ol.Collection#forEach
     */
    forEachRecursive(lyr: any, fn: any): void;
}
