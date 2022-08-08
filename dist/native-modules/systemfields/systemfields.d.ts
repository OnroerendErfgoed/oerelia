import { IStatus } from 'models/public-models';
import { ISystemFields } from './models/ISystemFields';
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
