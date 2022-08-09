import { IStatus, ISystemFields } from 'models/public-models';
export declare class Systemfields {
    systemfields: ISystemFields;
    status: IStatus;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    formatDate(date: any): string;
    attached(): void;
}
