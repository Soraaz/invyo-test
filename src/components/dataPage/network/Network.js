import React from 'react'

import './Network.scss'
import { debugLog } from '../../../lib/logs'
import { H1 } from '@blueprintjs/core'
import Graph from 'react-graph-vis'
import PropTypes from 'prop-types'

/**
 * Network class
 */
class Network extends React.Component {
  /**
   * Constructor (React lifecycle)
   */
  constructor(props) {
    debugLog('Network::constructor')
    super(props)
  }

  /**
   * Render (React lifecycle)
   */
  render() {
    debugLog('Network:render')

    const graph = {
      nodes: this.props.network.nodes,
      edges: this.props.network.edges
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
      <div className="Network">
        <H1>Network</H1>
        <Graph
          graph={graph}
          options={options}
          events={events}
          getNetwork={() => {}}
        />
      </div>
    )
  }
}

Network.propTypes = {
  network: PropTypes.object.isRequired
}

export default Network
