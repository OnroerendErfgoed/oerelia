import * as ol from 'openlayers';
import { olx } from 'openlayers';
import FullScreenOptions = olx.control.FullScreenOptions;
export declare class OeFullscreen extends ol.control.Control {
    options: any;
    element: Element;
    layer: ol.layer.Vector;
    private watchId;
    private source;
    private changeType;
    constructor(optOptions: FullScreenOptions);
    setMap(map: ol.Map): void;
    private isFullScreen;
    private handleFullscreenChange;
    private toggleFullscreen;
    private fullscreenSupported;
    private openFullscreen;
    private closeFullscreen;
    private getChangeType;
}
