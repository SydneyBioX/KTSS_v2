import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
// import { Scatterplot } from '../Scatterplot/Scatterplot'

// const width = 500;
// const height = 500;

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart2024 = ({finalResults}) => {
  const reverseResult = [...finalResults].reverse();
  console.log("Reverse", reverseResult)

  const data = reverseResult.map((res) => ({
    label: res.offer,
    x: res.kidney_quality,
    y: res.predictsurvprob,
    z: res.wait_time,

  }));

  console.log(data)

  const options = {
    animationEnable: true,
    exportEnable: true,
    title: {
        text: "Offered kidney and predicted survivor probability",
        theme: "light1",
        fontSize: 24,
    },
    axisX: {
        title: "Kidney Quality (%)"
    },
    axisY: {
        title: "Survivor Probability (%)"
    },
    data: [{
        type: "bubble",
        indexLabel: "{label}",
        toolTipContent: "<b>{label}</b><br>Kidney Quality: {x}<br>Predictive survive probability: {y}<br>Wait time: {z}" ,
        dataPoint: Object.values(data)
    }]
    
  }

  console.log("Options:", options)

  return (<>
      {finalResults && finalResults.length > 0 &&
       <CanvasJSChart options = {options} />
        // <Scatterplot data={reverseResult} width={width} height={height} /> 
      }
  </>)
}

export default Chart2024