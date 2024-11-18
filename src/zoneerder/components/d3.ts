import * as d3 from 'd3';
import { Diffs } from 'zoneerder/models/contour';

interface Datapoint {
  x: number,
  y: number
}

let x, y, chartData = undefined;

export function setupD3(container: HTMLElement, data: Diffs,  relevanteAfstanden: number[], setRelevanteAfstandFn: CallableFunction) {
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

    //position markers for each relevante Afstand
    relevanteAfstanden.forEach((afstand) => {
      drawNewCircle(afstand, data, true, setRelevanteAfstandFn);
    })

    drawNewCircle(relevanteAfstanden[0], chartData);
  }
}

export function removeRelevanteAfstandMarker() {
  const circle = d3.select('svg').selectAll('circle.selected-afstand-marker')
  circle.remove();
  const text = d3.select('svg').selectAll('text.selected-afstand-marker-label')
  text.remove();
}

export function drawNewCircle(targetX: number, data = chartData, isPredictionMarker = false, setRelevanteAfstandFn: CallableFunction = null) {
  const point = data?.find((d: Datapoint) => d.x === targetX);

  if (!point) { return; }

  const map = d3.select('svg');
  const grey = '#9F9F9F';
  const circle = map.append("circle")
    .attr("cx", x(point.x))
    .attr("cy", y(point.y))
    .attr("r", isPredictionMarker ? 4 : 5)
    // Add a class to the circle, so we can style it with CSS and select the point
    .attr('class', isPredictionMarker? 'prediction-marker-'+point.x : 'selected-afstand-marker')
    .attr("fill", isPredictionMarker ? 'transparent' : '#944EA1')
    .attr("stroke", isPredictionMarker ? '#9F9F9F' : '#944EA1');

  const label = map.append("text")
    .attr("x", x(point.x) < 50 ? x(point.x) + 10 : x(point.x) - 10) // Adjust position based on x value
    .attr("y", y(point.y) - 5) // Adjust this value to center the text vertically
    .attr("text-anchor", x(point.x) < 50 ? "start" : "end") // Adjust text-anchor based on x value
    .attr("font-size", "14px") // Set the font size
    .attr("fill", isPredictionMarker ? '#9F9F9F' : '#944EA1') // Set the fill color
    .attr("class", "circle-label " + (isPredictionMarker ? 'invisible prediction-marker-label-' + point.x : 'selected-afstand-marker-label'))
    .text(point.y + ' m²');

  if (isPredictionMarker && setRelevanteAfstandFn) {
    // onclick, execute dataChanged function
    // and make .prediction-marker-label visible
    circle.on("click", () => {
      setRelevanteAfstandFn(point.x);
    });
    circle.on("mouseover", () => {
      label.attr("class", "circle-label visible prediction-marker-label-" + point.x);
    });
    circle.on("mouseout", () => {
      label.attr("class", "circle-label invisible prediction-marker-label-" + point.x);
    });
  }
}
