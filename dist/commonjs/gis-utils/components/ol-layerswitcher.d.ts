import * as ol from 'openlayers';
export declare class Layerswitcher extends ol.control.Control {
    element: Element;
    openButton: HTMLButtonElement;
    tipLabel: string;
    panel: LayerswitcherPanel;
    options: any;
    constructor(optOptions: any);
    private show;
    private hide;
}
export declare class LayerswitcherPanel extends ol.control.Control {
    element: Element;
    openButton: HTMLButtonElement;
    closeButton: HTMLButtonElement;
    panelTitle: string;
    mapListeners: any[];
    options: any;
    constructor(optOptions: any);
    show(): void;
    hide(): void;
    renderPanel(): void;
    setMap(map: any): void;
    private ensureTopVisibleBaseLayerShown_;
    private setVisible_;
    private renderLayer_;
    private renderLayers_;
    private forEachRecursive;
}
