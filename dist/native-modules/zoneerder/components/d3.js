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
export function setupD3(container, targetX) {
    if (!container) {
        return;
    }
    ;
    container.innerHTML = '';
    var width = 350;
    var height = 200;
    var marginTop = 20;
    var marginRight = 0;
    var marginBottom = 30;
    var marginLeft = 0;
    function render_area_chart() {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                response = { 0.0: -0.0, 0.1: 0.0, 0.2: 0.0, 0.3: 0.0, 0.4: 0.0, 0.5: 0.0, 0.6: 0.0, 0.7: 0.0, 0.8: 0.0, 0.9: 0.0, 1.0: 1.7, 1.1: -7.2, 1.2: -7.2, 1.3: -7.2, 1.4: -7.2, 1.5: -7.2, 1.6: -7.2, 1.7: -7.2, 1.8: -7.2, 1.9: -7.2, 2.0: -7.2, 2.1: -7.2, 2.2: -7.2, 2.3: -7.2, 2.4: -7.2, 2.5: 8.5, 2.6: 8.5, 2.7: 8.5, 2.8: 8.5, 2.9: 8.5, 3.0: 8.5, 3.1: 8.5, 3.2: 8.5, 3.3: 8.5, 3.4: 8.5, 3.5: 8.5, 3.6: 8.5, 3.7: 8.5, 3.8: 8.5, 3.9: 8.5, 4.0: 8.5, 4.1: 8.5, 4.2: 8.5, 4.3: 8.5, 4.4: 8.5, 4.5: 8.5, 4.6: 8.5, 4.7: 8.5, 4.8: 8.5, 4.9: 8.5, 5.0: 8.5, 5.1: 8.5, 5.2: 8.5, 5.3: 8.5, 5.4: 8.5, 5.5: 8.5, 5.6: 8.5, 5.7: 8.5, 5.8: 8.5, 5.9: 8.5, 6.0: 8.5 };
                data = Object.entries(response).map(function (_a) {
                    var x = _a[0], y = _a[1];
                    return ({ x: parseFloat(x), y: Math.abs(y) });
                });
                data = data.sort(function (d1, d2) { return d1.x - d2.x; });
                render_data(data);
                return [2];
            });
        });
    }
    render_area_chart();
    function render_data(data) {
        var x = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return d.x; }))
            .range([marginLeft, width - marginRight - marginLeft]);
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d.y; })])
            .range([height - marginBottom, marginTop]);
        var area = d3.area()
            .x(function (d) { return x(d.x); })
            .y0(y(0))
            .y1(function (d) { return y(d.y); })
            .curve(d3.curveStepAfter);
        var svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%;");
        svg.append("path")
            .attr("fill", "rgb(251,225,198)")
            .attr("d", area(data));
        var xAxis = d3.axisBottom(x);
        svg.append("g")
            .attr("transform", "translate(".concat(marginLeft, ",").concat(height - marginBottom, ")"))
            .call(xAxis);
        var point = data.find(function (d) { return d.x === targetX; });
        if (point) {
            svg.append("circle")
                .attr("cx", x(point.x))
                .attr("cy", y(point.y))
                .attr("r", 5)
                .attr("fill", '#944EA1');
            svg.append("text")
                .attr("x", x(point.x) - 10)
                .attr("y", y(point.y) + 4)
                .attr("text-anchor", "end")
                .attr("font-size", "14px")
                .attr("fill", '#944EA1')
                .text(point.y + ' m²');
        }
        container.append(svg.node());
    }
}

//# sourceMappingURL=d3.js.map
