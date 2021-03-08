import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './Content.scss'

import { debugLog } from '../../lib/logs'
import SignInHook from '../signIn/SignInHook'
import PropTypes from 'prop-types'
import TasksPageHook from '../tasksPage/TasksPageHook'
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
        {/* <Navbar isConnected={this.props.isConnected} changeIsConnected={this.props.changeIsConnected} /> */}
        <Switch>
          {!this.props.isConnected ? <Route path={'/login'} component={() => <SignInHook isConnected={this.props.isConnected} changeIsConnected={this.props.changeIsConnected} />} /> : null}
          {this.props.isConnected ? <Route path={'/data'} component={DataPageHook} /> : null}
          {this.props.isConnected ? <Route path={'/network'} component={NetworkHook} /> : null}
          {this.props.isConnected ? <Route path={'/todo'} component={TasksPageHook} /> : null}
          {!this.props.isConnected
            ? <Route path={'/'} component={() => <SignInHook isConnected={this.props.isConnected}
              changeIsConnected={this.props.changeIsConnected} />} />
            : <Route path={'/'} component={TasksPageHook} />
          }
        </Switch>
      </div>
    )
  }
}

Content.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  changeIsConnected: PropTypes.func.isRequired
}

export default Content
