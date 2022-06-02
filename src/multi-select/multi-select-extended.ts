import { autoinject, bindable } from 'aurelia-framework';
import { MultiSelectBase } from './multi-select-base';

@autoinject
export class MultiSelectExtended extends MultiSelectBase {
  @bindable public addOnChange: boolean = false;
  public inputValue: string|number;

  public addInput() {
    if (this.inputValue) {
      const exists = this.value.filter((item) => {
        return item[this.idProperty] === this.inputValue;
      });

      if (exists.length <= 0) {
        this.value.push(this.options.find((o) => o[this.idProperty] === this.inputValue));
      }
    }
    this.inputValue = null;
  }

  public removeFromList(item) {
    const index = this.value.findIndex((l) => l[this.idProperty] === item[this.idProperty]);
    this.value.splice(index, 1);
  }

  public bind() {
    if (!this.value) { this.value = []; }
  }
}
