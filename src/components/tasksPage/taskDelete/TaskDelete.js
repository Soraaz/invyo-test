import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import { debugLog } from '../../../lib/logs'

/**
 * TaskDelete class
 */
class TaskDelete extends React.Component {

  /**
   * Render (React lifecycle)
   */
  render () {
    debugLog('TaskDelete::render')
    return (
      <Alert
        icon={IconNames.TRASH}
        intent={Intent.DANGER}
        cancelButtonText="Annuler"
        confirmButtonText="Supprimer"
        onClose={this.props.close}
        onCancel={this.onClose}
        onConfirm={() => {this.props.delete(this.props.index)}}
        isOpen={this.props.isOpen}
      >
        <p>
          Es-tu sur de vouloir supprimer cette tâche ?
        </p>
      </Alert>
    )
  }
}

TaskDelete.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired
}

export default TaskDelete
