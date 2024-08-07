import { autoinject, observable, bindable } from "aurelia-framework";
import { setupD3, removePoint, drawNewCircle } from "./d3";
import { DialogService } from "aurelia-dialog";
import { PLATFORM } from "aurelia-framework";
import { Contour, IAlignerResponse } from '../models/contour';
import { DomeinStrategie, Referentielaag, ReferentielaagEnum, StrategieEnum } from '../models/contour';
@autoinject
export class ReferentielaagAutocorrectie {
  @bindable resultsUpdated = (event) => event;
  @bindable zone: Contour;
  @bindable alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
  
  readonly referentieLagen = [
    {
      value: ReferentielaagEnum.GRBPercelenlaag,
      label: "Actuele GRB percelenlaag",
    },
    { value: ReferentielaagEnum.GRBGebouwenlaag, 
      label: "Actuele GRB gebouwlaag" 
    },
  ];

  readonly strategieen = [
    {
      value: StrategieEnum.EenzijdingSnappen,
      label: "Eénzijdig snappen (1)",
    },
    { value: StrategieEnum.TweezijdigSnappen, label: "Tweezijdig snappen (2)" },
    { value: StrategieEnum.ExactOvernemen, label: "Exact overnemen (0)" },
    { value: StrategieEnum.Uitsluiten, label: "Uitsluiten (-1)" },
  ];

  histogram: HTMLElement;

  private referentielaag: Referentielaag = null;
  private domeinstrategie: DomeinStrategie;
  @observable private relevanteAfstand: string = "3.0";
  private max = "6";
  private min = "0";
  private floatMin = "0.0";
  private floatMax = "6.0";
  private increment = 0.1;

  private showHistogram = false;
  private loadingData = false;
  private volledigGealigneerd = false;
  private histogramData: IAlignerResponse;
  private laatstGealligneerd: string;

  constructor(private dialogService: DialogService) { }

  openOpenbaarDomeinLegende() {
    this.dialogService
      .open({
        viewModel: PLATFORM.moduleName(
          "oerelia/zoneerder/components/domein-strategie-legende"
        ),
        model: {},
      })
      .whenClosed((response) => {
        if (!response.wasCancelled) {
        }
      });
  }

  async onHistogramDataChanged() {
    if (this.referentielaag?.value && this.domeinstrategie?.value) {
      // API Call en histogram data ophalen.
      try {
        this.loadingData = true;
        this.histogramData = await this.alignGrb(this.zone, this.referentielaag.value, this.domeinstrategie.value);
        this.laatstGealligneerd = this.getLaatstGealligneerdDatum();
        this.loadingData = false;
        setupD3(this.histogram, this.histogramData.diffs , Number(this.relevanteAfstand));
        const floatNumber = Number(this.relevanteAfstand).toFixed(1);
        this.resultsUpdated(this.histogramData.series[floatNumber]);
        const data = Object.entries(this.histogramData.diffs).map(([x, y]) => ({x: parseFloat(x), y: Math.abs(y)}));
        this.volledigGealigneerd = data.every((point) => point.y === 0);
        this.showHistogram = true;
      } catch(e) {
        this.loadingData = false;
      }
    } else {
      this.showHistogram = false;
    }
  }
  
  relevanteAfstandChanged(nv: string, ov: string) {
    if (!ov || ov === nv) {
      return;
    }
    const floatNumber = Number(nv).toFixed(1);
    removePoint();
    drawNewCircle(Number(nv));
    if (!this.histogramData) { return; }
    this.resultsUpdated(this.histogramData.series[floatNumber]);
  }

  private getLaatstGealligneerdDatum() {
    let now = new Date();

    let day = now.getDate().toString().padStart(2, '0');
    let month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JavaScript
    let year = now.getFullYear();

    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} om ${hours}:${minutes}`;
  }
}
