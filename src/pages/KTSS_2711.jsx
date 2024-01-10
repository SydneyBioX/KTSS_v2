import React, {useState, useEffect} from 'react'
import {Typography} from "@material-tailwind/react";
import Chart from '../components/Chart/Chart'
import Results from '../components/Results/Results'
import TabResults from '../components/Results/TabResults'
import Result2 from '../components/Results/Result2'
import SelectionCard3 from '../components/Selection/SelectionCard3'
import Header from '../components/Header/Header'
import "../App.css"
//import data from 'https://shiny.maths.usyd.edu.au/Marni/Data/kidney_data.json'
import Drawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

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
  const [open, setOpen] = useState(true)
  
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const [simData, setSimData] = useState([])

  const fetchData = () => {
    return fetch("https://shiny.maths.usyd.edu.au/Marni/Data/kidney_data.json")
      .then((response) => response.json())
      .then((data) => setSimData(data))
  }

  useEffect(() => {
    fetchData()
    // simData.map((item, index) => (
    //   item.state = parseInt(item.state)
    // ))
  }, []);

  console.log("KTSS simData", simData)

  const [class1, setClass1] = useState("hide")
  const [selection, setSelection] = useState("selectionBefore")
  const [finalResults, setFinalResults] = useState("")

  const [ selectedAge, setSelectedAge] = useState([50, 60])
  const [ selectedWaittime, setSelectedWaittime] = useState(1)
  const [ selectedPra, setSelectedPra] = useState([10, 20])
  const [ selectedBlGroup, setSelectedBlGroup] = useState("A")
  const [ selectedState, setSelectedState] = useState("NSW")

  const [ currentQuality, setCurrentQuality ] = useState([])
  const [ currentProb, setCurrentProb ] = useState([])
  const setRecipAge = (updatedAge) => {
    console.log("Updated Age", updatedAge)
    setSelectedAge(updatedAge)
  }

  const setRecipWaittime = (updatedWaittime) => {
    console.log("Updated wait time", updatedWaittime)
    setSelectedWaittime(updatedWaittime)
  }

  const setRecipPra = (updatedPra) => {
    console.log("Updated Pra", updatedPra)
    setSelectedPra(updatedPra)
  }

  const setRecipBlGroup = (updatedBlGroup) => {
    setSelectedBlGroup(updatedBlGroup)
  }

  const setRecipState = (updatedState) => {
    setSelectedState(updatedState)
  }

  const setUpdatedClass = (updatedClass) => {
    setClass1(updatedClass)
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
    
    <Header />
    {simData && simData.length > 0 &&
    <div className="ktss-container p-8 m-2">
        <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          
        </Toolbar>
      </AppBar>
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
      <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
            {/* {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
          </IconButton>
        </DrawerHeader>
        <Divider />  
        <div className={selection} >
          <Typography variant="h4" className="sub-heading font-normal uppercase justify-center">Recipient Selection</Typography>
          <SelectionCard3
              simData = {simData} 
              setUpdatedClass = {setUpdatedClass}
              setUpdatedSelection = {setUpdatedSelection}
              setUpdatedResults = {setUpdatedResults}
               />
        </div>
         </Drawer>
        <Main open = {open}>
        <DrawerHeader />
        <div className={class1}>
          <Typography variant="h4" className="sub-heading font-normal uppercase justify-center">Results</Typography>
          <Result2
            finalResults = {finalResults}
            currentQuality = {currentQuality} 
            setCurentQuality = {setCurrentQuality}
            currentProb = {currentProb}
            setCurrentProb = {setCurrentProb}
            marks = {marks} />
        </div>
        <div className={class1} >
        <Typography variant="h4" className="sub-heading font-normal uppercase justify-center">Chart</Typography>
            <Chart
              finalResults = {finalResults}
              kdri = {simData[1].donor_kdri}
              selectedAge = {selectedAge} 
              selectedWaittime = {selectedWaittime} 
              selectedPra = {selectedPra}
              selectedBlGroup = {selectedBlGroup}
              selectedState = {selectedState} />
        </div>
        </Main>
        </Box>
    </div>
     
    }
    
  </>
    
  )
}

export default KTSS