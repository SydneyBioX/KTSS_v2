import React from 'react'
import Slider from '@mui/material/Slider';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";


const testData = [
    {
      "offer": "First",
      "y": 43,
      "size": 20,
      "x": 58,
      "hla": 5
    },
    {
      "offer": "Second",
      "y": 76,
      "size": 36,
      "x": 80,
      "hla": 3
    },
    {
      "offer": "Third",
      "y": 33,
      "size": 20,
      "x": 30,
      "hla": 6
    },
    {
      "offer": "Fourth",
      "y": 10,
      "size": 40,
      "x": 40,
      "hla": 4
    }
  ]  

const ResultOption = ({finalResults, currentQuality, setCurrentQuality, currentProb, setCurrentProb, marks}) => {
     const data = [
          {
            label: "Current offer",
            value: "first",
          },
          {
            label: "Next offer",
            value: "second",
          },
          {
            label: "Third offer",
            value: "third",
          },
          
        ];
       
        return (
          
          <div className='m-3 p-2'>
          <Tabs value="first">
            <TabsHeader>
              {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              <TabPanel key={1} value="first">
                <h2>First Offer</h2>
                  <h3>Kidney Quality (%)</h3>
                  <p>Based on 1 substract donor rank (kdri)</p>
                  <div id="currentQuality">
              
                    <Slider
                      // value={currentQuality}
                      value={[finalResults[1]["kidney_quality"], Math.round(finalResults[2]["kidney_quality"])]}
                      step={10}
                      marks = {marks}
                      onChange={(event) => setCurrentQuality(event.target.value)}
                      valueLabelDisplay="on"
                    />
                  </div>
                  <h3>Survival Probability (%)</h3>
                  <p>10 years survival probability using Cox model</p>
                  <div id="currentProb">
                    <Slider
                        // value={currentProb}
                        value={[finalResults[1]["predictsurvprob"], finalResults[2]["predictsurvprob"]]}
                        step={10}
                        marks = {marks}
                        onChange={(event) => setCurrentProb(event.target.value)}
                        valueLabelDisplay="on"
                      />
                  </div>
                  
                  <h3>Next wait time (in months)</h3>
                  <p>The time when the recipient register until the next offer</p>
                  <h1>{finalResults[1]["wait_time"]}</h1>
                  <h3>HLA</h3>
                  <p>HLA typing is performed to assess the degree of donor/recipient mismatching</p>
                  <h1>{finalResults[1]["tx_misa"] + finalResults[1]["tx_misb"] + finalResults[1]["tx_misdr"]}</h1>
              </TabPanel>
              <TabPanel key={2} value="second">
                <h2>Second Offer</h2>
              <h3>Kidney Quality (%)</h3>
                  <p>Based on 1 substract donor rank (kdri)</p>
                  <h3>Survival Probability (%)</h3>
                  <p>10 years survival probability using Cox model</p>
                  <h3>Next wait time (in months)</h3>
                  <p>The time when the recipient register until the next offer</p>
                  <h3>HLA</h3>
                  <p>HLA typing is performed to assess the degree of donor/recipient mismatching</p>
              </TabPanel>
              <TabPanel key={3} value="third">
                <h2>Third Offer</h2>
                <h3>Kidney Quality (%)</h3>
                  <p>Based on 1 substract donor rank (kdri)</p>
                  <h3>Survival Probability (%)</h3>
                  <p>10 years survival probability using Cox model</p>
                  <h3>Next wait time (in months)</h3>
                  <p>The time when the recipient register until the next offer</p>
                  <h3>HLA</h3>
                  <p>HLA typing is performed to assess the degree of donor/recipient mismatching</p>
              </TabPanel>
              
            </TabsBody>
          </Tabs>
          </div>
  )
}

export default ResultOption