import React from 'react'
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import InstructionPopover from '../components/Selection/InstrunctionPopover'
import LearnMorePopover from '../components/Selection/LearnMorePopover'
import StartButtons from '../components/Selection/StartButtons'
import Logo from "../assets/images/ktss_logo.png"
import "../App.css"

function Home() {

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);



  return (<>
  <div className='home-banner-container'>
      <div className='home-banner-image d-flex justify-content-center'>
        <img src={Logo} alt="" style={{ height: 400 }} />
      </div>
      <div className='home-info-section d-flex justify-content-around'>
        <span><LearnMorePopover /></span>
        <span><InstructionPopover /></span>
      </div>
      <div className='home-button-section d-flex justify-content-center'>
        <StartButtons />
      </div>
    </div>
    <div className='particles'>
      <Particles options = {{
        particles: {
          color: {
            value: "#fff"
          },
          number: {
            value: 200
          },
          opacity: {
            value: {min: 0.3, max: 1}
          },
          shape: {
            type: "circle"
          },
          size: {
            value: {min: 2, max: 7}
          },
          move: {
            direction: "bottom-right",
            enable: true,
            speed: {min: 0.3, max: 0.7}
          }
        }
      }} init={particlesInit}  />
  </div>
  </>
   
  )
}

export default Home