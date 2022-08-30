import { autoinject, LogManager } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { IKoppelingResponse } from 'exports';

const log = LogManager.getLogger('koppeling-dialog');

@autoinject
export class KoppelingDialog {
  public loading: boolean = true;
  public totalReftekst: string;
  public applications: IApplication[] = [];
  public zichtbaarheidTekst: string;

  constructor(public controller: DialogController) { }

  public async activate(model: { koppelingCall: (id: number) => Promise<IKoppelingResponse>, id: number }) {
    try {
      const koppelingResponse = await model.koppelingCall(model.id);
      if (koppelingResponse) {
        this.totalReftekst = koppelingResponse.total_ref_tekst;
        this.applications = koppelingResponse.applications;
        this.zichtbaarheidTekst = koppelingResponse.zichtbaarheid_tekst;
      }
    } catch (e) {
      log.error(e);
    } finally {
      this.loading = false;
    }
  }
}
