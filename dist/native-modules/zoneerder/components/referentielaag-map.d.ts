import { Contour } from '../models/contour';
import { BaseMap } from './base-map';
export declare class ReferentieLaagMap extends BaseMap {
    zone: Contour;
    constructor();
    attached(): void;
}
