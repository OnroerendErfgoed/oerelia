import { autoinject, bindable, customElement } from 'aurelia-framework';

@autoinject() @customElement('actor-detail')
export class ActorDetail {
  @bindable public actor: any;

  constructor(public element: Element) { }

  public activate(): void {
    console.debug('actor-widget::details::activate');
  }
}
