import React, { useMemo, useState } from 'react'

import 'App.scss'

import Content from './components/content/Content'
import NavbarHook from 'components/navbar/NavbarHook'
import { BrowserRouter } from 'react-router-dom'
import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import ToasterAlert from './lib/material-ui/ToasterAlert'

// @ts-ignore
import BackGroundHeader from './assets/dashboard_background.jpg'
// @ts-ignore
import BackGroundHeaderNight from './assets/dashboard_background_night3.jpg'

const themeRoot = {
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          margin: 0,
          height: '100vh',
          width: '100vw',
          backgroundImage: 'url('+ BackGroundHeader +')',
          backgroundSize: 'cover',
          backgroundColor: 'transparent'
        },
        '*::-webkit-scrollbar-track': {
          borderRadius: '10px',
          background: 'rgba(255,255,255,0)'
        },
        '*::-webkit-scrollbar':{
          width: '12px',
          backgroundColor: '#F5F5F5'
        },
        '*::-webkit-scrollbar-thumb':{
          borderRadius: '10px',
          background: 'rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)'
        }
      }
    },
    MuiPickersBasePicker: {
      pickerView:{
        background: 'transparent'
      },
      container: {
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '1em',
        boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '20px'
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(255,255,255,0)'
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: 'rgba(255,255,255,0.2)'
      },
      root: {
        background: 'rgba(255,255,255,0.2)'
      }
    }
  },
  typography: {
    fontFamily: 'Poppins, Arial'
  },
  palette: {
    primary: {
      main: '#2A9D8F'
    },
    secondary: {
      main: '#2A9D8F'
    },
    error: {
      main: '#d13055'
    },
    warning: {
      main: '#ffc300'
    },
    info: {
      main: '#007dd1'
    },
    success: {
      main: '#18a352'
    }
  }
}

const useStyles = makeStyles(() => ({
  app: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto'
  },
  content: {
    height: '100%'
  }
}))

/**
 * App class
 */
function App () {
  const classes = useStyles()

  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') !== null && localStorage.getItem('darkMode') !== 'false')

  const theme = useMemo(
    () =>
      createMuiTheme({
        ...themeRoot,
        palette: {
          ...themeRoot.palette,
          type: darkMode ? 'dark' : 'light'
        },
        overrides: {
          ...themeRoot.overrides,
          MuiCssBaseline: {
            '@global': {
              body: {
                ...themeRoot.overrides.MuiCssBaseline['@global'].body,
                backgroundImage: darkMode ? 'url('+ BackGroundHeaderNight +')' : 'url('+ BackGroundHeader +')'
              }
            }
          }
        } }),
    [darkMode]
  )

  const [isConnected, setIsConnected] = useState(localStorage.getItem('isConnected') !== null && localStorage.getItem('isConnected') !== 'false')

  /**
   * Change the IsConnected state
   * @param {Boolean} bool true of false for setting isConnected
   * @param {Boolean} remember set localstore true or false
   */
  function changeIsConnected (bool, remember) {
    if (remember)
      localStorage.setItem('isConnected', bool.toString())
    setIsConnected(bool)
  }

  /**
   * Switch mode
   */
  function switchMode () {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode', (!darkMode).toString())
  }

  return (
    <ThemeProvider theme={theme}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700&display=swap" />
      <CssBaseline />
      <div className={classes.app}>
        <BrowserRouter>
          <ToasterAlert>
            {isConnected && <NavbarHook isConnected={isConnected} changeIsConnected={changeIsConnected} switchMode={switchMode}/>}
            <div className={classes.content}>
              <Content isConnected={isConnected} changeIsConnected={changeIsConnected}/>
            </div>
          </ToasterAlert>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
