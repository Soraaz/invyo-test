import React from 'react'

import './TaskUpdate.scss'

import PropTypes from 'prop-types'
import { debugLog } from '../../../lib/logs';
import { Button, ButtonGroup, Classes, Dialog, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { DateInput } from '@blueprintjs/datetime';
import { IconNames } from '@blueprintjs/icons'

/**
 * TaskUpdate class
 */
class TaskUpdate extends React.Component {
  /**
   * Constructor (React lifecycle)
   */
  constructor(props) {
    debugLog('TaskUpdate::constructor')

    super(props)
    this.state = {
      name: {
        data: this.props.name,
        valid: true
      },
      description: {
        data: this.props.description,
        valid: true
      },
      date: {
        data: this.stringToDate(this.props.date),
        valid: true
      }
    }
  }

  /**
   * componentDidUpdate
   */
  componentDidUpdate = () => {
    if ((this.props.name !== this.state.name.data || this.props.description !== this.state.description.data
    || this.props.date !== this.state.date.data.toLocaleDateString()) && !this.props.isOpen)
    {
      this.setState({
        name: {
          data: this.props.name,
          valid: true
        },
        description: {
          data: this.props.description,
          valid: true
        },
        date: {
          data: this.stringToDate(this.props.date),
          valid: true
        }
      })
    }
  };

  /**
   * Convert String date to Date format
   * @param {Object} dateString Date in String format
   */
  stringToDate = (dateString) => {
    const parts = dateString.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

  /**
   * Update String
   * @param {Object} e Event
   * @param {String} dataName Name of the data to change
   */
  updateString = (e, dataName) => {
    debugLog('TaskUpdate::updateString')
    if (e) {
      const name = e.target.value
      const valid = name.length > 0 && name.length < 200
      this.setState(state => ({
        ...state,
        [dataName]: {
          data: name,
          valid: valid
        }
      }))
    }
  }

  /**
   * Update Date
   * @param {Object} e Event
   * @param {String} dataName Name of the data to change
   */
  updateDate = (e, dataName) => {
    debugLog('TaskUpdate::updateDate')
    if (e) {
      const date = e
      const valid = /* date >= new Date() */ true
      this.setState(state => ({
        ...state,
        [dataName]: {
          data: date,
          valid: valid
        }
      }))
    }
  }

  /**
   * Create a new data
   */
  handleCreate = () => {
    debugLog('TaskUpdate::handleCreate')
    const task = {
      title: this.state.name.data,
      description: this.state.description.data,
      date: this.state.date.data.toLocaleDateString(),
      isEnd: this.state.date.data.toLocaleDateString() < new Date().toLocaleDateString()
    }

    this.props.update(task, this.props.index)
    this.close()
  }

  /**
   * Close
   */
  close = () => {
    debugLog('TaskUpdate::close')
    this.setState({
      name: {
        data: this.props.name,
        valid: true
      },
      description: {
        data: this.props.description,
        valid: true
      },
      date: {
        data: this.stringToDate(this.props.date),
        valid: true
      }
    }, this.props.close)
  }

  /**
   * Handle key press
   * @param {Object} e Event
   */
  handleKeyPress = (e) => {
    debugLog('TaskUpdate::handleKeyPress')
    if (e) {
      e.stopPropagation()
      if (e.key === 'Enter')
        if (this.state.name.valid && this.state.description.valid && this.state.date.valid)
          this.handleCreate()
    }
  }

  /**
   * Render (React lifecycle)
   */
  render() {
    debugLog('TaskUpdate::render')

    return (
      <Dialog
        onClose={this.props.close}
        isOpen={this.props.isOpen}
        usePortal={false}
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup
            label="Titre:"
            labelFor="new-task-name"
          >
            <InputGroup
              id="new-task-name"
              intent={this.state.name.valid ? Intent.PRIMARY : Intent.NONE}
              placeholder="Rentre un nom de tâche..."
              value={this.state.name.data}
              onChange={(e) => this.updateString(e, 'name')}
              onKeyPress={this.handleKeyPress}
            />
          </FormGroup>

          <FormGroup
            label="Description:"
            labelFor="new-task-description"
          >
            <InputGroup
              id="new-task-description"
              intent={this.state.description.valid ? Intent.PRIMARY : Intent.NONE}
              placeholder="Rentre une description de la tâche..."
              value={this.state.description.data}
              onChange={(e) => this.updateString(e, 'description')}
              onKeyPress={this.handleKeyPress}
            />
          </FormGroup>

          <FormGroup
            label="Date:"
            labelFor="new-task-date"
          >
            <DateInput
              id="new-task-date"
              intent={this.state.date.valid ? Intent.PRIMARY : Intent.NONE}
              placeholder="Rentre un date de fin à ta tâche..."
              value={this.state.date.data}
              onChange={(e) => this.updateDate(e, 'date')}
              formatDate={date => date.toLocaleDateString()}
              parseDate={str => new Date(str)}
              //    minDate={new Date()}
              popoverProps={{ inline: true }}
            />
          </FormGroup>

        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <ButtonGroup className="align-right">
            <Button
              intent={Intent.WARNING}
              text="Annuler"
              onClick={this.close}
            />
            <Button
              intent={Intent.SUCCESS}
              icon={IconNames.PLUS}
              text="Modifier"
              disabled={!this.state.name.valid || !this.state.description.valid || !this.state.date.valid}
              onClick={this.handleCreate}
            />
          </ButtonGroup>
        </div>
      </Dialog>
    )
  }
}

TaskUpdate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default TaskUpdate;
