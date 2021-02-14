import React from 'react'

import './Datas.scss'
import { debugLog } from '../../lib/logs';
import { Card, H1 } from '@blueprintjs/core';

/**
 * Datas class
 */
class Datas extends React.Component {
  /**
   * Constructor (React lifecycle)
   */
  constructor(props) {
    debugLog('Datas::constructor')
    super(props)
  }

  /**
   * Render (React lifecycle)
   */
  render() {
    debugLog('Datas:render')

    return(
      <div className="Datas" >
        <div className="Datas-center">
          <Card className="Datas-card">
            <H1>Datas</H1>
          </Card>
        </div>
      </div>
    )
  }
}

export default Datas;
