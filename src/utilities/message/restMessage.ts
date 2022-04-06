import { messageType } from './enums/messageTypes';
import { IMessage } from './interfaces/IMessage';
import { IRestMessage } from './interfaces/IRestMessage';
import { IRestResponse } from './interfaces/IRestResponse';
import { Message } from './message';

export class RestMessage {

  public static display(config: IRestMessage): RestMessage {
    return new RestMessage(config);
  }

  private restSuccess: boolean = true; // true if responseCode is a 200 code
  private customErrorFailed: boolean = false; // true if any custom error failed

  private constructor(config: IRestMessage) {
    this.restSuccess = String(config.result.code).startsWith('2');

    if (config.customErrors) {

      config.customErrors.forEach((message) => {
        if (message.condition) {
          this.customErrorFailed = true;
          this.customError(message.error);
        }
      });
      if (this.customErrorFailed) {
        return;
      }
    }

    if (this.restSuccess && !this.customErrorFailed) {
      this.success(config.success);
    } else {
      this.error(config.result.response);
    }
  }

  private show(type: messageType, config: IMessage): Message {
    return config ? Message[type](config) : undefined;
  }

  private success(config: IMessage): Message {
    return this.show(messageType.success, config);
  }

  private error(config: IRestResponse): Message {
    const message: IMessage = { title: config.message, message: '' };
    if (config.errors.length > 1) {
      config.errors.forEach((error) => {
        message.message += `<li>${error}</li>`;
      });
      message.message = `<ul>${message.message}</ul>`;
    } else {
      message.message = config.errors[0] === message.title ? '' : config.errors[0];
    }
    return this.show(messageType.error, message);
  }

  private customError(config: IMessage): Message {
    return this.show(messageType.error, config);
  }
}
