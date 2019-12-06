import moment from 'moment';

export class DateFormatValueConverter {
  public toView(value, format = 'DD-MM-YYYY') {
    return value ? moment(value).format(format) : '-';
  }
}
