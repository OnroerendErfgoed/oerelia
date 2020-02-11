import * as toastr from 'toastr';
import { messageType } from './enums/messageTypes';
import { IMessage } from './interfaces/IMessage';
import { IMessageEmitterOptions } from './interfaces/IMessageEmitterOptions';
import { IMessageStyle } from './interfaces/IMessageStyle';

export class Message {

  public static info(config: IMessage): Message {
    return new Message(messageType.info, config);
  }

  public static success(config: IMessage): Message {
    config.emitterOptions = config.emitterOptions || {};
    config.emitterOptions = { timeOut: 10000, extendedTimeOut: 5000, ...config.emitterOptions };
    return new Message(messageType.success, config);
  }

  public static warning(config: IMessage): Message {
    return new Message(messageType.warning, config);
  }

  public static error(config: IMessage): Message {
    config.emitterOptions = config.emitterOptions || {};
    config.emitterOptions = { timeOut: 0, extendedTimeOut: 0, closeButton: true, ...config.emitterOptions };
    return new Message(messageType.error, config);
  }

  private emitter: any = toastr;

  private constructor(type: messageType, config: IMessage) {
    this.applyDefaultOptions();
    this.applyOptions(config.emitterOptions);
    const messageElement = this.show(type, config);
    this.applyStyle(messageElement, config.style);
  }

  private show(type: messageType, config: IMessage): HTMLElement {
    try {
      const element = this.emitter[type](config.message, config.title);
      return element ? element[0] : undefined;
    } catch (e) {
      console.debug('[MESSAGE]: Failed to show message' + e);
    }
  }

  private applyStyle(element: HTMLElement, styles: IMessageStyle) {
    try {
      if (element && styles) {
        for (const style in styles) {
          if (style) { element.style[style] = styles[style]; }
        }
      }
    } catch (e) { console.debug('[MESSAGE]: Failed to apply styles' + e); }
  }

  private applyDefaultOptions() {
    try {
      const defaultOptions = { preventDuplicates: true, preventOpenDuplicates: true };
      this.applyOptions(defaultOptions);
    } catch (e) { console.debug('[MESSAGE]: Failed to apply default emitter options' + e); }
  }

  private applyOptions(options: IMessageEmitterOptions) {
    try {
      for (const option in options) {
        if (options[option] !== undefined) { this.emitter.options[option] = options[option]; }
      }
    } catch (e) { console.debug('[MESSAGE]: Failed to apply emitter options' + e); }
  }
}
