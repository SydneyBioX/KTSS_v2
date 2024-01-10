import React from 'react'
import { Scatterplot } from '../Scatterplot/Scatterplot'
// import {
//     ScatterChart,
//     Scatter,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     LabelList,
//     ZAxis,
//     Label,
//     Legend
//   } from "recharts";

const width = "400px";
const height = "400px";

const Chart2 = ({finalResults}) => {
  const chartLabel = [
    {
        offer: "First"
    },
    {
        offer: "Second"
    },
    {
        offer: "Third"
    },
    {
        offer: "Fourth"
    }
  ]

  const combineRes = finalResults.map((res, key) => [
        ...finalResults,
        chartLabel[key]
    ])

  console.log("Combine result", combineRes)

  return (<>
   {/* <div>Input values:</div>
    <div><p>First kdri: {kdri}</p></div>
    <div><p>Selected age: {selectedAge}</p></div>
    <div><p>Selected wait time: {selectedWaittime}</p></div>
    <div><p>Selected pra: {selectedPra}</p></div>
    <div><p>Selected blood type: {selectedBlGroup}</p></div>
    <div><p>Selected state: {selectedState}</p></div>
      */}
      {finalResults && finalResults.length > 0 &&
      <Scatterplot data={combineRes} width={width} height={height} /> 
    // <ScatterChart
    //   width={500}
    //   height={500}
    //   margin={{
    //     top: 20,
    //     right: 20,
    //     bottom: 20,
    //     left: 20
    //   }}
    // >
    //   <CartesianGrid range = {[0, 100]} />
    //   <XAxis type="number" dataKey="kidney_quality" name="Kidney Quality" range = {[0,100]} unit="%">
    //   <Label
    //         style={{
    //             top: "-100px !important",
    //             textAnchor: "middle",
    //             fontSize: "130%",
    //             fill: "black",
    //         }}
    //         value={"Kidney Quality"} />
    //   </XAxis>
    //   <YAxis type="number" range = {[0,100]} dataKey="predictsurvprob" name="Survival Probability" unit="%">
    //     <Label
    //         style={{
    //             left: "10px",
    //             textAnchor: "middle",
    //             fontSize: "130%",
    //             fill: "black",
    //         }}
    //         angle = {-90}
    //         value={"Survival Probability"} />
    //   </YAxis>
    //   <ZAxis type="number" dataKey="wait_time" range={[600, 1000]} name="wait-time" unit="month">
    //   <Label
    //         style={{
    //             left: "10px",
    //             textAnchor: "middle",
    //             fontSize: "130%",
    //             fill: "black",
    //         }}
    //         value={combineRes.offer} />
    //   </ZAxis>
    //   <Tooltip cursor={{ strokeDasharray: "10 10" }} />
    //   <Scatter name="Offered kidney and predicted survivor probability" data={finalResults} stroke= "black" opacity={0.6} fill="#82ca9d" shape = "star" >
    //     <LabelList dataKey="wait_time" />
    //   </Scatter>
    // </ScatterChart>
      }
  </>)
}

export default Chart2