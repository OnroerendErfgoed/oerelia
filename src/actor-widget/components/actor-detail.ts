import { autoinject, bindable, customElement } from 'aurelia-framework';

@autoinject() @customElement('actor-detail')
export class ActorDetail {
  @bindable public actor: any;
  public editMode: boolean;

  constructor(public element: Element) {
    this.editMode = true;
  }

  public activate(): void {
    console.debug('actor-widget::details::activate');
  }
}
