"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferentielaagAutocorrectie = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var d3_1 = require("./d3");
var aurelia_dialog_1 = require("aurelia-dialog");
var aurelia_framework_2 = require("aurelia-framework");
var contour_1 = require("../models/contour");
var ReferentielaagAutocorrectie = (function () {
    function ReferentielaagAutocorrectie(dialogService) {
        this.dialogService = dialogService;
        this.resultsUpdated = function (event) { return event; };
        this.referentieLagen = [
            {
                value: "ADP",
                label: "Actuele GRB percelenlaag",
            },
            { value: "GBG",
                label: "Actuele GRB gebouwlaag"
            },
        ];
        this.strategieen = [
            {
                value: "SNAP_SINGLE_SIDE",
                label: "Eénzijdig snappen (1)",
            },
            { value: "SNAP_ALL_SIDE", label: "Tweezijdig snappen (2)" },
            { value: "AS_IS", label: "Exact overnemen (0)" },
            { value: "EXCLUDE", label: "Uitsluiten (-1)" },
        ];
        this.referentielaag = null;
        this.relevanteAfstand = "3.0";
        this.max = "6";
        this.min = "0";
        this.floatMin = "0.0";
        this.floatMax = "6.0";
        this.increment = 0.1;
        this.showHistogram = false;
        this.loadingData = false;
    }
    ReferentielaagAutocorrectie.prototype.openOpenbaarDomeinLegende = function () {
        this.dialogService
            .open({
            viewModel: aurelia_framework_2.PLATFORM.moduleName("oerelia/zoneerder/components/domein-strategie-legende"),
            model: {},
        })
            .whenClosed(function (response) {
            if (!response.wasCancelled) {
            }
        });
    };
    ReferentielaagAutocorrectie.prototype.onHistogramDataChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(((_b = this.referentielaag) === null || _b === void 0 ? void 0 : _b.value) && ((_c = this.domeinstrategie) === null || _c === void 0 ? void 0 : _c.value))) return [3, 5];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        this.loadingData = true;
                        _a = this;
                        return [4, this.alignGrb(this.zone, this.referentielaag.value, this.domeinstrategie.value)];
                    case 2:
                        _a.histogramData = _d.sent();
                        this.loadingData = false;
                        (0, d3_1.setupD3)(this.histogram, this.histogramData.diffs, Number(this.relevanteAfstand));
                        this.showHistogram = true;
                        return [3, 4];
                    case 3:
                        e_1 = _d.sent();
                        this.loadingData = false;
                        return [3, 4];
                    case 4: return [3, 6];
                    case 5:
                        this.showHistogram = false;
                        _d.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    ReferentielaagAutocorrectie.prototype.relevanteAfstandChanged = function (nv, ov) {
        if (!ov || ov === nv) {
            return;
        }
        var floatNumber = Number(nv).toFixed(1);
        (0, d3_1.removePoint)();
        (0, d3_1.drawNewCircle)(Number(nv));
        if (!this.histogramData) {
            return;
        }
        this.resultsUpdated(this.histogramData.series[floatNumber]);
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], ReferentielaagAutocorrectie.prototype, "resultsUpdated", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", contour_1.Contour)
    ], ReferentielaagAutocorrectie.prototype, "zone", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Function)
    ], ReferentielaagAutocorrectie.prototype, "alignGrb", void 0);
    __decorate([
        aurelia_framework_1.observable,
        __metadata("design:type", String)
    ], ReferentielaagAutocorrectie.prototype, "relevanteAfstand", void 0);
    ReferentielaagAutocorrectie = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_dialog_1.DialogService])
    ], ReferentielaagAutocorrectie);
    return ReferentielaagAutocorrectie;
}());
exports.ReferentielaagAutocorrectie = ReferentielaagAutocorrectie;

//# sourceMappingURL=referentielaag-autocorrectie.js.map
