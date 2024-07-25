import { autoinject, observable } from 'aurelia-framework';
import { setupD3, removePoint, drawNewCircle } from './d3';
import { DialogService } from 'aurelia-dialog';
import { PLATFORM } from 'aurelia-framework';

@autoinject
export class ReferentielaagAutocorrectie {
  readonly referentieLagen = [{
    value: 'percelenlaag', label: 'Actuele GRB percelenlaag'
  },
  { value: 'gebouwenlaag', label: 'Actuele GRB gebouwlaag' }
  ]

  readonly strategieen = [{
    value: 'eenzijdig snappen', label: 'Eénzijdig snappen (1)'
  },
  { value: 'tweezijdig snappen', label: 'Tweezijdig snappen (2)' },
  { value: 'exact overnemen', label: 'Exact overnemen (0)' },
  { value: 'uitsluiten', label: 'Uitsluiten (-1)' }
  ]

  histogram: HTMLElement;

  private referentielaag = null;
  private domeinstrategie = null;
  @observable private relevanteAfstand: string = "3.0";
  private max = "6";
  private min = "0";
  private floatMin = "0.0";
  private floatMax = "6.0";
  private increment = 0.1;

  constructor(private dialogService: DialogService) { }

  bind() {
    setupD3(this.histogram, Number(this.relevanteAfstand));
  }

  openOpenbaarDomeinLegende() {
    this.dialogService.open({
      viewModel: PLATFORM.moduleName(
        'oerelia/zoneerder/components/domein-strategie-legende'),
      model: { }
    }).whenClosed((response) => {
      if (!response.wasCancelled) {
      }
    });
  }

  relevanteAfstandChanged(nv: string, ov: string) {
    if (!ov || ov === nv) { return; }
    removePoint();
    drawNewCircle(Number(nv));
  }
}