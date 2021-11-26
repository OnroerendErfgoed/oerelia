var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DialogController } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { IdServiceApiService } from '../services/id-service.api-service';
var ReferencesDialog = (function () {
    function ReferencesDialog(controller, apiService) {
        this.controller = controller;
        this.apiService = apiService;
        this.loading = true;
    }
    ReferencesDialog.prototype.activate = function (model) {
        var _this = this;
        this.apiService.ssoToken = model.ssoToken;
        this.apiService.getReferencesByUri(model.uri).then(function (response) {
            _this.references = response;
            _this.loading = false;
        });
    };
    ReferencesDialog = __decorate([
        autoinject(),
        __metadata("design:paramtypes", [DialogController,
            IdServiceApiService])
    ], ReferencesDialog);
    return ReferencesDialog;
}());
export { ReferencesDialog };

//# sourceMappingURL=references-dialog.js.map
