var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, PLATFORM } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-http-client';
import { User } from './models/user';
import { RestMessage } from '../utilities/message/restMessage';
import { MessageParser } from '../utilities/message/messageParser';
var AuthenticationService = (function () {
    function AuthenticationService(dialogService, http, ea) {
        var _this = this;
        this.dialogService = dialogService;
        this.http = http;
        this.ea = ea;
        this.timeoutTimer = null;
        this.logoutTimer = null;
        this.sessionTimeout = 3000000;
        this.sessionRefreshTimeout = 600000;
        oeAppConfig.ea = this.ea;
        this.http = new HttpClient();
        this.http.configure(function (x) {
            x.withBaseUrl(oeAppConfig.baseUrl);
            x.withHeader('Accept', 'application/json');
            x.withInterceptor({
                request: function (res) {
                    oeAppConfig.ea.publish('requestSuccess');
                    return res;
                },
                responseError: function (res) {
                    console.debug(res.response);
                    RestMessage.display({ result: MessageParser.parseHttpResponseMessage(res) });
                    return res;
                }
            });
        });
        this.timeoutTimer = setTimeout(function () {
            _this.sessionRefreshTimer();
        }, this.sessionTimeout);
        this.ea.subscribe('requestSuccess', function (response) {
            _this.refreshTimer();
        });
    }
    AuthenticationService.prototype.loadUser = function (content) {
        this.user = content ? new User(content.actor, content.attributes, content.groups, content.organisatieCode, content.personid, content.persoonsgegevens, content.sso_token, content.userid) : null;
    };
    AuthenticationService.prototype.getUser = function () {
        return this.user;
    };
    AuthenticationService.prototype.getSsoToken = function () {
        if (this.user) {
            return this.user.ssoToken;
        }
        return null;
    };
    AuthenticationService.prototype.isBeheerder = function () {
        if (this.user) {
            return this.user.hasRole(this.rolePrefix + 'beheerder');
        }
        return false;
    };
    AuthenticationService.prototype.isToevoeger = function () {
        if (this.user) {
            return this.user.hasRole(this.rolePrefix + 'toevoeger');
        }
        return false;
    };
    AuthenticationService.prototype.isLezer = function () {
        if (this.user) {
            return this.user.hasRole(this.rolePrefix + 'lezer');
        }
        return false;
    };
    AuthenticationService.prototype.canEdit = function () {
        return this.isBeheerder() || this.isToevoeger();
    };
    AuthenticationService.prototype.canDelete = function () {
        return this.isBeheerder();
    };
    AuthenticationService.prototype.isIntern = function () {
        return this.isBeheerder() || this.isToevoeger() || this.isLezer();
    };
    AuthenticationService.prototype.getHighestRole = function () {
        if (this.isBeheerder()) {
            return 'Beheerder';
        }
        else if (this.isToevoeger()) {
            return 'Toevoeger';
        }
        else {
            return 'Lezer';
        }
    };
    AuthenticationService.prototype.refreshTimer = function () {
        var _this = this;
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = null;
        clearTimeout(this.logoutTimer);
        this.logoutTimer = null;
        this.timeoutTimer = setTimeout(function () {
            _this.sessionRefreshTimer();
        }, this.sessionTimeout);
    };
    AuthenticationService.prototype.refreshSession = function () {
        var _this = this;
        this.refreshTimer();
        this.http.createRequest('/user')
            .asGet().withHeader('OpenAmSSOID', this.getSsoToken()).send()
            .then(function (data) {
            if (_this.user) {
                _this.user.ssoToken = data.content.sso_token;
            }
        });
    };
    AuthenticationService.prototype.sessionRefreshTimer = function () {
        var _this = this;
        if (this.timeoutTimer) {
            clearTimeout(this.timeoutTimer);
            this.timeoutTimer = null;
        }
        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
            this.logoutTimer = null;
        }
        this.logoutTimer = setTimeout(function () {
            _this.sessionTimedOut();
        }, this.sessionRefreshTimeout);
        return this.dialogService.open({
            viewModel: PLATFORM.moduleName('services/dialogs/timer-dialog'),
            model: this
        }).whenClosed(function (response) {
            if (!response.wasCancelled) {
                _this.refreshSession();
            }
        });
    };
    AuthenticationService.prototype.sessionTimedOut = function () {
        this.dialogService.controllers.forEach(function (controller) {
            controller.cancel();
        });
        this.dialogService.open({
            viewModel: PLATFORM.moduleName('services/dialogs/session-dialog'),
            model: this
        });
    };
    AuthenticationService = __decorate([
        autoinject,
        __metadata("design:paramtypes", [DialogService,
            HttpClient,
            EventAggregator])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };

//# sourceMappingURL=authentication-service.js.map
