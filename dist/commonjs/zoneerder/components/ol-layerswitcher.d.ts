import * as ol from 'openlayers';
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
    showPanel(): void;
    hidePanel(): void;
    renderPanel(): void;
    setMap(map: any): void;
    ensureTopVisibleBaseLayerShown_(): void;
    setVisible_(lyr: any, visible: boolean): void;
    renderLayer_(lyr: any, idx: any): HTMLLIElement;
    private addLegend;
    renderLayers_(lyr: any, elm: Element): void;
    forEachRecursive(lyr: any, fn: any): void;
}
