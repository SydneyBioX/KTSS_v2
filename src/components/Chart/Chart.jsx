import React from 'react'
import { Scatterplot } from '../Scatterplot/Scatterplot'

const width = 500;
const height = 500;

const Chart = ({finalResults}) => {
  const reverseResult = [...finalResults].reverse();
  console.log("Reverse", reverseResult)

  return (<>
      {finalResults && finalResults.length > 0 &&
        <Scatterplot data={reverseResult} width={width} height={height} /> 
      }
  </>)
}

export default Chart