import { IMessage } from './interfaces/IMessage';
export declare class Message {
    readonly defaults: {
        emitterOptions: {
            timeOut: number;
            extendedTimeOut: number;
        };
        preventDuplicates: boolean;
        preventOpenDuplicates: boolean;
    };
    static info(config: IMessage): Message;
    static success(config: IMessage): Message;
    static warning(config: IMessage): Message;
    static error(config: IMessage): Message;
    private emitter;
    private constructor();
    private show;
    private applyStyle;
}
