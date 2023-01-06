import { messageType } from './enums/messageTypes';
import { IMessage } from './interfaces/IMessage';
import { IRestMessage } from './interfaces/IRestMessage';
import { IRestResponse } from './interfaces/IRestResponse';
import { IRestResult } from './interfaces/IRestResult';
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
      this.error(config.result);
    }
  }

  private show(type: messageType, config: IMessage): Message {
    return config ? Message[type](config) : undefined;
  }

  private success(config: IMessage): Message {
    return this.show(messageType.success, config);
  }

  private error(result: IRestResult): Message {
    const message: IMessage = { title: result.response.message, message: '' };
    if (result.response.errors.length > 1) {
      result.response.errors.forEach((error) => {
        message.message += `<li>${error}</li>`;
      });
      message.message = `<ul>${message.message}</ul>`;
    } else if (result.response.errors.length === 1) {
      message.message = result.response.errors[0] === message.title ? '' : result.response.errors[0];
    } else {
      message.message = `Er is iets mis gelopen:<br>` + 
      `<b>method:</b> ${result.requestMessage.method}<br>` + 
      `<b>url:</b> ${result.requestMessage.url}<br>` + 
      `<b>code:</b> ${result.code}<br>`;
    }
    return this.show(messageType.error, message);
  }

  private customError(config: IMessage): Message {
    return this.show(messageType.error, config);
  }
}
