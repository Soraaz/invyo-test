import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { debugLog } from '../../lib/logs'
import SignInHook from '../signIn/SignInHook'
import PropTypes from 'prop-types'
import TasksPageHook from '../tasksPage/TasksPageHook'
import DataPageHook from '../dataPage/DataPageHook'
import NetworkHook from 'components/dataPage/network/NetworkHook'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  content: {
    marginTop: '5vh',
    paddingTop: '15px',
    paddingLeft: '15px'
  }
}))

/**
 * Content class
 */
function Content (props) {
  debugLog('Content::render')

  const classes = useStyles()

  return (
    <div className={classes.content} style={ { marginTop: !props.isConnected ? 0 : '5vh' } }>
      <Switch>
        {!props.isConnected ? <Route path={'/login'} component={() => <SignInHook isConnected={props.isConnected} changeIsConnected={props.changeIsConnected} />} /> : null}
        {props.isConnected ? <Route path={'/data'} component={DataPageHook} /> : null}
        {props.isConnected ? <Route path={'/network'} component={NetworkHook} /> : null}
        {props.isConnected ? <Route path={'/todo'} component={TasksPageHook} /> : null}
        {!props.isConnected
          ? <Route path={'/'} component={() => <SignInHook isConnected={props.isConnected}
            changeIsConnected={props.changeIsConnected} />} />
          : <Route path={'/'} component={TasksPageHook} />
        }
      </Switch>
    </div>
  )
}

Content.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  changeIsConnected: PropTypes.func.isRequired
}

export default Content
