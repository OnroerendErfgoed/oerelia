import { DialogController } from 'aurelia-dialog';
import { IKoppelingResponse } from 'exports';
export declare class KoppelingDialog {
    controller: DialogController;
    loading: boolean;
    totalReftekst: string;
    applications: IApplication[];
    constructor(controller: DialogController);
    activate(model: {
        koppelingCall: (id: number) => Promise<IKoppelingResponse>;
        id: number;
    }): Promise<void>;
}
