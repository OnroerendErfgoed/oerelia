import { ISystemFields } from './models/ISystemFields';
import { IStatus } from './models/IStatus';
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
