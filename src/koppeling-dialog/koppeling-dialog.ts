import { autoinject, LogManager } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { IKoppelingResponse } from 'exports';

const log = LogManager.getLogger('koppeling-dialog');

@autoinject
export class KoppelingDialog {
  public loading: boolean = true;
  public totalReftekst: string;
  public applications: IApplication[] = [];
  public isExtern: boolean;

  constructor(public controller: DialogController) { }

  public async activate(model: { koppelingCall: (id: number) => Promise<IKoppelingResponse>, id: number, isExtern: boolean }) {
    try {
      const koppelingResponse = await model.koppelingCall(model.id);
      this.isExtern = model.isExtern;
      if (koppelingResponse) {
        this.totalReftekst = koppelingResponse.total_ref_tekst;
        this.applications = koppelingResponse.applications;
      }
    } catch (e) {
      log.error(e);
    } finally {
      this.loading = false;
    }
  }
}
