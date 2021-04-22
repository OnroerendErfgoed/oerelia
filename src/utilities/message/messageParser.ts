import { IRestResult } from './interfaces/IRestResult';

export class MessageParser {
  public static parseHttpResponseMessage(response): IRestResult {
    let result: IRestResult;
    result = {
      code: response.statusCode,
      response: {
        errors : []
      }
    };

    if (response.content.errors || response.content.message) {
      var errors = response.content.errors || [response.content.message];

      if (result.code && result.code === 500) {
        errors.forEach(function (error: string) {
          if (error.indexOf('ict@onroerenderfgoed.be') !== -1) {
            error.replace('ict@onroerenderfgoed.be', '<a href="mailto: ict@onroerenderfgoed.be">ict@onroerenderfgoed.be</a>');
          }
        });
      }

      result.response.errors = errors;
      result.response.message = response.content.errors ? response.content.message : 'Er is een fout opgetreden';
    } else if (response.statusCode === 0 || response.statusCode === 500) {
      const reg = /^https?:\/\//i;
      let url = response.requestMessage.url;
      if (!reg.test(response.requestMessage.url)) {
        url = `${response.requestMessage.baseUrl}/${url}`;
      }
      result.response.errors = [
        `Er liep iets mis bij het ophalen van ${url}.<br>
         Mail naar ict@onroerenderfgoed.be om dit probleem te melden.`
      ];
    }
    return result;
  }
}
