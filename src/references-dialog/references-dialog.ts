import { DialogController } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { IdServiceApiService } from '../services/id-service.api-service'

@autoinject()
export class ReferencesDialog {
  public references: any;
  public loading: boolean = true;

  constructor(
    private controller: DialogController,
    private apiService: IdServiceApiService
  ) {}

  public activate(model) {
    this.apiService.ssoToken = model.ssoToken;
    this.apiService.getReferencesByUri(model.uri).then((response) => {
      this.references = response;
      this.loading = false;
    });
  }
}
