import { DialogController } from 'aurelia-dialog';
export declare class KoppelingDialog {
    controller: DialogController;
    loading: boolean;
    totalReftekst: string;
    applications: IApplication[];
    isExtern: boolean;
    constructor(controller: DialogController);
    activate(model: {
        koppelingCall: (id: number) => Promise<IKoppelingResponse>;
        id: number;
        isExtern: boolean;
    }): Promise<void>;
}
