var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { RestMessage } from '../utilities/message/restMessage';
import { MessageParser } from '../utilities/message/messageParser';
import { Message } from '../utilities/message/message';
var IdServiceApiService = (function () {
    function IdServiceApiService(http) {
        this.http = http;
        this.http = new HttpClient();
        this.http.configure(function (x) {
            x.withHeader('Accept', 'application/json');
            x.withInterceptor({
                responseError: function (res) {
                    RestMessage.display({ result: MessageParser.parseHttpResponseMessage(res) });
                    return res;
                }
            });
        });
    }
    IdServiceApiService.prototype.getReferencesByUri = function (uri) {
        return this.http.createRequest(oeAppConfig.idServiceUrl + "/registry/references?uri=" + uri)
            .asGet()
            .withHeader('OpenAmSSOID', this.ssoToken)
            .send()
            .then(function (response) {
            RestMessage.display({ result: MessageParser.parseHttpResponseMessage(response) });
            if (response.isSuccess) {
                return response.content;
            }
        });
    };
    IdServiceApiService.prototype.getByUri = function (uri, getSso) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, _d, locationResponse, _e, _f, _g, _h, content, etag, e_1, e_2;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 8, , 9]);
                        _b = (_a = this.http.createRequest("" + (oeAppConfig.idServiceUrl + '/uris?uri=' + uri))
                            .asGet()).withHeader;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4, getSso()];
                    case 1: return [4, _b.apply(_a, _c.concat([_d + (_j.sent())]))
                            .send()];
                    case 2:
                        response = _j.sent();
                        if (!response.content.location) return [3, 7];
                        _j.label = 3;
                    case 3:
                        _j.trys.push([3, 6, , 7]);
                        _f = (_e = this.http.createRequest(response.content.location).asGet()).withHeader;
                        _g = ['Authorization'];
                        _h = 'Bearer ';
                        return [4, getSso()];
                    case 4: return [4, _f.apply(_e, _g.concat([_h + (_j.sent())]))
                            .send()];
                    case 5:
                        locationResponse = _j.sent();
                        content = locationResponse.content;
                        etag = locationResponse.headers.get('ETag');
                        return [2, __assign(__assign({}, locationResponse), { content: __assign(__assign({}, content), { etag: etag }) })];
                    case 6:
                        e_1 = _j.sent();
                        return [2];
                    case 7: return [3, 9];
                    case 8:
                        e_2 = _j.sent();
                        Message.error({
                            title: 'Fout',
                            message: 'Er ging iets mis bij het ophalen van uri: ' + uri
                        });
                        return [2];
                    case 9: return [2];
                }
            });
        });
    };
    IdServiceApiService = __decorate([
        autoinject,
        __metadata("design:paramtypes", [HttpClient])
    ], IdServiceApiService);
    return IdServiceApiService;
}());
export { IdServiceApiService };

//# sourceMappingURL=id-service.api-service.js.map
