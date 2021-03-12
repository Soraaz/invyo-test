import React from 'react'

import './Network.scss'
import { debugLog } from '../../../lib/logs'
import Graph from 'react-graph-vis'
import { Paper, Typography } from '@material-ui/core'
// @ts-ignore
import datasFile from '../../../data/data'

/**
 * NetworkHook class
 */
function NetworkHook () {
  debugLog('Network::constructor')

  const graph = {
    nodes: datasFile.network.nodes,
    edges: datasFile.network.edges
  }

  const options = {
    autoResize: true,
    layout: {
      hierarchical: false
    },
    edges: {
      color: '#000000'
    },
    height: '700px',
    nodes: {
      shape: 'dot',
      scaling: {
        /**
        * Scalling function
        */
        customScalingFunction: function (min, max, total, value) {
          return (value / total) * 2
        },
        min: 5,
        max: 150
      }
    }
  }

  const events = {
    select: () => {
    }
  }

  return(
    <div className="Network">
      <Typography variant="h4">Network</Typography>
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={() => {}}
      />
    </div>
  )
}

export default NetworkHook
