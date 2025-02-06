import React, {useState} from 'react'
import {Typography} from "@material-tailwind/react";
import Chart from '../components/Chart/Chart'
import Result2024 from '../components/Results/Result2024'
import SelectionCard2024 from '../components/Selection/SelectionCard2024'
import Header from '../components/Header/Header'
import "../App.css"
import simData from "../../src/assets/data/kidney_data.json"


const KTSS = () => {
  
  console.log("KTSS simData", simData)

  const simDataWithKdpi = simData.map(item => {
    const kdpi = Math.round(item.donor_rank * 100)

    // Add kdpi to the item object
    return {
      ...item,
      kdpi: kdpi,
      wait_time: Math.round(item.wait_time)
    };
  });

  const [visibilityClass, setVisibilityClass] = useState("hide")
  const [selection, setSelection] = useState("selectionBefore")
  const [finalResults, setFinalResults] = useState("")

  const [currentKDPI, setCurrentKDPI] = useState(0)

  const setUpdatedClass = (updatedClass) => {
    setVisibilityClass(updatedClass)
  }

  const setUpdatedSelection = (updatedSelection) => {
    setSelection(updatedSelection)
  }

  const setUpdatedResults = (updatedResults) => {
    setFinalResults(updatedResults)
  }

  const setUpdatedKDPI = (updatedKDPI) => {
    setCurrentKDPI(updatedKDPI)
  }

  console.log("final results", finalResults)
  return ( 
  <>
  
    {simData && simData.length > 0 &&
    <div className="ktss-container">
      <Header />
    
        <div className={selection} >
          <Typography variant="h4" className="sub-heading font-normal uppercase justify-center">Selections</Typography>
          <SelectionCard2024
              simData = {simDataWithKdpi} 
              setUpdatedClass = {setUpdatedClass}
              setUpdatedSelection = {setUpdatedSelection}
              setUpdatedResults = {setUpdatedResults}
              setUpdatedKDPI = {setUpdatedKDPI}
               />
        </div>
        
        <div className={visibilityClass}>
          <Typography variant="h4" className="result_sub-heading font-normal uppercase justify-center">Results</Typography>
          <Result2024
            finalResults = {finalResults}
            currentKDPI = {currentKDPI}
            />
        </div>
        <div className={visibilityClass} >
        <span><Typography variant="h4" className="result_sub-heading font-normal uppercase justify-center">Charts and table</Typography></span>
        <span className="chartClass"><Chart
              finalResults = {finalResults}
              currentKDPI = {currentKDPI}
              />
              </span>
        </div>
       
    </div>
     
    }
    
  </>
    
  )
}

export default KTSS