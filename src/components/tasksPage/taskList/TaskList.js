import React from 'react'

import './TaskList.scss'
import { debugLog } from '../../../lib/logs';
import PropTypes from 'prop-types';
import Task from './task/Task';
import { Card } from '@blueprintjs/core';

/**
 * DataList class
 */
class TaskList extends React.Component {
  /**
   * Constructor (React lifecycle)
   */
  constructor(props) {
    debugLog('DataList::constructor')
    super(props)
  }

  /**
   * Render (React lifecycle)
   */
  render() {
    debugLog('DataList:render')

    let taskList = this.props.tasks.filter((task) => {
      return (!task.isEnd || this.props.seeEndTask)
    })
    taskList = taskList.map((task, index) => {
      return (<Task delete={this.props.deleteTask} key={index} index={index} title={task.title} description={task.description} date={task.date} isEnd={task.isEnd} update={this.props.updateTask}/>);
    })

    return(
      <div className="TaskList">
        {taskList.length ?
          <div className="TaskList-header">
            <Card className="TaskList-card">
              <div className="TaskList-name">Titre</div>
              <div className="TaskList-name">Description</div>
              <div className="TaskList-name">Date de fin</div>
              <div className="TaskList-name">Tâche fini</div>
              <div className="TaskList-options">Options</div>
            </Card>
            {taskList}
          </div>:
          <p>Pas de tâches pour le moment !</p> }
      </div>
    )
  }
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  seeEndTask: PropTypes.bool.isRequired
}

export default TaskList;
