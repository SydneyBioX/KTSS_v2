import React, { useState, useEffect } from "react";
import KNN from 'ml-knn';
import "../../App.css"
// import { marks, kdriMarks, states, blGroups, hlas, chartLabel } from "./variables"
// import {ageText, donorAgeText, praText, kdriText } from "./functions.js"
import { marks, states, blGroups, hlas, chartLabel } from "./variables"
import {ageText, donorAgeText, praText, kdpiText } from "./functions.js"
// import { generateResults } from "./generateResults";
import {Form, Row, Col} from "react-bootstrap"
import Typography from '@mui/joy/Typography';
import { Select, Option } from "@material-tailwind/react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Switch from '@mui/joy/Switch';
import {Input} from "@material-tailwind/react";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

const SelectionCard2024 = ({simData, setUpdatedClass, setUpdatedSelection, setUpdatedResults, setUpdatedKDPI}) => {
  // const [praAllowableValues, setPraAllowableValues] = useState([]);
  // const [donorAgeRangeValues, setDonorAgeRangeValues] = useState([]);
  // const [donorAgeMarks, setDonorAgeMarks] = useState([]);
  // const [kdriRangeValues, setKdriRangeValues] = useState([]);
  
  const [age, setAge] = useState(50)
  const [donorAge, setDonorAge] = useState(50)
  // const [donorAge, setDonorAge] = useState(donorAgeRangeValues[0])
  const [waittime, setWaittime] = useState(35)
  const [gender, setGender] = useState(false)
  const [donorGender, setDonorGender] = useState(false)
  // const [pra, setPra] = useState(praAllowableValues[0])
  const [pra, setPra] = useState(10)
  // const [kdri, setKdri] = useState(kdriRangeValues[0])
  // const [kdri, setKdri] = useState(0.5)
  const [kdpi, setKdpi] = useState(50)
  const [blGroup, setBlGroup] = useState(1)
  const [donorBlGroup, setDonorBlGroup] = useState(1)
  const [stateValue, setStateValue] = useState(1)
  const [donorStateValue, setDonorStateValue] = useState(1)
  const [diabetes, setDiabetes] = useState(true)
  const [donorDiabetes, setDonorDiabetes] = useState(true)
  const [hlaA, setHlaA] = useState(0)
  const [hlaB, setHlaB] = useState(0)
  const [hlaDr, setHlaDr] = useState(0)
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /* function adjustedHLA(hla) {
    if (hla === 0) {
      // If hla is 0, adjusted hla can be either 0 or 1
      return Math.random() < 0.5 ? 0 : 1;
    } else if (hla === 2) {
      // If hla is 2, adjusted hla can be either 2 or 1
      return Math.random() < 0.5 ? 2 : 1;
    } else {
      // If hla is 1, adjusted hla can be either 0, 1, or 2
      const randomAdjustment = Math.floor(Math.random() * 3) - 1; // Random value between -1 and 1
      return hla + randomAdjustment;
    }
  } */

  // const findFirstMatch = (data) => {
  //   let firstMatch = null;
  //   let waittimeFound = null;
  //   /* const genderValue = gender? 1 : 0
  //   const diabetesValue = diabetes? 1 : 0
  //   const donorGenderValue = donorGender? 1 : 0
  //   const donorDiabetesValue = donorDiabetes? 1 : 0 */
  //   let recip_age = age
  //   let donor_age = donorAge
  //   //let wt = waittime
  //   // let current_hlaA = hlaA
  //   // let current_hlaB = hlaB
  //   // let current_hlaDr = hlaDr

  //   while (!waittimeFound) {
  //     waittimeFound = data.find(item => 
  //       //item.wait_time === wt
  //       item.wait_time === waittime  
  //     )

  //     console.log("Waittime found", waittimeFound)
  //     if (!waittimeFound) {
  //       wt = waittime + getRandomInt(-5, 5);
  //     }  
  //   }

  //   if (waittimeFound) {
  //     while (!firstMatch) {
  //       firstMatch = data.find(item => 
  //         // item.wait_time === wt &&
  //         // item.recip_age === recip_age && 
  //         // item.donor_age === donor_age 
  //         item.wait_time === waittime &&
  //         item.recip_age === age && 
  //         item.donor_age === donorAge 
  //         //&&
  //         // item.tx_misa === current_hlaA &&
  //         // item.tx_misb === current_hlaB &&
  //         // item.tx_misdr === current_hlaDr
  //         )
        
  //         if (!firstMatch) {
  //           recip_age = age + getRandomInt(-5, 5); // Adjust age randomly within the range [-3, 3]
  //           donor_age = donorAge + getRandomInt(-15, 15); // Adjust donorAge randomly within the range [-3, 3]
  //           // current_hlaA = adjustedHLA(hlaA)
  //           // current_hlaB = adjustedHLA(hlaB)
  //           // current_hlaDr = adjustedHLA(hlaDr)
  
  //         }
  //         //console.log("First match check: ", waittime, recip_age, donor_age)
  //     }
  
    
  //   }

  //   return (firstMatch)
  // }

  const generateResults = (event) => {
    
    console.log("wait time", waittime)
    setUpdatedClass("show")
    setUpdatedSelection("selectionAfter")
    setUpdatedKDPI(kdpi)
    // const avgAge = age.reduce((a,b) => a + parseFloat(b),0) / age.length
    // const avgPra = pra.reduce((a,b) => a + parseFloat(b),0) / pra.length
    const genderValue = gender? 1 : 0
    const diabetesValue = diabetes? 1 : 0
    const donorGenderValue = donorGender? 1 : 0
    // const avgKdri = kdri.reduce((a,b) => a + parseFloat(b),0) /kdri.length
    const donorDiabetesValue = donorDiabetes? 1 : 0
    // const avgDonorAge = donorAge.reduce((a,b) => a + parseFloat(b),0) / donorAge.length
    const dataLabel = [age, blGroup, stateValue, donorBlGroup, donorStateValue, kdpi, donorAge, pra, genderValue, donorGenderValue, diabetesValue, donorDiabetesValue, hlaA, hlaB, hlaDr]
    
    // const firstMatch = findFirstMatch(simData)
    // console.log("First match", firstMatch)

    // console.log("Average age", avgAge)
    // console.log("Average pra", avgPra)
    console.log("Data Label", dataLabel)

    console.log("simData", simData)
    
    const trainingData = simData.map(item => 
      [
      item.recip_age,
      item.blgroup,
      parseInt(item.state),
      item.donorBlgroup,
      parseInt(item.donorState),
      item.kdpi,
      item.donor_age,
      item.recip_pra,
      item.gender,
      item.donorGender,
      item.diabetes,
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
      wait_time: res.wait_time,
      tx_misa: res.tx_misa,
      tx_misb: res.tx_misb,
      tx_misdr: res.tx_misdr,
      kdpi: res.kdpi
    }))

    console.log("totalResult", totalResult)

    let grpResult = totalResult.reduce((acc, cv) => {
      if (!acc[cv.seq]) {
          acc[cv.seq] = {};
          acc[cv.seq].seq = cv.seq;
          acc[cv.seq].count = acc[cv.seq].kidney_quality = acc[cv.seq].predictsurvprob= acc[cv.seq].wait_time= acc[cv.seq].tx_misa= acc[cv.seq].tx_misb= acc[cv.seq].tx_misdr= acc[cv.seq].kdpi = 0
      }
      acc[cv.seq].count++;
      acc[cv.seq].kidney_quality += cv.kidney_quality;
      acc[cv.seq].predictsurvprob += cv.predictsurvprob;
      acc[cv.seq].wait_time += cv.wait_time;
      acc[cv.seq].tx_misa += cv.tx_misa;
      acc[cv.seq].tx_misb += cv.tx_misb;
      acc[cv.seq].tx_misdr += cv.tx_misdr;
      acc[cv.seq].kdpi += cv.kdpi;
      return acc;
    }, {});
  
    console.log("Group Result", grpResult)

    const avgResult = Object.keys(grpResult).map(key => {
      let { seq, kidney_quality, predictsurvprob, wait_time, tx_misa, tx_misb, tx_misdr, kdpi, count } = grpResult[key];
      return {
        seq, 
        kidney_quality: kidney_quality / count, 
        predictsurvprob: predictsurvprob / count, 
        wait_time: wait_time / count,
        tx_misa: tx_misa / count,
        tx_misb: tx_misb / count,
        tx_misdr: tx_misdr / count,
        kdpi: kdpi / count
      };
  })
    
  console.log("Average result", avgResult)
    
    console.log("Chart Label", chartLabel, chartLabel[0].offer)

    // const firstResult = {
    //   kidney_quality: parseInt(firstMatch.kidney_quality*100),
    //   predictsurvprob: parseInt(firstMatch.predictsurvprob*100),
    //   wait_time: firstMatch.wait_time,
    //   tx_misa: firstMatch.tx_misa,
    //   tx_misb: firstMatch.tx_misb,
    //   tx_misdr: firstMatch.tx_misdr,
    //   kdpi: Math.round(firstMatch.kdpi, 2),
    //   offer: chartLabel[0].offer
    // }

    // console.log("First result", firstResult)

    let finalRes = avgResult.map((res, idx) => ({
      kidney_quality: res.kidney_quality,
      predictsurvprob: res.predictsurvprob,
      wait_time: res.wait_time,
      tx_misa: res.tx_misa,
      tx_misb: res.tx_misb,
      tx_misdr: res.tx_misdr,
      kdpi: res.kdpi,
      offer: chartLabel[idx].offer
    }))

    //finalRes[0] = firstResult

    console.log("Final results", finalRes)
    setUpdatedResults(finalRes)

    event.preventDefault()
    
    // const formData = new FormData(event.target)
    // const payload = Object.fromEntries(formData)

    // console.log(payload)
  }; 

  /* const handleWaittime = (v) => {
    console.log("Selected waittime", v)
    setWaittime(v)
  } */

