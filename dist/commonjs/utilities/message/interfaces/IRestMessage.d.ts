import { IMessage } from './IMessage';
import { IRestResult } from './IRestResult';
export interface IRestMessage {
    result: IRestResult;
    success?: IMessage;
    customErrors?: [
        {
            condition: boolean;
            error: IMessage;
        }
    ];
}
