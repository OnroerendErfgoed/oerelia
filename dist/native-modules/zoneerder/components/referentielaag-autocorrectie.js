var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, observable } from 'aurelia-framework';
import { setupD3 } from './d3';
import { DialogService } from 'aurelia-dialog';
import { PLATFORM } from 'aurelia-framework';
var ReferentielaagAutocorrectie = (function () {
    function ReferentielaagAutocorrectie(dialogService) {
        this.dialogService = dialogService;
        this.referentieLagen = [{
                value: 'percelenlaag', label: 'Actuele GRB percelenlaag'
            },
            { value: 'gebouwenlaag', label: 'Actuele GRB gebouwlaag' }
        ];
        this.strategieen = [{
                value: 'eenzijdig snappen', label: 'Eénzijdig snappen (1)'
            },
            { value: 'tweezijdig snappen', label: 'Tweezijdig snappen (2)' },
            { value: 'exact overnemen', label: 'Exact overnemen (0)' },
            { value: 'uitsluiten', label: 'Uitsluiten (-1)' }
        ];
        this.referentielaag = null;
        this.domeinstrategie = null;
        this.relevanteAfstand = "3.0";
        this.max = "6";
        this.min = "0";
        this.floatMin = "0.0";
        this.floatMax = "6.0";
        this.increment = 0.1;
    }
    ReferentielaagAutocorrectie.prototype.bind = function () {
        setupD3(this.histogram, Number(this.relevanteAfstand));
    };
    ReferentielaagAutocorrectie.prototype.openOpenbaarDomeinLegende = function () {
        this.dialogService.open({
            viewModel: PLATFORM.moduleName('oerelia/zoneerder/components/domein-strategie-legende'),
            model: {}
        }).whenClosed(function (response) {
            if (!response.wasCancelled) {
            }
        });
    };
    ReferentielaagAutocorrectie.prototype.relevanteAfstandChanged = function (nv, ov) {
        if (ov === nv) {
            return;
        }
        setupD3(this.histogram, Number(nv));
    };
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ReferentielaagAutocorrectie.prototype, "relevanteAfstand", void 0);
    ReferentielaagAutocorrectie = __decorate([
        autoinject,
        __metadata("design:paramtypes", [DialogService])
    ], ReferentielaagAutocorrectie);
    return ReferentielaagAutocorrectie;
}());
export { ReferentielaagAutocorrectie };

//# sourceMappingURL=referentielaag-autocorrectie.js.map
