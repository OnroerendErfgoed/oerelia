import { autoinject, PLATFORM } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-http-client';
import { User } from './models/user';
import { RestMessage } from '../utilities/message/restMessage';
import { MessageParser } from '../utilities/message/messageParser';

declare const oeAppConfig: any;

@autoinject
export class AuthenticationService {
  public rolePrefix: string;
  private user: User;

  private timeoutTimer: any = null;
  private logoutTimer: any = null;
  private sessionTimeout: number = 3000000;
  private sessionRefreshTimeout: number = 600000;

  constructor(
    private dialogService: DialogService,
    private http: HttpClient,
    private ea: EventAggregator
  ) {
    oeAppConfig.ea = this.ea;

    this.http = new HttpClient();
    this.http.configure(x => {
      x.withBaseUrl(oeAppConfig.baseUrl);
      x.withHeader('Accept', 'application/json');
      x.withInterceptor({
        request(res) {
          oeAppConfig.ea.publish('requestSuccess');
          return res;
        },
        responseError(res) {
          console.debug(res.response);
          RestMessage.display({ result: MessageParser.parseHttpResponseMessage(res) });
          return res;
        }
      });
    });

    this.timeoutTimer = setTimeout(() => {
      this.sessionRefreshTimer();
    }, this.sessionTimeout);

    this.ea.subscribe('requestSuccess', response => {
      this.refreshTimer();
    });
  }

  public loadUser(content) {
    this.user = content ? new User(content.actor, content.attributes,
      content.groups, content.organisatieCode,
      content.personid, content.persoonsgegevens, content.sso_token, content.userid) : null;
  }

  public getUser() {
    return this.user;
  }

  public getSsoToken() {
    if (this.user) {
      return this.user.ssoToken;
    }
    return null;
  }

  public isBeheerder() {
    if (this.user) {
      return this.user.hasRole(this.rolePrefix + 'beheerder');
    }
    return false;
  }

  public isToevoeger() {
    if (this.user) {
      return this.user.hasRole(this.rolePrefix + 'toevoeger');
    }
    return false;
  }

  public isLezer() {
    if (this.user) {
      return this.user.hasRole(this.rolePrefix + 'lezer');
    }
    return false;
  }

  public canEdit() {
    return this.isBeheerder() || this.isToevoeger();
  }

  public canDelete() {
    return this.isBeheerder();
  }

  public isIntern() {
    return this.isBeheerder() || this.isToevoeger() || this.isLezer();
  }

  public getHighestRole(): string {
    if (this.isBeheerder()) {
      return 'Beheerder';
    } else if (this.isToevoeger()) {
      return 'Toevoeger';
    } else {
      return 'Lezer';
    }
  }

  // Session checks
  private refreshTimer() {
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = null;
    clearTimeout(this.logoutTimer);
    this.logoutTimer = null;
    this.timeoutTimer = setTimeout(() => {
      this.sessionRefreshTimer();
    }, this.sessionTimeout);
  }

  private refreshSession() {
    this.refreshTimer();
    this.http.createRequest('/user')
      .asGet().withHeader('OpenAmSSOID', this.getSsoToken()).send()
      .then(data => {
        if (this.user) {
          this.user.ssoToken = data.content.sso_token;
        }
      });
  }

  private sessionRefreshTimer() {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }

    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
    this.logoutTimer = setTimeout(() => {
      this.sessionTimedOut();
    }, this.sessionRefreshTimeout);

    return this.dialogService.open({
      viewModel: PLATFORM.moduleName('services/dialogs/timer-dialog'),
      model: this
    }).whenClosed(response => {
      if (!response.wasCancelled) {
        this.refreshSession();
      }
    });
  }

  private sessionTimedOut() {
    this.dialogService.controllers.forEach(controller => {
      controller.cancel();
    });

    this.dialogService.open({
      viewModel: PLATFORM.moduleName('services/dialogs/session-dialog'),
      model: this
    });
  }
}
