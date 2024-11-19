import * as d3 from 'd3';
import { Diffs } from 'zoneerder/models/contour';

interface Datapoint {
  x: number,
  y: number
}

let x, y, chartData = undefined;

export function setupD3(container: HTMLElement, data: Diffs,  relevanteAfstanden: number[]) {
  if (!container) { return }
  container.innerHTML = '';
  // Declare the chart dimensions and margins.
  const width = 350;
  const height = 200;
  const marginTop = 20;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 0;

  async function render_area_chart(data: Diffs) {
    let floatedData = Object.entries(data).map(([x, y]) => ({x: parseFloat(x), y: Math.abs(y)}));
    floatedData = floatedData.sort((d1, d2) => d1.x - d2.x);
    render_data(floatedData);
  }

  void render_area_chart(data);

  function render_data(data: Datapoint[]) {
    // Declare the x (horizontal position) scale.
    chartData = data;
    x = d3.scaleLinear()
    .domain(d3.extent(data, function (d: Datapoint) { return d.x }))
    .range([marginLeft, width - marginRight - marginLeft]);

    // Declare the y (vertical position) scale.
    y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)] as number[])
      .range([height - marginBottom, marginTop]);

    const area = d3.area<Datapoint>()
      .x(d => x(d.x))
      .y0(y(0)) // Set y0 to the minimum value of your y scale
      .y1(d => y(d.y))
      .curve(d3.curveStepAfter);

    // Create the SVG container.
    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%;");
    // height: auto;

    // Append a path for the area (under the axes).
    svg.append("path")
      .attr("fill", "rgb(251,225,198)")
      .attr("d", area(data));

    // Create and append the x-axis.
    const xAxis = d3.axisBottom(x)
    svg.append("g")
      .attr("transform", `translate(${marginLeft},${height - marginBottom})`)
      .call(xAxis);

    container.append(svg.node()!);

    drawNewCircle(relevanteAfstanden[0], chartData);
  }
}

export function removePoint() {
  const circle = d3.select('svg').selectAll('circle')
  circle.remove();
  const text = d3.select('svg').selectAll('text.circle-label');
  text.remove();
}

export function drawNewCircle(targetX: number, data = chartData) {
  const point = data?.find((d: Datapoint) => d.x === targetX);

  if (!point) { return; }

  const map = d3.select('svg');
  // Add a marker for the point.
  map.append("circle")
    .attr("cx", x(point.x))
    .attr("cy", y(point.y))
    .attr("r", 5)
    .attr("fill", '#944EA1');

    map.append("text")
    .attr("x", x(point.x) < 50 ? x(point.x) + 10 : x(point.x) - 10) // Adjust position based on x value
    .attr("y", y(point.y) - 5) // Adjust this value to center the text vertically
    .attr("text-anchor", x(point.x) < 50 ? "start" : "end") // Adjust text-anchor based on x value
    .attr("font-size", "14px") // Set the font size
    .attr("fill", '#944EA1') // Set the fill color
    .attr("class", "circle-label")
    .text(point.y + ' m²');
}
