import * as moment from 'moment';

export class DateValueConverter {
  public toView(value: Date) {
    if (value) {
      return moment(value).format('DD/MM/YYYY');
    }
  }

  public fromView(value: any) {
    if (value) {
      return moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD');
    }
  }
}
