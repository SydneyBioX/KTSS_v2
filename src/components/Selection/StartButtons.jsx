import React from 'react'
import { useNavigate } from "react-router-dom"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const StartButtons = () => {
  let navigate = useNavigate()

  const routeChange = () => {
    navigate("/ktss")
  }

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="success" style={{height: "80px", width: "140px", background: "#b1d474", color: "black", fontSize: "30px"}} onClick={routeChange}>
        START
      </Button>
    </Stack>
  )
}

export default StartButtons