import { bindable } from 'aurelia-framework';

export class Header {
  @bindable public role: string;
  @bindable public title: string;
  @bindable public baseUrl: string;
  @bindable public afmeldenUrl: string;
  @bindable public username: string;
}
