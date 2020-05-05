import { DialogController } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { IdServiceApiService } from '../services/id-service.api-service'

@autoinject()
export class ReferencesDialog {
  public references: any;
  public loading: boolean = true;

  private apiService: IdServiceApiService;

  constructor(
    private controller: DialogController
  ) {}

  public activate(model) {
    this.apiService = new IdServiceApiService(new HttpClient(), model.ssoToken);
    this.apiService.getReferencesByUri(model.uri).then((response) => {
      this.references = response;
      this.loading = false;
    });
  }
}
