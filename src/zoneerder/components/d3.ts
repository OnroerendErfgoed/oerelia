import * as d3 from 'd3';

export function setupD3(container: HTMLElement) {
  // Declare the chart dimensions and margins.
  const width = 350;
  const height = 200;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  async function render_area_chart() {
    const data = [
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
      
    let response = data.map((data) => {
      const date = d3.timeParse("%Y-%m-%d")(data.date);
      if (date === null) {
        throw new Error(`Invalid date ${data.date}`);
      }
      return {
        date: date,
        close: +data.close
      }
    })

    render_data(response);
  }

  render_area_chart();

  interface Datapoint {
    date: Date,
    close: number
  }

  function render_data(data: Datapoint[]) {
    // Declare the x (horizontal position) scale.

    const x = d3.scaleUtc()
      .domain((d3.extent(data, function (d: Datapoint) { return d.date })) as [Date, Date])
      .range([marginLeft, width - marginRight]);


    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.close)] as number[])
      .range([height - marginBottom, marginTop]);

    const area = d3.area<Datapoint>()
      .x(d => x(d.date))
      .y0(y(0))
      .y1(d => y(d.close));

    // Create the SVG container.
    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Append a path for the area (under the axes).
    svg.append("path")
      .attr("fill", "rgb(251,225,198)")
      .attr("d", area(data));

    container.append(svg.node()!);
  }
}

// export function setupD3Slider(container: HTMLElement) {
//   // Listen to the slider?
//   d3.select("#mySlider").on("change", function(d){
//     selectedValue = this.value
//     updateChart(selectedValue)
//   })
// }