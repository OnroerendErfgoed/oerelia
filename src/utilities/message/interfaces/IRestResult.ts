import { IRestResponse } from './IRestResponse';

export interface IRestResult {
  requestMessage: IRequestMessage;
  code: number;
  response: IRestResponse;
}

interface IRequestMessage {
  url: string;
  method: string;
}
