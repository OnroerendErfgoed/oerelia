import { IMessageEmitterOptions } from './IMessageEmitterOptions';
import { IMessageStyle } from './IMessageStyle';

export interface IMessage {
  message: string;
  title: string;
  style?: IMessageStyle;
  emitterOptions?: IMessageEmitterOptions;
}
