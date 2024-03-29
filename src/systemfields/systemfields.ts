import { bindable } from 'aurelia-framework';
import { IStatus, ISystemFields } from 'models/public-models';
import * as moment from 'moment';

export class Systemfields {
  @bindable public systemfields: ISystemFields;
  @bindable public status: IStatus;
  public createdBy: string;
  public createdAt: string;
  public updatedBy: string;
  public updatedAt: string;

  public formatDate(date) {
    return moment(date).format('DD/MM/YYYY [om] HH:mm');
  }

  public attached() {
    this.createdAt = this.formatDate(this.systemfields.created_at);
    this.createdBy = this.systemfields.created_by.description;

    this.updatedAt = this.formatDate(this.systemfields.updated_at);
    this.updatedBy = this.systemfields.updated_by.description;
  }
}
