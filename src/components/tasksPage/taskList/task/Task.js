import React from 'react'

import './Task.scss'
import { debugLog } from '../../../../lib/logs';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Card, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import TaskDelete from '../../taskDelete/TaskDelete';
import TaskUpdate from '../../taskUpdate/TaskUpdate';

/**
 * Task class
 */
class Task extends React.Component {
  /**
   * Constructor (React lifecycle)
   */
  constructor(props) {
    debugLog('Task::constructor')
    super(props)

    this.state = {
      taskUpdate : {
        isOpen: false
      },
      taskDelete : {
        isOpen: false
      }
    }
  }

  /**
   * Toggle Update
   */
  toggleUpdate = () => {
    debugLog('Task::toggleUpdate')
    this.setState(state => ({
      ...state,
      taskUpdate: {
        ...state.taskUpdate,
        isOpen: !state.taskUpdate.isOpen
      }
    }))
  }

  /**
   * Toggle delete
   */
  toggleDelete = () => {
    debugLog('Task::toggleDelete')
    this.setState(state => ({
      ...state,
      taskDelete: {
        ...state.taskDelete,
        isOpen: !state.taskDelete.isOpen
      }
    }))
  }

  showIsEnd = () => {
    return(
      this.props.isEnd ?
        <Button
          intent={Intent.SUCCESS}
          rightIcon={IconNames.CONFIRM}
          text="Fini"
        /> :
        <Button
          intent={Intent.PRIMARY}
          rightIcon={IconNames.REFRESH}
          text="En cours"
        />
    )
  }

  /**
   * Render (React lifecycle)
   */
  render() {
    debugLog('Task:render')
    const UpdateTask = <TaskUpdate
      isOpen={this.state.taskUpdate.isOpen}
      index={this.props.index}
      name={this.props.title}
      description={this.props.description}
      date={this.props.date}
      close={this.toggleUpdate}
      update={this.props.update}
    />
    const deleteTask =
      <TaskDelete
        isOpen={this.state.taskDelete.isOpen}
        index={this.props.index}
        close={this.toggleDelete}
        delete={this.props.delete}
      />

    return(
      <Card className="TaskItem">
        <div className="TaskItem-name">{this.props.title}</div>
        <div className="TaskItem-name">{this.props.description}</div>
        <div className="TaskItem-name">{this.props.date}</div>
        <div className="TaskItem-name">{this.showIsEnd()}</div>
        <ButtonGroup className="TaskItem-options">
          <Button
            intent={Intent.NONE}
            rightIcon={IconNames.COG}
            onClick={this.toggleUpdate}
          />
          {UpdateTask}
          <Button
            intent={Intent.DANGER}
            rightIcon={IconNames.CROSS}
            onClick={this.toggleDelete}
          />
          {deleteTask}
        </ButtonGroup>
      </Card>
    )
  }
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isEnd: PropTypes.bool.isRequired,
  delete: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default Task;
