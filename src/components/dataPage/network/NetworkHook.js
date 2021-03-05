import React from 'react'

import './Network.scss'
import { debugLog } from '../../../lib/logs'
import { H1 } from '@blueprintjs/core'
import Graph from 'react-graph-vis'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'

/**
 * NetworkHook class
 */
function NetworkHook (props) {
  debugLog('Network::constructor')

  const graph = {
    nodes: props.network.nodes,
    edges: props.network.edges
  }

  const options = {
    autoResize: true,
    layout: {
      hierarchical: true
    },
    edges: {
      color: '#000000'
    },
    height: '500px'
  }

  const events = {
    select: () => {
    }
  }

  return(
    <Paper className="Network">
      <H1>Network</H1>
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={() => {}}
      />
    </Paper>
  )
}

NetworkHook.propTypes = {
  network: PropTypes.object.isRequired
}

export default NetworkHook
