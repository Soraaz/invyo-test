import React from 'react'
import { debugLog } from './lib/logs'

import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'

import './App.scss'
import { Toaster } from '@blueprintjs/core'
import Content from './components/content/Content'
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
    this.toasterRef = React.createRef()
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
    App.toaster = this.toasterRef.current
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
    if (App.toaster) {
      App.toaster.show({ intent: intent, message: message, timeout: timeout ? timeout : 5000 })
    }
  }

  /**
   * Clear toaster
   */
  static clearToaster = () => {
    debugLog('App::clearToaster')
    if (App.toaster)
      App.toaster.clear()
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
      <div className="App">
        <Toaster className={'Toaster'} ref={this.toasterRef}>
        </Toaster>
        <Content isConnected={this.state.isConnected} changeIsConnected={this.changeIsConnected}/>
      </div>
    )
  }
}

App.toaster = undefined

export default App
