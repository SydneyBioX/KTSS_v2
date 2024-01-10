import React from 'react'
import ReactDOM from 'react-dom/client'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import App from "./App"
import "./index.css";
import "./App.css"

import { ThemeProvider } from "@material-tailwind/react";
import { StyledEngineProvider } from '@mui/styled-engine-sc';

/**ReactDOM.render(<App />, document.getElementById("root"));*/

const root = ReactDOM.createRoot(document.getElementById("root"));
 
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);