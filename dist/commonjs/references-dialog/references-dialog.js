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
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_dialog_1 = require("aurelia-dialog");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_http_client_1 = require("aurelia-http-client");
var id_service_api_service_1 = require("../services/id-service.api-service");
var ReferencesDialog = (function () {
    function ReferencesDialog(controller) {
        this.controller = controller;
        this.loading = true;
    }
    ReferencesDialog.prototype.activate = function (model) {
        var _this = this;
        this.apiService = new id_service_api_service_1.IdServiceApiService(new aurelia_http_client_1.HttpClient(), model.ssoToken);
        this.apiService.getReferencesByUri(model.uri).then(function (response) {
            _this.references = response;
            _this.loading = false;
        });
    };
    ReferencesDialog = __decorate([
        aurelia_framework_1.autoinject(),
        __metadata("design:paramtypes", [aurelia_dialog_1.DialogController])
    ], ReferencesDialog);
    return ReferencesDialog;
}());
exports.ReferencesDialog = ReferencesDialog;

//# sourceMappingURL=references-dialog.js.map
