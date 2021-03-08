import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './Content.scss'

import { debugLog } from '../../lib/logs'
import SignIn from '../signIn/SignIn'
import PropTypes from 'prop-types'
import TasksPageHook from '../tasksPage/TasksPageHook'
import Navbar from '../navbar/Navbar'
import DataPageHook from '../dataPage/DataPageHook'
import NetworkHook from 'components/dataPage/network/NetworkHook'

/**
 * Content class
 */
class Content extends React.Component {
  /**
   * Constructor (React lifecycle)
   */
  constructor(props) {
    debugLog('Content::constructor')
    super(props)
  }

  /**
   * Render
   */
  render() {
    debugLog('Content::render')

    return (
      <div className="Content">
        <BrowserRouter>
          <Navbar isConnected={this.props.isConnected} changeIsConnected={this.props.changeIsConnected} />
          <Switch>
            {!this.props.isConnected ? <Route path={'/login'} component={() => <SignIn isConnected={this.props.isConnected} changeIsConnected={this.props.changeIsConnected} />} /> : null}
            {this.props.isConnected ? <Route path={'/data'} component={DataPageHook} /> : null}
            {this.props.isConnected ? <Route path={'/network'} component={NetworkHook} /> : null}
            {this.props.isConnected ? <Route path={'/todo'} component={TasksPageHook} /> : null}
            {!this.props.isConnected
              ? <Route path={'/'} component={() => <SignIn isConnected={this.props.isConnected}
                changeIsConnected={this.props.changeIsConnected} />} />
              : <Route path={'/'} component={TasksPageHook} />
            }
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

Content.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  changeIsConnected: PropTypes.func.isRequired
}

export default Content
