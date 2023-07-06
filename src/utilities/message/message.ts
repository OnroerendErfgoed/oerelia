import * as toastr from 'toastr';
import { messageType } from './enums/messageTypes';
import { IMessage } from './interfaces/IMessage';
import { IMessageStyle } from './interfaces/IMessageStyle';

export class Message {
  readonly defaults = {
    emitterOptions: {
      timeOut: 1000, // toast disappears after 10 seconds without user interaction
      extendedTimeOut: 0, // toast will not disappear while hovering over it
    },
    preventDuplicates: true,
    preventOpenDuplicates: true
  }

  public static info(config: IMessage): Message {
    return new Message(messageType.info, config);
  }

  public static success(config: IMessage): Message {
    return new Message(messageType.success, config);
  }

  public static warning(config: IMessage): Message {
    return new Message(messageType.warning, config);
  }

  public static error(config: IMessage): Message {
    config.emitterOptions = config.emitterOptions || {};
    config.emitterOptions = { closeButton: true, ...config.emitterOptions };
    return new Message(messageType.error, config);
  }

  private emitter: any = toastr;

  private constructor(type: messageType, config: IMessage) {
    config = {
      ...this.defaults,
      ...config,
      emitterOptions: {
        ...this.defaults.emitterOptions,
        ...(config.emitterOptions || {})
      }
    };
    const messageElement = this.show(type, config);
    this.applyStyle(messageElement, config.style);
  }

  private show(type: messageType, config: IMessage): HTMLElement {
    try {
      const element = this.emitter[type](config.message, config.title, config.emitterOptions);
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
}
