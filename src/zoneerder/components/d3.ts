import * as d3 from 'd3';

interface Datapoint {
  x: number,
  y: number
}

let x, y, chartData = undefined;

export function setupD3(container: HTMLElement, targetX: number) {
  if (!container) { return };
  container.innerHTML = '';
  // Declare the chart dimensions and margins.
  const width = 350;
  const height = 200;
  const marginTop = 20;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 0;

  async function render_area_chart() {
    const response = {0.0: -0.0, 0.1: 0.0, 0.2: 0.0, 0.3: 0.0, 0.4: 0.0, 0.5: 0.0, 0.6: 0.0, 0.7: 0.0, 0.8: 0.0, 0.9: 0.0, 1.0: 1.7, 1.1: -7.2, 1.2: -7.2, 1.3: -7.2, 1.4: -7.2, 1.5: -7.2, 1.6: -7.2, 1.7: -7.2, 1.8: -7.2, 1.9: -7.2, 2.0: -7.2, 2.1: -7.2, 2.2: -7.2, 2.3: -7.2, 2.4: -7.2, 2.5: 8.5, 2.6: 8.5, 2.7: 8.5, 2.8: 8.5, 2.9: 8.5, 3.0: 8.5, 3.1: 8.5, 3.2: 8.5, 3.3: 8.5, 3.4: 8.5, 3.5: 8.5, 3.6: 8.5, 3.7: 8.5, 3.8: 8.5, 3.9: 8.5, 4.0: 8.5, 4.1: 8.5, 4.2: 8.5, 4.3: 8.5, 4.4: 8.5, 4.5: 8.5, 4.6: 8.5, 4.7: 8.5, 4.8: 8.5, 4.9: 8.5, 5.0: 8.5, 5.1: 8.5, 5.2: 8.5, 5.3: 8.5, 5.4: 8.5, 5.5: 8.5, 5.6: 8.5, 5.7: 8.5, 5.8: 8.5, 5.9: 8.5, 6.0: 8.5};
    let data = Object.entries(response).map(([x, y]) => ({x: parseFloat(x), y: Math.abs(y)}));
    data = data.sort((d1, d2) => d1.x - d2.x);
    render_data(data);
  }

  render_area_chart();

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

    drawNewCircle(targetX);

    const point = chartData?.find((d: Datapoint) => d.x === targetX);
    // Add a marker for the point.
    if (point) {
      svg.append("circle")
        .attr("cx", x(point.x))
        .attr("cy", y(point.y))
        .attr("r", 5)
        .attr("fill", '#944EA1');

      svg.append("relevanteAfstandText")
        .attr("x", x(point.x) - 10) // Adjust this value to position the text
        .attr("y", y(point.y) + 4) // Adjust this value to center the text vertically
        .attr("text-anchor", "end") // Right align the text
        .attr("font-size", "14px") // Set the font size
        .attr("fill", '#944EA1') // Set the fill color
        .text(point.y + ' m²');
    }

    container.append(svg.node()!);
  }
}

export function removePoint() {
  const circle = d3.select('svg').selectAll('circle')
  circle.remove();
  const text = d3.select('svg').selectAll('relevanteAfstandText')
  text.remove();
}

export function drawNewCircle(targetX: number) {
  const point = chartData?.find((d: Datapoint) => d.x === targetX);

  if (!point) { return; }

  const map = d3.select('svg');
  // Add a marker for the point.
  map.append("circle")
    .attr("cx", x(point.x))
    .attr("cy", y(point.y))
    .attr("r", 5)
    .attr("fill", '#944EA1');

    map.append("relevanteAfstandText")
    .attr("x", x(point.x) - 10) // Adjust this value to position the text
    .attr("y", y(point.y) + 4) // Adjust this value to center the text vertically
    .attr("text-anchor", "end") // Right align the text
    .attr("font-size", "14px") // Set the font size
    .attr("fill", '#944EA1') // Set the fill color
    .text(point.y + ' m²');
}
