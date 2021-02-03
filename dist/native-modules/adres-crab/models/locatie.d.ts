export declare class Adres {
    id: number;
    land: string;
    gemeente: Gemeente;
    postcode: Postcode;
    straat: Straat;
    huisnummer: Huisnummer;
    subadres: string;
}
export declare class Gemeente {
    id: number;
    naam: string;
    niscode?: number;
}
export declare class Postcode {
    id: number;
    naam: string;
    constructor(id: number, naam: string);
}
export declare class Straat {
    id: number;
    naam: string;
}
export declare class Huisnummer {
    id: number;
    naam: string;
    constructor(id: number, naam: string);
}
