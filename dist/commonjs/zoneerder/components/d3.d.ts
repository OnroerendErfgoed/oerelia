import { Diffs } from 'zoneerder/models/contour';
export declare function setupD3(container: HTMLElement, data: Diffs, relevanteAfstanden: number[], setRelevanteAfstandFn: CallableFunction): void;
export declare function removeRelevanteAfstandMarker(): void;
export declare function drawNewCircle(targetX: number, data?: any, isPredictionMarker?: boolean, setRelevanteAfstandFn?: CallableFunction): void;