//   const onChangeWaittime = (target) => {console.log("Input event", target.value)
// setWaittime(target.value)}

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
            <Form.Label className="labelPos">Age</Form.Label>
          
              <Slider
                  getAriaLabel={() => 'Age'}
                  value={age}
                  step={1}
                  marks = {marks}
                  onChange={(event) => setAge(event.target.value)}
                  valueLabelDisplay="on"
                  getAriaValueText={ageText}
                />
              
        </Form.Group>

        {/* Wait time */}
        <Form.Group className="mt-3 selectionClass" controlId="formWaittime">
          {/* <Form.Label className="labelPos">Wait time (in months)</Form.Label> */}
          {/* <span className="rounded-full p-1">
              <WaittimeTooltipWithHelperIcon />
          </span> */}
          {/* <Select label="Select Wait Time" onChange={(event) => setWaittime(event)} > */}
          {/* <Select label="Select Wait Time" onChange={(event) => handleWaittime(event)} > */}
          
          {/* {waittimes.map((wt, idx) => (
              <Option value = {wt.value}>{wt.name}</Option>
          ))} */}
            {/* {waittimeValues.map((value) => (
              <Option key = {value} value = {value}>{value}</Option>
          ))}
          </Select> */}
          {/* <Input onChange = {(target) => setWaittime(target.value)} variant="outlined" label="Wait time" placeholder="wait time"/> */}
          <Form.Label className="labelPos">Wait time (in months)</Form.Label>
          
          <Input 
            color="gray"
            value = {waittime} 
            onChange = {({target}) => setWaittime(parseInt(target.value, 10))} 
            style={{width: "200px"}}
            //variant="outlined" 
            //label="Wait time (in months)" 
            //placeholder="Wait time (in months)"
            />
        </Form.Group>

        {/* Gender */}
        <Form.Group className = "switchClass mt-3">
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
                getAriaLabel={() => 'Pra'}
                value={pra}
                // min = {praAllowableValues[0]}
                // max = {praAllowableValues[praAllowableValues.length -1]}
                // step = {praAllowableValues[1]- praAllowableValues[0]}
                step={1}
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
            sx={{ flexWrap: "wrap"}}
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
             <Form.Label className="labelPos">Age</Form.Label>
          
          <Slider
              getAriaLabel={() => 'Age'}
              value={donorAge}
              // min = {donorAgeRangeValues[0]}
              // max = {donorAgeRangeValues[donorAgeRangeValues.length -1]}
              //donorAgeRangeValues[0]}
              // step={1}
              
              step = {1}
              marks = {marks}
              // marks = {donorAgeMarks}
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
           
         {/* Kdpi */}
         <Form.Group className="selectionClass mt-3 mb-3 mr-2">
        <Form.Label className="labelPos">KDPI (%)</Form.Label>
            {/* <Form.Range /> */}
            <Box sx={{ width: "100%", borderRadius: 1}} >
              
              <Slider
                getAriaLabel={() => 'Kdpi range'}
                value={kdpi}
                
               
                step={1}
                marks = {marks}
                min = {0}
                max = {100}
                onChange={(event) => setKdpi(event.target.value)}
                valueLabelDisplay="on"
                getAriaValueText={kdpiText}
              />
            </Box>
          
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

           {/* State */}
        <Form.Group className="radioClass">
        <Form.Label className="labelPos3">Donor State</Form.Label>
          <ToggleButtonGroup 
            sx={{ flexWrap: "wrap"}}
            size = "sm" 
            color="primary"
            onChange={(event, newValue) => setDonorStateValue(newValue)} 
            value={donorStateValue}>
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
              <Option className = "flex" value = {a.value}>{a.name}</Option>
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
                  <Select label="Select HLA DR" value = {hlaDr} onChange={(event) => setHlaDr(event)} >
                  {hlas.map((dr, idx) => (
                      <Option value = {dr.value}>{dr.name}</Option>
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
            className="genButton hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
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