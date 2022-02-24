import { bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { MultiSelectBase } from './multi-select-base';

@inject(Element)
export class MultiSelect extends MultiSelectBase {
  @bindable public textValue: string = '';
  public expanded: boolean = false;
  public mouseover: boolean = false;
  public element: Element = null;

  constructor(element: Element) {
    super();
    this.element = element;
  }

  public bind() {
    this.updateTextValue();
  }

  public valueChanged() {
    this.value.length > 0 && this.updateTextValue();
  }

  public toggleList() {
    this.expanded = !this.expanded;
    const el = this.element;

    this.value.forEach(obj => {
      el.querySelector(`li[data-id="${obj[this.idProperty]}"]`).classList.add('selected');
    });
  }

  public optionClicked(option, target) {
    const index = this.value.findIndex(obj => obj[this.idProperty] === option[this.idProperty]);

    if (index < 0) {
      const obj = {};

      obj[this.idProperty] = option[this.idProperty];
      obj[this.labelProperty] = option[this.labelProperty];

      this.value.push(obj);
    } else {
      this.value.splice(index, 1);
    }

    target.classList.toggle('selected');
    this.updateTextValue();

    (this.element.querySelector('input[readonly]') as HTMLElement).focus();
    this.expanded = true;
  }

  public updateTextValue() {
    const values = this.value.map((val) => val[this.labelProperty]).join(', ');

    this.textValue = values;
  }

  public reset() {
    this.updateTextValue();

    const selected = this.element.querySelectorAll('li.selected');

    (selected as NodeListOf<HTMLElement>).forEach(el => {
      el.classList.remove('selected');
    });
  }
}
