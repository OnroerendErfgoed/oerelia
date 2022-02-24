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
      errors.forEach(function (error, index) {
        if (error.indexOf('ict@onroerenderfgoed.be') !== -1) {
          const subject = 'Vraag of fout bij ' + response.requestMessage.url;
          const errorInfo = 'Opgetreden fout: ' + new Date().toString() + ' - ' + response.statusText + ' \n \n';
          const body = errorInfo + 'Gelieve hieronder uw probleem of vraag te omschrijven. Vermeld zeker de genomen stappen en voeg screenshots toe als bijlage ter verduidelijking:';
          const hrefUrl = 'mailto: ict@onroerenderfgoed.be?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
          errors[index] = error.replace('ict@onroerenderfgoed.be', "<a href='" + hrefUrl + "' target='_blank'>ict@onroerenderfgoed.be</a>");
        }
      });

      result.response.errors = errors;
      result.response.message = response.content.errors ? response.content.message : 'Er is een fout opgetreden';
    } else if (response.statusCode === 0 || response.statusCode === 500) {
      const reg = /^https?:\/\//i;
      let url = response.requestMessage.url;
      if (!reg.test(response.requestMessage.url)) {
        url = `${response.requestMessage.baseUrl}/${url}`;
      }

      const subject = 'Vraag of fout bij ' + response.requestMessage.url;
      const errorInfo = 'Opgetreden fout: ' + new Date().toString() + ' - ' + response.statusText + ' \n \n';
      const body = errorInfo + 'Gelieve hieronder uw probleem of vraag te omschrijven. Vermeld zeker de genomen stappen en voeg screenshots toe als bijlage ter verduidelijking:';
      const hrefUrl = 'mailto: ict@onroerenderfgoed.be?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      const oeUrl = "<a href='" + hrefUrl + "' target='_blank'>ict@onroerenderfgoed.be</a>";

      result.response.errors = [
        `Er liep iets mis bij het ophalen van ${url}.<br>
         Mail naar ${oeUrl} om dit probleem te melden.`
      ];
    } else if (response.statusCode === 400) {
      result.response.errors = [
        `Fout bij valideren van ${response.requestMessage.url} (statuscode: 400)`
      ]
    }
    return result;
  }
}
