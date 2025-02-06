import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Slider from '@mui/material/Slider';
import { marks, resultText } from "../Selection/variables"
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
  import Tooltip from '@mui/material/Tooltip';


const Result2024 = ({finalResults, currentKDPI}) => {
    //  const resultText = [
    //       {
    //         label: "Current vs Next offer",
    //         value: "first",
    //         text: "Next "
    //       },
    //       {
    //         label: "Current vs Third offer",
    //         value: "second",
    //         text: "Third "
    //       },
    //       {
    //         label: "Current vs Fourth offer",
    //         value: "third",
    //         text: "Fourth "
    //       },
          
    //     ];
       
        return (<>
          {finalResults && finalResults.length > 0 &&
          <div className='m-3 p-2'>
          <Tabs value="first">
            <TabsHeader>
              {resultText.map(({ label, value }) => (
                <Tab key={value} value={value} className = "border border-grey">
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
                {resultText.map((item, index) => (
                     <TabPanel key={index+1} value={item["value"]}>
                     {/* <div className='headText'>{item["label"]}</div> */}
                       <div className='largeText'>Kidney quality (%)</div>
                       {/* <p>Based on 1 substract KDPI</p> */}
                       {/* <div id="currentQuality" className={finalResults[0]["kidney_quality"] > finalResults[index+1]["kidney_quality"]? "reverseSliderPos": "sliderPos"}> */}
                       {/* <div id="currentQuality" className={finalResults[0]["kdpi"] > finalResults[index+1]["kdpi"]? "reverseSliderPos": "sliderPos"}></div> */}
                       <div id="currentQuality" className={currentKDPI > finalResults[index+1]["kdpi"]? "reverseSliderPos": "sliderPos"}>
                         <div class="currentLabel">Current kidney quality</div>
                         <Slider
                          //  value={[finalResults[0]["kidney_quality"], finalResults[index+1]["kidney_quality"]]}
                          //  value={[finalResults[0]["kdpi"], finalResults[index+1]["kdpi"]]}
                           value={[currentKDPI, finalResults[index+1]["kdpi"]]}
                           aria-labelledby="track-false-range-slider"
                           marks = {marks}
                           valueLabelDisplay="on"
                         />
                         <div class="nextLabel">{item["text"]} kidney quality</div>
                         
                       </div>
                       <div className='largeText'>Post-transplant graft survival probability (%)</div>
                       <p>10 years graft survival probability using Cox model</p>
                       <div id="currentProb" className={finalResults[0]["predictsurvprob"] > finalResults[index+1]["predictsurvprob"]? "reverseSliderPos": "sliderPos"}>
                       <div class="currentLabel">Current Probability</div>
                         <Slider
                             value={[finalResults[0]["predictsurvprob"], finalResults[index+1]["predictsurvprob"]]}
                             aria-labelledby="track-false-range-slider"
                             marks = {marks}
                             valueLabelDisplay="on"
                           />
                           <div class="nextLabel">{item["text"]} Probability</div>
                       </div>
                     
                       <Row>
                         <Col className='m-1 rounded border border-dark'>
                           <div className='largeText'><Tooltip title="The time when the recipient register until the next offer">Additional wait time (in months)</Tooltip></div>
                           {/* <span className='rounded-full p-1'><ResultWaittimeTooltipWithHelperIcon /></span> */}
                           <div className='largerText'>{finalResults[index+1]["wait_time"] - finalResults[0]["wait_time"]}</div>
                         </Col>
                       
                         <Col className='m-1 rounded border border-dark'>
                           <div className='largeText'><Tooltip title = "HLA typing is performed to assess the degree of donor/recipient mismatching">HLA (number of mismatches)</Tooltip></div>
                           <div className='largerText'>{finalResults[index+1]["tx_misa"] + finalResults[index+1]["tx_misb"] + finalResults[index+1]["tx_misdr"]}</div>
                         </Col>
                       </Row>
                       
                       
                   </TabPanel>
                ))}
             
            
            </TabsBody>
          </Tabs>
          </div>
              }
              </>
  )
}

export default Result2024