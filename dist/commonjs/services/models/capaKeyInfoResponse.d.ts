export declare class CapaKeyInfoResponse {
    percid: string;
    sectie: CapaKeySection;
    capakey: string;
}
export declare class CapaKeySection {
    afdeling: CapaKeyAfdeling;
    id: number;
}
export declare class CapaKeyAfdeling {
    naam: string;
    id: number;
    gemeente: CapaKeyGemeente;
}
export declare class CapaKeyGemeente {
    naam: string;
    id: number;
}
