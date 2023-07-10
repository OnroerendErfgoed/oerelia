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
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { RestMessage } from '../utilities/message/restMessage';
import { MessageParser } from '../utilities/message/messageParser';
import { sortBy } from 'lodash';
import { Niscode } from './models/niscode.enum';
var AdresregisterService = (function () {
    function AdresregisterService(http) {
        this.http = http;
        this.landen = [];
        this.provincies = [];
        this.gemeenten = [];
        this.gemeentenVlaamsGewest = [];
        this.gemeentenWaalsGewest = [];
        this.gemeentenBHGewest = [];
        this.http.configure(function (x) {
            x.withBaseUrl(oeAppConfig.crabpyUrl);
            x.withHeader('Accept', 'application/json');
            x.withHeader('X-Requested-With', '');
            x.withInterceptor({
                responseError: function (res) {
                    RestMessage.display({ result: MessageParser.parseHttpResponseMessage(res) });
                    throw res;
                }
            });
        });
    }
    AdresregisterService.prototype.getLanden = function () {
        return __awaiter(this, void 0, void 0, function () {
            var landen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.landen && this.landen.length) {
                            return [2, this.landen];
                        }
                        return [4, this.crabGet('adressenregister/landen')];
                    case 1:
                        landen = _a.sent();
                        this.landen = sortBy(landen, 'naam');
                        return [2, this.landen];
                }
            });
        });
    };
    AdresregisterService.prototype.getProvincies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var provinciesVlaamsGewest, provinciesWaalsGewest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.provincies && this.provincies.length > 0) {
                            return [2, this.provincies];
                        }
                        return [4, this.getProvinciesPerGewest(Niscode.VlaamsGewest)];
                    case 1:
                        provinciesVlaamsGewest = _a.sent();
                        return [4, this.getProvinciesPerGewest(Niscode.WaalsGewest)];
                    case 2:
                        provinciesWaalsGewest = _a.sent();
                        this.provincies = this.provincies.concat(provinciesVlaamsGewest, provinciesWaalsGewest);
                        return [2, sortBy(this.provincies, 'naam')];
                }
            });
        });
    };
    AdresregisterService.prototype.getProvinciesPerGewest = function (niscode) {
        return this.crabGet("adressenregister/gewesten/" + niscode + "/provincies");
    };
    Object.defineProperty(AdresregisterService.prototype, "vlaamseGemeenten", {
        get: function () {
            return this.gemeentenVlaamsGewest;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdresregisterService.prototype, "waalseGemeenten", {
        get: function () {
            return this.gemeentenWaalsGewest;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdresregisterService.prototype, "brusselseGemeenten", {
        get: function () {
            return this.gemeentenBHGewest;
        },
        enumerable: true,
        configurable: true
    });
    AdresregisterService.prototype.getGemeenten = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gewesten, gemeentenPromises, gemeenten;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gemeenten && this.gemeenten.length) {
                            return [2, this.gemeenten];
                        }
                        return [4, this.crabGet('adressenregister/gewesten')];
                    case 1:
                        gewesten = _a.sent();
                        gemeentenPromises = [];
                        gewesten.forEach(function (gewest) { return gemeentenPromises.push(_this.getGemeentenPerGewest(gewest.niscode)); });
                        return [4, Promise.all(gemeentenPromises)];
                    case 2:
                        gemeenten = _a.sent();
                        if (gemeenten[0] && gemeenten[1] && gemeenten[2]) {
                            this.gemeentenVlaamsGewest = gemeenten[0];
                            this.gemeentenWaalsGewest = gemeenten[1];
                            this.gemeentenBHGewest = gemeenten[2];
                            this.gemeenten = this.gemeenten.concat(this.gemeentenVlaamsGewest, this.gemeentenWaalsGewest, this.gemeentenBHGewest);
                            return [2, sortBy(this.gemeenten, 'naam')];
                        }
                        return [2, []];
                }
            });
        });
    };
    AdresregisterService.prototype.getGemeentenPerGewest = function (niscode) {
        return this.crabGet("adressenregister/gewesten/" + niscode + "/gemeenten");
    };
    AdresregisterService.prototype.getPostinfo = function (gemeente) {
        return this.crabGet("adressenregister/gemeenten/" + gemeente + "/postinfo");
    };
    AdresregisterService.prototype.getStraten = function (gemeente) {
        return this.crabGet("adressenregister/gemeenten/" + gemeente + "/straten");
    };
    AdresregisterService.prototype.getAdressen = function (straat, huisnummer) {
        if (huisnummer) {
            return this.crabGet("adressenregister/straten/" + straat + "/huisnummers/" + huisnummer);
        }
        return this.crabGet("adressenregister/straten/" + straat + "/adressen");
    };
    AdresregisterService.prototype.suggestLocatie = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (value === '') {
                    return [2, []];
                }
                return [2, this.crabGet('geolocation/?locatie=' + value.toLowerCase() + '*')];
            });
        });
    };
    AdresregisterService.prototype.geolocate = function (value) {
        return this.crabGet('geolocation/' + value);
    };
    AdresregisterService.prototype.crabGet = function (endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.http.get(endpoint)];
                    case 1: return [2, (_a.sent()).content];
                }
            });
        });
    };
    AdresregisterService = __decorate([
        inject(HttpClient),
        __metadata("design:paramtypes", [HttpClient])
    ], AdresregisterService);
    return AdresregisterService;
}());
export { AdresregisterService };

//# sourceMappingURL=adresregister.api-service.js.map
