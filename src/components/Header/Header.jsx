import React from 'react'
import Logo from "../../assets/images/ktss_logo.png"
import "../../App.css"

const Header = () => {
  return <header className='header'>
      <div className='rectangle' />
      <div className='overlap'>
        <span><img src={Logo} alt=" " className="centreImg" /></span>
      </div>
  </header>
}

export default Header