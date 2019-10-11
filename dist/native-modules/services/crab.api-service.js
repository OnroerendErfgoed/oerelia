var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { Gemeente, Huisnummer, Straat } from './models/locatie';
import { RestMessage } from '../message/restMessage';
import { MessageParser } from '../message/messageParser';
var CrabService = (function () {
    function CrabService(http) {
        this.http = http;
        this.landen = [];
        this.provincies = [];
        this.gemeenten = [];
        this.http.configure(function (x) {
            x.withBaseUrl(oeAppConfig.crabpyUrl);
            x.withHeader('Accept', 'application/json');
            x.withHeader('X-Requested-With', '');
            x.withInterceptor({
                responseError: function (res) {
                    RestMessage.display({ result: MessageParser.parseHttpResponseMessage(res) });
                    return res;
                }
            });
        });
    }
    CrabService.prototype.getLanden = function () {
        var _this = this;
        if (this.landen && this.landen.length > 0) {
            return new Promise(function (resolve) {
                resolve(_this.landen);
            });
        }
        else {
            return this.crabGet('crab/landen').then(function (response) {
                if (response.isSuccess) {
                    _this.landen = response.content;
                    _this.landen.sort(_this.compare);
                    return _this.landen;
                }
                return [];
            });
        }
    };
    CrabService.prototype.getProvincies = function () {
        var _this = this;
        if (this.provincies && this.provincies.length > 0) {
            return new Promise(function (resolve) {
                resolve(_this.provincies);
            });
        }
        else {
            return this.crabGet('crab/gewesten/2/provincies').then(function (response) {
                if (response.isSuccess) {
                    _this.provincies = response.content;
                    _this.provincies.sort(_this.compare);
                    return _this.provincies;
                }
                return [];
            });
        }
    };
    CrabService.prototype.getGemeentenByProvincie = function (provincie) {
        var _this = this;
        return this.crabGet("crab/provincies/" + provincie + "/gemeenten").then(function (response) {
            if (response.isSuccess) {
                var gemeenten = response.content.map(function (el) {
                    return new Gemeente(el.naam, el.id, el.niscode);
                });
                gemeenten.sort(_this.compare);
                return gemeenten;
            }
            return [];
        });
    };
    CrabService.prototype.getGemeenten = function () {
        var _this = this;
        if (this.gemeenten && this.gemeenten.length > 0) {
            return new Promise(function (resolve) {
                resolve(_this.gemeenten);
            });
        }
        else {
            return Promise.all([
                this.crabGet('crab/gewesten/1/gemeenten'),
                this.crabGet('crab/gewesten/2/gemeenten'),
                this.crabGet('crab/gewesten/3/gemeenten')
            ]).then(function (responses) {
                if (responses[0].isSuccess && responses[1].isSuccess && responses[2].isSuccess) {
                    _this.gemeenten = _this.gemeenten.concat(responses[0].content, responses[1].content, responses[2].content);
                    _this.gemeenten = _this.gemeenten.map(function (el) {
                        return new Gemeente(el.id, el.naam, el.niscode);
                    });
                    _this.gemeenten.sort(_this.compare);
                    return _this.gemeenten;
                }
                return [];
            });
        }
    };
    CrabService.prototype.getDeelgemeenten = function (gemeente) {
        return this.crabGet("crab/gemeenten/" + gemeente + "/deelgemeenten").then(function (response) {
            if (response.isSuccess) {
                return response.content;
            }
            return [];
        });
    };
    CrabService.prototype.getPostcodes = function (gemeente) {
        return this.crabGet("crab/gemeenten/" + gemeente + "/postkantons").then(function (response) {
            if (response.isSuccess) {
                return response.content;
            }
            return [];
        });
    };
    CrabService.prototype.getStraten = function (gemeente) {
        return this.crabGet("crab/gemeenten/" + gemeente + "/straten").then(function (response) {
            if (response.isSuccess) {
                var straten = response.content.map(function (el) {
                    return new Straat(el.id, el.label);
                });
                return straten;
            }
            return [];
        });
    };
    CrabService.prototype.getHuisnrs = function (straat) {
        return this.crabGet("crab/straten/" + straat + "/huisnummers").then(function (response) {
            if (response.isSuccess) {
                var huisnummers = response.content.map(function (el) {
                    return new Huisnummer(el.id, el.label);
                });
                huisnummers.sort(function (a, b) {
                    return parseInt(a.naam, 0) - parseInt(b.naam, 0);
                });
                return huisnummers;
            }
            return [];
        });
    };
    CrabService.prototype.suggestLocatie = function (value) {
        if (value === '') {
            return Promise.resolve([]);
        }
        return this.crabGet('geolocation/?locatie=' + value.toLowerCase() + '*')
            .then(function (response) {
            if (response.isSuccess) {
                return response.content;
            }
            return [];
        });
    };
    CrabService.prototype.geolocate = function (value) {
        return this.crabGet('geolocation/' + value)
            .then(function (response) {
            if (response.isSuccess) {
                return response.content;
            }
            else {
                return null;
            }
        });
    };
    CrabService.prototype.compare = function (a, b) {
        if (a.naam < b.naam) {
            return -1;
        }
        else if (a.naam > b.naam) {
            return 1;
        }
        else {
            return 0;
        }
    };
    CrabService.prototype.crabGet = function (endpoint) {
        return this.http.get(endpoint);
    };
    CrabService = __decorate([
        inject(HttpClient),
        __metadata("design:paramtypes", [HttpClient])
    ], CrabService);
    return CrabService;
}());
export { CrabService };
