import { inject, bindable, bindingMode } from 'aurelia-framework';
import * as Pikaday from 'pikaday';
import * as moment from 'moment';

@inject(Element)
export class AureliaPikadayDatepicker {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: string;
  @bindable public placeholder: string = '';
  @bindable public config: Pikaday.PikadayOptions = {};
  @bindable public disabled: boolean;

  private picker: Pikaday;
  private i18n: any = {
    previousMonth: 'Vorige Maand',
    nextMonth: 'Volgende Maand',
    months: [
      'Januari',
      'Februari',
      'Maart',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Augustus',
      'September',
      'Oktober',
      'November',
      'December'
    ],
    weekdays: [
      'Zondag',
      'Maandag',
      'Dinsdag',
      'Woensdag',
      'Donderdag',
      'Vrijdag',
      'Zaterdag'
    ],
    weekdaysShort: [
      'Zo',
      'Ma',
      'Di',
      'Wo',
      'Do',
      'Vr',
      'Za'
    ]
  };

  constructor(
    private element: Element
  ) {}

  public attached() {
    this.setConfig();

    this.picker = new Pikaday(this.config);
    if (this.config.defaultDate) {
      this.picker.setDate(this.config.defaultDate);
    }
  }

  public detached() {
    this.picker.destroy();
  }

  public keydown(e: KeyboardEvent) {
    if (this.picker.isVisible()) {
      this.picker.hide();
    }
    return true;
  }

  private setConfig() {
    this.config.field = (this.element as any);
    if (!this.config.i18n) { this.config.i18n = this.i18n; }
    if (!this.config.firstDay) { this.config.firstDay = 1; }

    this.config.format = 'YYYY-MM-DD';
    (this.config.toString as any) = (date: Date, format: string) => {
      return moment(date).format(format);
    };
    this.config.parse = (dateString: string, format: string) => {
      return moment(dateString, format).toDate();
    };
    this.config.onOpen = () => {
      if (this.disabled) {
        this.picker.hide();
      } else {
        this.picker.setDate(this.value);
      }
    };
    this.config.onClose = () => {
      if (!this.disabled) {
        this.value = this.picker.toString();
      }
    };
  }
}
