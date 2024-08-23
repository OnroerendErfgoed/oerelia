import { autoinject, observable, bindable, PLATFORM } from "aurelia-framework";
import { setupD3, removePoint, drawNewCircle } from "./d3";
import { DialogService } from "aurelia-dialog";
import {
  Contour,
  IAlignerResponse,
  DomeinStrategie,
  Referentielaag,
  ReferentielaagEnum,
  StrategieEnum
} from '../models/contour';

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
    {
      value: ReferentielaagEnum.GRBGebouwenlaag,
      label: "Actuele GRB gebouwlaag"
    }
  ];

  readonly strategieen = [
    {
      value: StrategieEnum.EenzijdigSnappen,
      label: "Eénzijdig snappen (1)",
    },
    { value: StrategieEnum.TweezijdigSnappen, label: "Tweezijdig snappen (2)" },
    { value: StrategieEnum.ExactOvernemen, label: "Exact overnemen (0)" },
    { value: StrategieEnum.Uitsluiten, label: "Uitsluiten (-1)" },
  ];

  histogram: HTMLElement;

  @bindable laatstGealigneerd: string;
  private referentielaag: Referentielaag = {
    value: ReferentielaagEnum.GRBPercelenlaag,
    label: "Actuele GRB percelenlaag"
  };
  private domeinstrategie: DomeinStrategie = {
    value: StrategieEnum.EenzijdigSnappen,
    label: "Eénzijdig snappen (1)"
  };
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

  constructor(private dialogService: DialogService) { }

  async bind() {
    await this.onHistogramDataChanged();
  }

  openOpenbaarDomeinLegende() {
    const host = document.getElementById("referentielaag-map");
    void this.dialogService
      .open({
        viewModel: PLATFORM.moduleName(
          "oerelia/zoneerder/components/domein-strategie-legende"
        ),
        model: {},
        host
      });
  }

  async onHistogramDataChanged() {
    if (!this.referentielaag?.value || !this.domeinstrategie?.value) {
      this.showHistogram = false;
      return;
    }
    // API Call en histogram data ophalen.
    try {
      this.loadingData = true;
      this.histogramData = await this.alignGrb(this.zone, this.referentielaag.value, this.domeinstrategie.value);
      this.laatstGealigneerd = new Date().toISOString();
      this.loadingData = false;
      setupD3(this.histogram, this.histogramData.diffs, Number(this.relevanteAfstand));
      const floatNumber = Number(this.relevanteAfstand).toFixed(1);
      this.resultsUpdated(this.histogramData.series[floatNumber]);
      const data = Object.entries(this.histogramData.diffs).map(([x, y]) => ({ x: parseFloat(x), y: Math.abs(y) }));
      this.volledigGealigneerd = data.every((point) => point.y === 0);
      this.showHistogram = true;
    } catch (e) {
      this.loadingData = false;
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
}
