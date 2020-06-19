import { HttpClient } from 'aurelia-http-client';
import { AuthenticationService } from './authentication-service';
export declare class ActorenApiService {
    protected http: HttpClient;
    protected authService: AuthenticationService;
    rolePrefix: string;
    constructor(http: HttpClient, authService: AuthenticationService);
    getActorByUri(actorUri: string): Promise<any>;
}
