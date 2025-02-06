import * as d3 from "d3";
import styles from "./scatterplot.module.css";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { useState } from "react";
import { Tooltip } from "./Tooltip"

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

// const chartLabel = [
//   {
//       offer: "First"
//   },
//   {
//       offer: "Second"
//   },
//   {
//       offer: "Third"
//   },
//   {
//       offer: "Fourth"
//   }
// ]

// Simplified version of a scatterplot
export const Scatterplot = ({ data, width, height }) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const [hovered, setHovered] = useState({});

  console.log(data)
  data.map((d) => console.log(d.kidney_quality, d.predictsurvprob))
  // Scales
  const yScale = d3.scaleLinear().domain([0, 100]).range([boundsHeight, 0]);
  const xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, boundsWidth]);

  const rScale = d3.scaleLinear().domain([0, 40]).range([10, 30]);
  const oScale = d3.scaleLinear().domain([1, 4]).range([0.4, 1]);
  
  const allOffers = data.map((d) => String(d.wait_time));
  /* const colorScale = d3
    .scaleOrdinal()
    .domain(allOffers)
    .range(["#27621", "#46923c", "#5bb450", "#8bca84"]);
 */
  // Build the shapes
  const allShapes = data.map((d, i) => {
    const className2 =
      hovered && d.wait_time !== hovered
        ? styles.scatterplotCircle + " " + styles.dimmed
        : styles.scatterplotCircle;

    return <>
      <circle
        key={oScale(i)}
        r={rScale(d.wait_time)}
        cx={xScale(d.kidney_quality)}
        cy={yScale(d.predictsurvprob)}
        className={className2}
        stroke="#5fa72f"
      //  stroke={colorScale(d.wait_time)}
      //  fill={colorScale(String(d.wait_time))}
        fill="#5fa72f"
        opacity={oScale(i)}
        //onMouseOver={(e) => handleHover(e)}
        onMouseEnter={() => setHovered({
          xPos: xScale(d.kidney_quality),
          yPos: yScale(d.predictsurvprob),
          //name: "Offers: " +  d.offer})}
          name: `Offer: ${d.offer}\n
          Wait time: ${d.wait_time}\n
          Kidney Quality: ${d.kidney_quality}\n
          Predict Surv prob: ${d.predictsurvprob}`})}
        onMouseLeave={() => setHovered(null)}
      />
      <text dx = {xScale(d.kidney_quality)-7} dy = {yScale(d.predictsurvprob)+5}>{d.wait_time}</text>
      <text dx= {xScale(d.kidney_quality)-15} dy = {yScale(d.predictsurvprob)+30}>{d.offer}</text>
      </>;
  });

  return (
    <div style={{height: boundsHeight + 80,}}>
      <svg width={width} height={height}>
        {/* first group is for the violin and box shapes */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          
        >
          <text dy = {-20} fontSize={20}>Offered kidney and graft survivor probability</text>
          {/* Y axis */}
          <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />
          <text dx = {-250} dy = {-30} transform="rotate(-90)">Graft survivor Probability (%)</text>
          {/* X axis, use an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              height={boundsHeight}
            />
            <text dx = {150} dy = {40}>Kidney Quality (1-KDPI) (%)</text>
          </g>

          {/* Circles */}
          {allShapes}  

        </g>
      </svg>
   
    <div
      style={{
        width: boundsWidth, // the width of the chart area excluding axes = width - left margin
        height: boundsHeight,
        position: "relative",
        top: -500,
        left: 0,
        pointerEvents: "none",
        marginLeft: MARGIN.left,
        marginTop: MARGIN.top,
      }}
    >
      <Tooltip  interactionData={hovered}  />
    </div>
      
    </div>
  );
};
