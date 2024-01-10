import Home from '../pages/Home'
import KTSS from '../pages/KTSS_local'

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/ktss" element = {<KTSS/>} />
      </Routes>
    </Router>
  )
}

export default Routers