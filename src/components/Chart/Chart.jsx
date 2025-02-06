import React from 'react'
import { Scatterplot } from '../Scatterplot/Scatterplot'
import { ScatterplotKW } from '../Scatterplot/ScatterplotKW.jsx'
import { SummaryTable } from './summaryTable.jsx';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const width = "600";
const height = "600";

const Chart = ({finalResults, currentKDPI}) => {
  const newResults = [...finalResults]
  if (newResults.length > 0) {
    const updatedFirstObject = { ...newResults[0], kidney_quality: 100 - currentKDPI };
    newResults[0] = updatedFirstObject;
  }
  //newResults[0]["kdpi"]  = 1 - currentKDPI;
  const reverseResult = [...newResults].reverse();
  console.log("Reverse", reverseResult)

  return (<>
      {finalResults && finalResults.length > 0 &&
      <div>
      <Tabs value="kw">
        <TabsHeader>
          <Tab value = "kw" className = "border border-grey">
              Kidney quality and wait time
          </Tab>
          <Tab value = "kp" className = "border border-grey">
              Kidney quality and survivor probability
          </Tab>
          <Tab value = "st" className = "border border-grey">
              Summary table
          </Tab>
        </TabsHeader>
        <TabsBody>
            <TabPanel value = "kw">
              <ScatterplotKW data={reverseResult} width={width} height={height} /> 
            </TabPanel>
            <TabPanel value = "kp">
              <Scatterplot data={reverseResult} width={width} height={height} /> 
            </TabPanel>
            <TabPanel value = "st">
            <SummaryTable data={reverseResult} className="table-auto w-full border-collapse border border-gray-300" />
            </TabPanel>
        </TabsBody>
      </Tabs>
      </div>
      }
      
  </>)
}

export default Chart