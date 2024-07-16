import { autoinject } from 'aurelia-framework';
import { setupD3 } from './d3';
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

  constructor(private dialogService: DialogService) {

  }

  bind() {
    setupD3(this.histogram);
    // setupD3Slider()
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
}