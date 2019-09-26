import { bindingMode } from 'aurelia-binding';
import { bindable } from 'aurelia-framework';

export class TabsHeader {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public tabs: any;

  public click(id, event) {
    console.debug('tab-headers::click', event);
    event.stopPropagation();
    event.preventDefault();
    this.tabs = this.tabs.filter(tab => {
      tab.active = tab.id === id;
      return tab;
    });
  }

  public closeTab(id, event) {
    console.debug('tab-headers::closeTab', event);
    event.stopPropagation();
    event.preventDefault();

    this.tabs = this.tabs.filter(tab => {
      if (tab.id !== id) {
        tab.active = tab.id === 'overzicht';
        return tab;
      }
    });
  }
}
