import React from 'react'

import './Data.scss'
import { debugLog } from '../../../../lib/logs'
import PropTypes from 'prop-types'
import { Button, Card, Intent, Tag } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
// import { isMobile } from 'react-device-detect';

/**
 * Data class
 */
class Data extends React.Component {
  /**
   * Constructor (React lifecycle)
   */
  constructor(props) {
    debugLog('Data::constructor')
    super(props)

    this.state = {
      dataUpdate : {
        isOpen: false
      },
      dataDelete : {
        isOpen: false
      }
    }
  }

  /**
   * Render (React lifecycle)
   */
  render() {
    debugLog('Data:render')
    let indexTag = -1

    const dataTags = Object.entries(this.props.tags).map(function (tags) {
      if (tags[1].length > 0)
      {
        return tags[1].map(function(tag) {
          indexTag++
          return <Tag className="DataItem-tag" key={indexTag}>{tag}</Tag>
        })
      }
    })

    return(
      <Card className="DataItem">
        <div className="DataItem-name">{this.props.title}</div>
        <div className="DataItem-name">{this.props.content}</div>
        <div className="DataItem-name">{this.props.language}</div>
        <div className="DataItem-name">{dataTags}</div>
        <div className="DataItem-options">
          <Button
            intent={Intent.PRIMARY}
            rightIcon={IconNames.LINK}
            onClick={() => window.open(this.props.url, '_blank')}
          />
        </div>
      </Card>
    )
  }
}

Data.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default Data
