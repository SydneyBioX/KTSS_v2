import React, { Component } from "react";
import { useForm, useRef, useState, useEffect } from "react"
import rangeSlider from 'range-slider-input';
import 'range-slider-input/dist/style.css';
import SwitchSelector from "react-switch-selector";
import Switch from '@mui/material/Switch';
import { 
    Slider, 
    Button
    } from "@material-tailwind/react";

import "./index.css"
import "./App.css"
import { AccordionCustomStyles } from "./components/Selection/AccordionCustomStyles";
import { ColorSlider } from "./components/Selection/ColorSlider";
import { ColorSwitches } from "./components/Selection/ColorSwitches";
import { ColorButtons } from "./components/Selection/ColorButtons";
import { DropdownSelect } from "./components/Selection/DropdownSelect";

const App = () => {

    
  
    const [formData, setFormData] = useState({age: 50, gender: "F", state: "NSW"})
    const [age, setAge] = useState(50)
    const [gender, setGender] = useState(true)

    const selectRef = useRef(null)
    const checkboxRef = useRef(null);

    const handleChange = (event) => {
        const { name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
    }

    const changeAge = (event) => {
        setAge(event.target.value)
    }

    const changeGender = (newValue) => {
        /*setGender(newValue)*/
        console.log(newValue)
    }

    const onChange = (newValue) => {
        console.log(newValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Checkbox value:", checkboxRef.current.checked);
        console.log("Select value:", selectRef.current.value);
        alert("Name:", formData.age, "Gender:", checkboxRef.current.checked, "state:", selectRef.current.value)
    }

     return (
       
       <div className="app" style={{ border: "20px", margin: "20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
        <div className="d-flex aligh-items-start bg-light mb-3">
            <h2>Recipient Selection</h2>
            <form onSubmit={handleSubmit}>

            <label htmlFor="age">
                <Slider 
                axis="x"  
                min = {0} 
                max = {80} 
                step = {5} 
                x = {age.x} 
                valueLabelDisplay="auto"
                onChange = {({x}) =>setAge(age => ({...age, x}))} />
            </label>

            <input
                    type='range'
                    onChange={changeAge}
                    min={0}
                    max={80}
                    step={5}
                    value={age}
                    className='custom-slider'>
            </input>

            <input type = "text" id = "age" value = {formData.age}
                onChange = {handleChange}
            />
            <label>
                Gender
                <input type="checkbox" ref={checkboxRef} />
            </label>
            <label>
            Diabetes
            </label>
            <DropdownSelect />
            <ColorSlider />
            <ColorSwitches />
            <ColorButtons />
            <Button>Generate</Button>
            </form>
        </div>
        <div className="d-flex align-items-start bg-light mb-3" style={{ height: "100px" }}>
            Current Offer
            <AccordionCustomStyles />
        </div>
        <div className="d-flex align-items-start bg-light mb-3" style={{ height: "100px" }}>
            <h2>Offers Plot</h2>
            
            
        </div>
        
        
       </div>
    );
}

export default App;