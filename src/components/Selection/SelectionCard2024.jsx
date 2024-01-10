import React, { useState} from "react";
import KNN from 'ml-knn';
import "./SelectionCard2024.css"
import {Form, Row, Col} from "react-bootstrap"
import Typography from '@mui/joy/Typography';
import { Select, Option } from "@material-tailwind/react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Switch from '@mui/joy/Switch';

import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

const kdriMarks =[
    {
      value: 0,
      label: '0'
    },
   
    {
      value: 0.5,
      label: '0.5'
    },

    {
      value: 1,
      label: '1'
    }
  ]

function ageText(value) {
  return `${value}`
}

function donorAgeText(value) {
    return `${value}`
  }

function praText(value) {
  return `${value}`
}

function kdriText(value) {
    return `${value}`
  }


const SelectionCard2024 = ({simData, setUpdatedClass, setUpdatedSelection, setUpdatedResults, marks}) => {
  const [age, setAge] = useState([40, 60])
  const [donorAge, setDonorAge] = useState([40, 60])
  const [waittime, setWaittime] = useState(1)
  const [gender, setGender] = useState(false)
  const [donorGender, setDonorGender] = useState(false)
  const [pra, setPra] = useState([10, 20])
  const [kdri, setKdri] = useState([0.7, 0.8])
  const [blGroup, setBlGroup] = useState(1)
  const [donorBlGroup, setDonorBlGroup] = useState(1)
  const [stateValue, setStateValue] = useState(1)
  const [diabetes, setDiabetes] = useState(true)
  const [donorDiabetes, setDonorDiabetes] = useState(true)
  const [hlaA, setHlaA] = useState(0)
  const [hlaB, setHlaB] = useState(0)
  const [hlaDr, setHlaDr] = useState(0)
  
  const states = [
    { name: "ACT", value: 1},
    { name: "NSW", value: 2},
    { name: "NT", value: 3},
  //  { name: "NZ", value: 4},
    { name: "QLD", value: 5},
    { name: "SA", value: 6},
    { name: "TAS", value: 7},
    { name: "VIC", value: 8},
    { name: "WA", value: 9}
  ]

  const blGroups = [
    { name: "A", value: 1},
    { name: "AB", value: 2},
    { name: "B", value: 3},
    { name: "O", value: 4}
  ]

  const waittimes = [
    { name: "0-2 months", value: 1},
    { name: "3-5 months", value: 4},
    { name: "6-8 months", value: 7},
    { name: "9-11 months", value: 10},
    { name: "12-17 months", value: 14},
    { name: "18-23 months", value: 20},
    { name: "24-35 months", value: 30},
    { name: "35 plus months", value: 45},
  ]

  const hlas = [
    {name: "0", value: 0},
    {name: "1", value: 1},
    {name: "2", value: 2},
  ]

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

  

  const generateResults = (event) => {
    

    setUpdatedClass("show")
    setUpdatedSelection("selectionAfter")
    const avgAge = age.reduce((a,b) => a + parseFloat(b),0) / age.length
    const avgPra = pra.reduce((a,b) => a + parseFloat(b),0) / pra.length
    const genderValue = gender? 1 : 0
    const diabetesValue = diabetes? 1 : 0
    const donorGenderValue = donorGender? 1 : 0
    const avgKdri = kdri.reduce((a,b) => a + parseFloat(b),0) /kdri.length
    const donorDiabetesValue = donorDiabetes? 1 : 0
    const avgDonorAge = donorAge.reduce((a,b) => a + parseFloat(b),0) / donorAge.length
    const dataLabel = [avgAge, waittime, genderValue, avgPra, blGroup, stateValue, diabetesValue, avgDonorAge, donorGenderValue, avgKdri, donorBlGroup, donorDiabetesValue, hlaA, hlaB, hlaDr]
    
    console.log("Average age", avgAge)
    console.log("Average pra", avgPra)
    console.log("Data Label", dataLabel)

    console.log("simData", simData)
    
    const trainingData = simData.map(item => 
      [item.recip_age,
      Math.round(item.wait_time),
      item.gender,
      item.recip_pra,
      item.blgroup,
      parseInt(item.state),
      item.diabetes,
      item.donor_age,
      item.donorGender,
      item.donor_kdri,
      item.donorBlgroup,
      item.donorDiabetes,
      item.tx_misa,
      item.tx_misb,
      item.tx_misdr
    ]
    );

    
    console.log("TrainingData", trainingData)

    const trainingLabel = simData.map(item => item.recip_id_new
    )
     
    console.log("Training Label", trainingLabel)
    
    const knn = new KNN(trainingData, trainingLabel, {k : 3})

    console.log("Data label", dataLabel)
    const prediction = knn.predict(dataLabel)
    
    console.log("Prediction", prediction)

    const result = Object.values(simData).filter(item=>item.recip_id_new === prediction) 
    console.log("Result: ", result)
    
    const totalResult = result.map((res, idx) => ({
      seq: (idx % 4) + 1,
      kidney_quality: parseInt(res.kidney_quality*100),
      predictsurvprob: parseInt(res.predictsurvprob*100),
      wait_time: parseInt(res.wait_time),
      tx_misa: res.tx_misa,
      tx_misb: res.tx_misb,
      tx_misdr: res.tx_misdr,
      kdri: Math.round(res.donor_kdri,2)
    }))

    console.log("totalResult", totalResult)

    let grpResult = totalResult.reduce((acc, cv) => {
      if (!acc[cv.seq]) {
          acc[cv.seq] = {};
          acc[cv.seq].seq = cv.seq;
          acc[cv.seq].count = acc[cv.seq].kidney_quality = acc[cv.seq].predictsurvprob= acc[cv.seq].wait_time= acc[cv.seq].tx_misa= acc[cv.seq].tx_misb= acc[cv.seq].tx_misdr= acc[cv.seq].kdri = 0
      }
      acc[cv.seq].count++;
      acc[cv.seq].kidney_quality += cv.kidney_quality;
      acc[cv.seq].predictsurvprob += cv.predictsurvprob;
      acc[cv.seq].wait_time += cv.wait_time;
      acc[cv.seq].tx_misa += cv.tx_misa;
      acc[cv.seq].tx_misb += cv.tx_misb;
      acc[cv.seq].tx_misdr += cv.tx_misdr;
      acc[cv.seq].kdri += cv.kdri;
      return acc;
    }, {});
  
    console.log("Group Result", grpResult)

    const avgResult = Object.keys(grpResult).map(key => {
      let { seq, kidney_quality, predictsurvprob, wait_time, tx_misa, tx_misb, tx_misdr, kdri, count } = grpResult[key];
      return {
        seq, 
        kidney_quality: kidney_quality / count, 
        predictsurvprob: predictsurvprob / count, 
        wait_time: wait_time / count,
        tx_misa: tx_misa / count,
        tx_misb: tx_misb / count,
        tx_misdr: tx_misdr / count,
        kdri: kdri / count
      };
  })
    
  console.log("Average result", avgResult)
    
    console.log("Chart Label", chartLabel, chartLabel[0].offer)

    const finalRes = avgResult.map((res, idx) => ({
      kidney_quality: res.kidney_quality,
      predictsurvprob: res.predictsurvprob,
      wait_time: res.wait_time,
      tx_misa: res.tx_misa,
      tx_misb: res.tx_misb,
      tx_misdr: res.tx_misdr,
      kdri: res.kdri,
      offer: chartLabel[idx].offer
    }))

    console.log("Final results", finalRes)
    setUpdatedResults(finalRes)

    event.preventDefault()
    
    // const formData = new FormData(event.target)
    // const payload = Object.fromEntries(formData)

    // console.log(payload)
  }; 

  return (<>

    {/* <Form className="mb-3 p-3" onSubmit={generateResults}>  */}
    <Form className="mb-3 p-3">
        
          <Row>
            {/*************** RECIPIENT INPUT *****************/}
            <Col lg={6} md={6} sm={12} xs={12} className = "recipInput p-0 m-0">
                <Row>
                    <Col>
                       <Typography variant="h4" className="sub-sub-heading font-normal uppercase justify-center">Recipient Selection</Typography>
                    </Col>
                </Row>
                <Row className="m-1 pt-2">
                   
            <Col>
            <Form.Group className= "selectionClass" controlId="formAge">
           {/* Age */}
            <Form.Label className="labelPos">Age Range</Form.Label>
          
              <Slider
                  getAriaLabel={() => 'Age range'}
                  value={age}
                  step={10}
                  marks = {marks}
                  onChange={(event) => setAge(event.target.value)}
                  valueLabelDisplay="on"
                  getAriaValueText={ageText}
                />
              
        </Form.Group>

        {/* Wait time */}
        <Form.Group className="mt-4" controlId="formWaittime">
          {/* <span className="rounded-full p-1">
              <WaittimeTooltipWithHelperIcon />
          </span> */}
          <Select label="Select Wait Time" value = {waittime} onChange={(event) => setWaittime(event)} >
          {waittimes.map((wt, idx) => (
              <Option value = {wt.value}>{wt.name}</Option>
          ))}
          </Select>
        </Form.Group>

        {/* Gender */}
        <Form.Group className = "switchClass mt-4">
          <Form.Label className="labelPos2">Gender</Form.Label>
          <Switch
              slotProps={{
                track: {
                  children: (
                    <React.Fragment>
                     <Typography component="span" level="inherit" sx={{ ml: '10px' }}>
                        F
                      </Typography>
                      <Typography component="span" level="inherit" sx={{ mr: '8px' }}>
                        M
                      </Typography>
                    
                    </React.Fragment>
                  ),
                },
              }}
              sx={{
                '--Switch-thumbSize': '30px',
                '--Switch-trackWidth': '80px',
                '--Switch-trackHeight': '40px',
              }}
              checked={gender}
              onChange={(event) => setGender(event.target.checked)}
            />
        </Form.Group>

        {/* Pra */}
        <Form.Group className="selectionClass mt-3 mb-3">
        <Form.Label className="labelPos">Pra</Form.Label>
            {/* <Form.Range /> */}
            <Box sx={{ width: "100%", borderRadius: 1}} >
              
              <Slider
                getAriaLabel={() => 'Pra range'}
                value={pra}
                step={10}
                marks = {marks}
                onChange={(event) => setPra(event.target.value)}
                valueLabelDisplay="on"
                getAriaValueText={praText}
              />
            </Box>
            {/* <div>{pra}</div> */}
        </Form.Group>

          {/* Blood Group */}
          <Form.Group className="radioClass mb-3">
          <Form.Label className="labelPos3">Blood group</Form.Label>
            <ToggleButtonGroup 
            size = "sm" 
            variant = "solid"
            color="danger"
            onChange={(e, newValue) => setBlGroup(newValue)} 
            value={blGroup}>
              {blGroups.map((bg, idx) => (
                <Button
                  id={`st-${idx}`}
                  value={bg.value}
                >
                  {bg.name}
                </Button>
              ))}
            </ToggleButtonGroup>
            {/* <div>{blGroup}</div> */}
          </Form.Group>

         {/* State */}
        <Form.Group className="radioClass">
        <Form.Label className="labelPos3">State</Form.Label>
          <ToggleButtonGroup 
            size = "sm" 
            color="primary"
            onChange={(event, newValue) => setStateValue(newValue)} 
            value={stateValue}>
            {states.map((st, idx) => (
              <Button
                id={`st-${idx}`}
                value={st.value}
              >
                {st.name}
              </Button>
            ))}
        </ToggleButtonGroup>
        {/* <div>{stateValue}</div> */}
        </Form.Group>

         {/* Diabetes */}
         <Form.Group className="switchClass mt-3">
         <Form.Label className="labelPos2">Diabetes</Form.Label>
          <Switch
              // color={diabetes ? 'success' : 'success'}
              slotProps={{
                track: {
                  children: (
                    <React.Fragment>
                      <span>
                        <DoneIcon sx={{ ml: "10px", color: diabetes ? 'text.tertiary' : 'success.600' }} />
                      </span>
                      <span>
                        <ClearIcon sx={{ mr: '8px', color: diabetes ? 'danger.500' : 'text.tertiary' }} />
                      </span>
                    </React.Fragment>
                  ),
                },
              }}
              sx={{
                '--Switch-thumbSize': '30px',
                '--Switch-trackWidth': '80px',
                '--Switch-trackHeight': '40px',
              }}
              checked={diabetes}
              onChange={(event) => setDiabetes(event.target.checked)}
            />
          {/* <div>{diabetes?"True": "False"}</div> */}
        </Form.Group>
        </Col>
       </Row>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12} className = "p-0 m-0 donorInput">
                <Row>
                    <Col>
                    <Typography variant="h4" className="sub-sub-heading font-normal uppercase justify-center">Donor Selection</Typography>
                    </Col>
                </Row>
                <Row className = " pt-2 m-1">
                <Col>
                    
            
             
             {/* Donor Age */}
             <Form.Group className= "selectionClass" controlId="formDonorAge">
             <Form.Label className="labelPos">Age Range</Form.Label>
          
          <Slider
              getAriaLabel={() => 'Age range'}
              value={donorAge}
              step={10}
              marks = {marks}
              onChange={(event) => setDonorAge(event.target.value)}
              valueLabelDisplay="on"
              getAriaValueText={donorAgeText}
            />
          
    </Form.Group>

    {/* Gender */}
    <Form.Group className = "switchClass mt-4">
          <Form.Label className="labelPos2">Gender</Form.Label>
          <Switch
              slotProps={{
                track: {
                  children: (
                    <React.Fragment>
                     <Typography component="span" level="inherit" sx={{ ml: '10px' }}>
                        F
                      </Typography>
                      <Typography component="span" level="inherit" sx={{ mr: '8px' }}>
                        M
                      </Typography>
                    
                    </React.Fragment>
                  ),
                },
              }}
              sx={{
                '--Switch-thumbSize': '30px',
                '--Switch-trackWidth': '80px',
                '--Switch-trackHeight': '40px',
              }}
              checked={donorGender}
              onChange={(event) => setDonorGender(event.target.checked)}
            />
        </Form.Group>
           
         {/* Kdri */}
         <Form.Group className="selectionClass mt-3 mb-3 mr-2">
        <Form.Label className="labelPos">Kdri</Form.Label>
            {/* <Form.Range /> */}
            <Box sx={{ width: "100%", borderRadius: 1}} >
              
              <Slider
                getAriaLabel={() => 'Kdri range'}
                value={kdri}
                step={0.1}
                marks = {kdriMarks}
                min = {0}
                max = {1}
                onChange={(event) => setKdri(event.target.value)}
                valueLabelDisplay="on"
                getAriaValueText={kdriText}
              />
            </Box>
            {/* <div>{pra}</div> */}
        </Form.Group> 

         {/* Blood Group */}
          <Form.Group className="radioClass mb-3">
          <Form.Label className="labelPos3">Blood group</Form.Label>
            <ToggleButtonGroup 
            size = "sm" 
            variant = "solid"
            color="danger"
            onChange={(e, newValue) => setDonorBlGroup(newValue)} 
            value={donorBlGroup}>
              {blGroups.map((bg, idx) => (
                <Button
                  id={`st-${idx}`}
                  value={bg.value}
                >
                  {bg.name}
                </Button>
              ))}
            </ToggleButtonGroup>
          </Form.Group>  
        
          <Form.Group className="switchClass mt-3">
         <Form.Label className="labelPos2">Diabetes</Form.Label>
          <Switch
              slotProps={{
                track: {
                  children: (
                    <React.Fragment>
                      <span>
                        <DoneIcon sx={{ ml: "10px", color: diabetes ? 'text.tertiary' : 'success.600' }} />
                      </span>
                      <span>
                        <ClearIcon sx={{ mr: '8px', color: diabetes ? 'danger.500' : 'text.tertiary' }} />
                      </span>
                    </React.Fragment>
                  ),
                },
              }}
              sx={{
                '--Switch-thumbSize': '30px',
                '--Switch-trackWidth': '80px',
                '--Switch-trackHeight': '40px',
              }}
              checked={donorDiabetes}
              onChange={(event) => setDonorDiabetes(event.target.checked)}
            />
          {/* <div>{diabetes?"True": "False"}</div> */}
        </Form.Group>
        </Col>
                </Row>
            </Col>
            </Row>
            <Row>
              <Col className="hlaSelection">
                <Row>
                    <Col className="p-0 m-0">
                       {/* HLA */}
                 <Typography variant="h4" className="sub-sub-heading font-normal uppercase justify-center">HLA Mismatch</Typography>
          
                    </Col>
                </Row>
                <Row>
              <Col xs={4} className="mb-2 mr-2">
                
        <Form.Group className="mt-2 hlaWidth" controlId="formHLAA">
          <Select label="Select HLA A" value = {hlaA} onChange={(event) => setHlaA(event)} >
          {hlas.map((a, idx) => (
              <Option value = {a.value}>{a.name}</Option>
          ))}
          </Select>
        </Form.Group>
              </Col>
              <Col xs={4} className="mb-2 mr-2">
                
        <Form.Group className="mt-2 hlaWidth" controlId="formHLAB">
          <Select label="Select HLA B" value = {hlaB} onChange={(event) => setHlaB(event)} >
          {hlas.map((b, idx) => (
              <Option value = {b.value}>{b.name}</Option>
          ))}
          </Select>
        </Form.Group>
              </Col>
              <Col xs={4} className="mb-2 mr-2">
                <Form.Group className="mt-2 hlaWidth" controlId="formHLAB">
                  <Select label="Select HLA TR" value = {hlaDr} onChange={(event) => setHlaDr(event)} >
                  {hlas.map((tr, idx) => (
                      <Option value = {tr.value}>{tr.name}</Option>
                  ))}
                  </Select>
                </Form.Group>
                      </Col>
            </Row>
                 
              </Col>
              
            </Row>
            
            <Row>
                <Col>
                 {/* GENERATE Button */}
        <div className="d-grid mt-4">
          <Button
            size="lg"
            variant="soft"
            color="primary"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={true}
            fullWidth={true}
            onClick={generateResults}
          >
            Generate
          </Button>
        </div>
                </Col>

            </Row>
        
        
        
    </Form>

    
      </>
  );
}

export default SelectionCard2024