import React from 'react'
import { debugLog } from './lib/logs'

import './App.scss'
import Content from './components/content/Content'
import NavbarHook from 'components/navbar/NavbarHook'
import { BrowserRouter } from 'react-router-dom'
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import ToasterAlert from './lib/material-ui/ToasterAlert'

const theme = createMuiTheme({
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
})

/**
 * App class
 */
class App extends React.Component {
  /**
   * Constructor (React lifecycle)
   */
  constructor (props) {
    super(props)
    debugLog('App::constructor')
    const isConnected = localStorage.getItem('isConnected') !== null && localStorage.getItem('isConnected') !== 'false'
    this.state = {
      isConnected: isConnected
    }
  }

  /**
   * Mount (React lifecycle)
   */
  componentDidMount () {
    debugLog('App::componentDidMount')
  }

  /**
   * Change the IsConnected state
   * @param {Boolean} bool true of false for setting isConnected
   * @param {Boolean} remember set localstore true or false
   */
  changeIsConnected = (bool, remember) => {
    if (remember)
      localStorage.setItem('isConnected', bool.toString())
    this.setState({
      isConnected: bool
    })
  }

  /**
   * Render (React lifecycle)
   */
  render () {
    debugLog('App::render')

    return (
      <ThemeProvider theme={theme}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700&display=swap" />
        <CssBaseline />
        <div className="App">
          <BrowserRouter>
            <ToasterAlert>
              {this.state.isConnected && <NavbarHook isConnected={this.state.isConnected} changeIsConnected={this.changeIsConnected} />}
              <div className="App-content">
                <Content isConnected={this.state.isConnected} changeIsConnected={this.changeIsConnected}/>
              </div>
            </ToasterAlert>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    )
  }
}

export default App
