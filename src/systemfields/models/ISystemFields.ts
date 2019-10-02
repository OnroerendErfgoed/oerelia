import { ISystemActor } from './ISystemActor';

export interface ISystemFields {
    created_at: string;
    updated_at: string;
    created_by: ISystemActor;
    updated_by: ISystemActor;
}
