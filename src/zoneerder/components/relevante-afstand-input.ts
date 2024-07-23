import { bindable, bindingMode } from 'aurelia-framework';
export class RelevanteAfstandInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) private relevanteAfstand: string = "3.0";
  @bindable private max = "6";
  @bindable private min = "0";
  @bindable private floatMin = "0.0";
  @bindable private floatMax = "6.0";
  @bindable private increment = 0.1;

  private onMinusClick() {
    this.relevanteAfstand = (
      Number(this.relevanteAfstand) - this.increment
    ).toFixed(1);
  }

  private onPlusClick() {
    this.relevanteAfstand = (
      Number(this.relevanteAfstand) + this.increment
    ).toFixed(1);
  }
}
