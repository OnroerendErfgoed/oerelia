export declare class GeolocationResponse {
    id: string;
    locatie: string;
    type: string;
    boundingbox: Boundingbox;
}
export declare class Boundingbox {
    lowerleft: {
        lat: number;
        lon: number;
    };
    upperright: {
        lat: number;
        lon: number;
    };
}
