import { IRestMessage } from './interfaces/IRestMessage';
export declare class RestMessage {
    static display(config: IRestMessage): RestMessage;
    private restSuccess;
    private customErrorFailed;
    private constructor();
    private error;
    private customError;
}
