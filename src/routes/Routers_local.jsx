import Home from '../pages/Home'
import KTSS from '../pages/KTSS_local'

/* import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/ktss" element = {<KTSS/>} />
      </Routes>
    </Router>
  )
} */

import { Navigate, Route, Routes, BrowserRouter as Router } from "react-router-dom";

const isAuthVerified = true // write your logic here to view the protected routes

const PrivateRoute = ({ element }) => {
  return isAuthVerified ? element : <Navigate to="/" replace />;
};

const Routers = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        {/* <Route path = "/KTSS" element = {<KTSS />} /> */}
        {/* <Route path = "/" element = {<Home/>} /> */}
        <Route path = "/ktss" element = {<KTSS />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      
      {/* Protected Route */}
      <Route
               path="/dashboard"
               element={<PrivateRoute element={<Home />} />}
            />

            {/* Default Redirect */}
            <Route path="/*" element={<Navigate to="/ktss" />} />
      </Routes>
    </Router>
  )
} 

export default Routers