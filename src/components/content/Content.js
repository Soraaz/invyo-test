import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './Content.scss'

import { debugLog } from '../../lib/logs'
import SignIn from '../signIn/SignIn';
import PropTypes from 'prop-types';
import TasksPage from '../tasksPage/TasksPage';
import Navbar from '../navbar/Navbar';
import DataPage from '../dataPage/DataPage';

/**
 * Content class
 */
class Content extends React.Component {
  /**
   * Constructor (React lifecycle)
   */
  constructor (props) {
    debugLog('Content::constructor');
    super(props);
  }

  /**
   * Render
   */
  render () {
    debugLog('Content::render')

    return (
      <div className="Content">
        <BrowserRouter>
          <Navbar isConnected={this.props.isConnected} changeIsConnected={this.props.changeIsConnected} />
          <Switch>
            {!this.props.isConnected ? <Route path={'/login'} component={() => <SignIn isConnected={this.props.isConnected} changeIsConnected={this.props.changeIsConnected} />} /> : null}
            {this.props.isConnected ? <Route path={'/data'} component={DataPage} /> : null }
            {this.props.isConnected ? <Route path={'/todo'} component={TasksPage} /> : null }
            {!this.props.isConnected
              ? <Route path={'/'} component={() => <SignIn isConnected={this.props.isConnected}
                changeIsConnected={this.props.changeIsConnected}/>}/>
              : <Route path={'/'} component={TasksPage}/>
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

export default Content;
