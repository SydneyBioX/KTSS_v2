import React, {useState} from 'react'
import {Typography} from "@material-tailwind/react";
import Chart from '../components/Chart/Chart'
import Result2024 from '../components/Results/Result2024'
import SelectionCard2024 from '../components/Selection/SelectionCard2024'
import Header from '../components/Header/Header'
import "../App.css"
import simData from "../../src/assets/data/kidney_data.json"

const marks =[
  {
    value: 0,
    label: '0'
  },
  {
    value: 10,
    label: '10'
  },
  {
    value: 20,
    label: '20'
  },
  {
    value: 30,
    label: '30'
  },
  {
    value: 40,
    label: '40'
  },
  {
    value: 50,
    label: '50'
  },
  {
    value: 60,
    label: '60'
  },
  {value: 70,
    label: '70'
  },
  {
    value: 80,
    label: '80'
  },
  {
    value: 90,
    label: '90'
  },
  {
    value: 100,
    label: '100'
  }
]

const KTSS = () => {
  
  console.log("KTSS simData", simData)

  const [visibilityClass, setVisibilityClass] = useState("hide")
  const [selection, setSelection] = useState("selectionBefore")
  const [finalResults, setFinalResults] = useState("")

  const setUpdatedClass = (updatedClass) => {
    setVisibilityClass(updatedClass)
  }

  const setUpdatedSelection = (updatedSelection) => {
    setSelection(updatedSelection)
  }

  const setUpdatedResults = (updatedResults) => {
    setFinalResults(updatedResults)
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
              simData = {simData} 
              setUpdatedClass = {setUpdatedClass}
              setUpdatedSelection = {setUpdatedSelection}
              setUpdatedResults = {setUpdatedResults}
              marks = {marks}
               />
        </div>
        
        <div className={visibilityClass}>
          <Typography variant="h4" className="result_sub-heading font-normal uppercase justify-center">Results</Typography>
          <Result2024
            finalResults = {finalResults}
            marks = {marks} 
            />
        </div>
        <div className={visibilityClass} >
        <span><Typography variant="h4" className="result_sub-heading font-normal uppercase justify-center">Chart</Typography></span>
        <span><Chart
              finalResults = {finalResults}
              />
              </span>
        </div>
       
    </div>
     
    }
    
  </>
    
  )
}

export default KTSS