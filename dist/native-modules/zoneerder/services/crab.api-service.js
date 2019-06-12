import * as toastr from 'toastr';
import { Gemeente, Huisnummer, Straat } from '../models/locatie';
var CrabService = (function () {
    function CrabService(http, crabpyUrl) {
        var _this = this;
        this.http = http;
        this.crabpyUrl = crabpyUrl;
        this.landen = [];
        this.provincies = [];
        this.gemeenten = [];
        this.http.configure(function (x) {
            x.withBaseUrl(_this.crabpyUrl);
            x.withHeader('Accept', 'application/json');
            x.withHeader('X-Requested-With', '');
            x.withInterceptor({
                responseError: function (res) {
                    toastr.error(res.content.message);
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
                return undefined;
            }).catch(function (error) {
                console.debug(error);
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
                return undefined;
            }).catch(function (error) {
                console.debug(error);
            });
        }
    };
    CrabService.prototype.getGemeentenByProvincie = function (provincie) {
        var _this = this;
        return this.crabGet("crab/provincies/" + provincie + "/gemeenten").then(function (response) {
            if (response.isSuccess) {
                var gemeenten = response.content.map(function (el) {
                    return new Gemeente(el.id, el.niscode, el.naam);
                });
                gemeenten.sort(_this.compare);
                return gemeenten;
            }
            return undefined;
        }).catch(function (error) {
            console.debug(error);
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
            return this.crabGet('crab/gewesten/2/gemeenten').then(function (responses) {
                if (responses.isSuccess) {
                    var tempL = void 0;
                    tempL = JSON.parse(responses.response);
                    tempL.sort(_this.compare);
                    tempL.forEach(function (el) {
                        _this.gemeenten.push(new Gemeente(el.id, el.niscode, el.naam));
                    });
                    return _this.gemeenten;
                }
                return undefined;
            }).catch(function (error) {
                console.debug(error);
            });
        }
    };
    CrabService.prototype.getDeelgemeenten = function (gemeente) {
        return this.crabGet("crab/gemeenten/" + gemeente + "/deelgemeenten")
            .then(function (deelgemeenten) {
            if (deelgemeenten.isSuccess) {
                return deelgemeenten.content;
            }
            else {
                return [];
            }
        });
    };
    CrabService.prototype.getPostcodes = function (gemeente) {
        return this.crabGet("crab/gemeenten/" + gemeente + "/postkantons")
            .then(function (postcodes) {
            if (postcodes.isSuccess) {
                return postcodes.content;
            }
            else {
                return [];
            }
        });
    };
    CrabService.prototype.getStraten = function (gemeente) {
        return this.crabGet("crab/gemeenten/" + gemeente + "/straten")
            .then(function (straten) {
            if (straten.isSuccess) {
                var tempL_1 = [];
                straten.content.forEach(function (element) {
                    tempL_1.push(new Straat(element));
                });
                return tempL_1;
            }
            else {
                return [];
            }
        });
    };
    CrabService.prototype.getHuisnrs = function (straat) {
        return this.crabGet("crab/straten/" + straat + "/huisnummers")
            .then(function (huisnrs) {
            if (huisnrs.isSuccess) {
                var data = huisnrs.content.sort(function (a, b) {
                    return parseInt(a.label, 0) - parseInt(b.label, 0);
                });
                var tempL_2 = [];
                data.forEach(function (element) {
                    tempL_2.push(new Huisnummer(element));
                });
                return tempL_2;
            }
            else {
                return [];
            }
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
            else {
                return [];
            }
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
    return CrabService;
}());
export { CrabService };
