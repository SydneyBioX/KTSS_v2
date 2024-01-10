import React from 'react'
import InstructionPopover from './components/Selection/InstrunctionPopover'
import LearnMorePopover from './components/Selection/LearnMorePopover'
import StartButtons from './components/Selection/StartButtons'
import Logo from "./assets/images/ktss_logo.png"
import KTSS from './pages/KTSS'

const App = () => {
  return (
    <div className='home-banner-container'>
        <div className='home-banner-image d-flex justify-content-center'>
            <img src = {Logo} alt = "" style={{height:400}} />
        </div>
        <div className='home-info-section d-flex justify-content-around'>
          <span><LearnMorePopover /></span>
          <span><InstructionPopover /></span>
        </div>
        <div className='home-button-section d-flex justify-content-center'>
            <StartButtons />
        </div>
        <div>
          <KTSS />
        </div>
    </div>
  )
}

export default App