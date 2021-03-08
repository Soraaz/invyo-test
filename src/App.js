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
      light: '#d2f7e5',
      main: '#2A9D8F',
      dark: '#083a4b'
    },
    secondary: {
      light: '#d2f7e5',
      main: '#2A9D8F',
      dark: '#083a4b'
    },
    error: {
      light: '#fcdbd5',
      main: '#d13055',
      dark:'#640941'
    },
    warning: {
      light: '#fff7cc',
      main: '#ffc300',
      dark:'#7a5100'
    },
    info: {
      light: '#caf4fc',
      main: '#007dd1',
      dark:'#002464'
    },
    success: {
      light: '#cffad0',
      main: '#18a352',
      dark:'#044e40'
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
    App.toaster = {
      text: '',
      time: 0,
      state: ''
    }
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
   * Show toast
   *
   * @param intent Intent
   * @param message Message
   * @param timeout Timeout
   */
  static showToast = (intent, message, timeout) => {
    debugLog('App::showToast')
    App.toaster = {
      state: intent,
      text: message,
      time: timeout ? timeout : 5000
    }
  }

  /**
   * Change the IsConnected state
   * @param bool Boolean true of false for setting isConnected
   */
  changeIsConnected = (bool) => {
    localStorage.setItem('isConnected', bool)
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
            {this.state.isConnected && <NavbarHook isConnected={this.state.isConnected} changeIsConnected={this.changeIsConnected} />}
            {/* <ToasterAlert time={App.toaster.time} text={App.toaster.text} state={App.toaster.state}/> */}

            <div className="App-content">
              <Content isConnected={this.state.isConnected} changeIsConnected={this.changeIsConnected}/>
            </div>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    )
  }
}

App.toaster = {}

export default App
