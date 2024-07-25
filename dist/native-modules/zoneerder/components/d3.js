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
import * as d3 from 'd3';
export function setupD3(container) {
    var width = 350;
    var height = 200;
    var marginTop = 20;
    var marginRight = 30;
    var marginBottom = 30;
    var marginLeft = 40;
    function render_area_chart() {
        return __awaiter(this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                data = [
                    {
                        date: '2007-04-23',
                        close: 10
                    },
                    {
                        date: '2007-04-24',
                        close: 25
                    },
                    {
                        date: '2007-04-25',
                        close: 45
                    },
                    {
                        date: '2007-04-26',
                        close: 70
                    },
                ];
                response = data.map(function (data) {
                    var date = d3.timeParse("%Y-%m-%d")(data.date);
                    if (date === null) {
                        throw new Error("Invalid date ".concat(data.date));
                    }
                    return {
                        date: date,
                        close: +data.close
                    };
                });
                render_data(response);
                return [2];
            });
        });
    }
    render_area_chart();
    function render_data(data) {
        var x = d3.scaleUtc()
            .domain((d3.extent(data, function (d) { return d.date; })))
            .range([marginLeft, width - marginRight]);
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d.close; })])
            .range([height - marginBottom, marginTop]);
        var area = d3.area()
            .x(function (d) { return x(d.date); })
            .y0(y(0))
            .y1(function (d) { return y(d.close); });
        var svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");
        svg.append("path")
            .attr("fill", "rgb(251,225,198)")
            .attr("d", area(data));
        container.append(svg.node());
    }
}

//# sourceMappingURL=d3.js.map
