import './TaskList.scss'

import PropTypes from 'prop-types'
import React from 'react'

import { debugLog } from '../../../lib/logs'
import TaskHook from './task/TaskHook'
import { Card, useMediaQuery, useTheme } from '@material-ui/core'
import stringToDate from 'lib/tools/StringToDate'

/**
* TaskListHook class
*/
function TaskListHook (props){
  debugLog('TaskList:render')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  let TaskListHook = props.tasks.filter((task) => {
    return (!task.isEnd || props.seeEndTask)
  })

  TaskListHook = TaskListHook.sort((dataA, dataB) => new Date(stringToDate(dataA.date)) > new Date(stringToDate(dataB.date)) ? 1 : -1)

  TaskListHook = TaskListHook.map((task) => {
    return (<TaskHook delete={props.deleteTask} key={task.id} index={task.id} title={task.title} description={task.description} date={task.date} isEnd={task.isEnd} update={props.updateTask}/>)
  })

  return (
    <div className="TaskList">
      {TaskListHook.length ?
        <div className="TaskList-header">
          {!isMobile && <Card className="TaskList-card">
            <div className="TaskList-name">Titre</div>
            <div className="TaskList-name">Description</div>
            <div className="TaskList-name">Date de fin</div>
            <div className="TaskList-name">Status</div>
            <div className="TaskList-options">Options</div>
          </Card>}
          {TaskListHook}
        </div> :
        <p>Pas de tâches pour le moment !</p>}
    </div>
  )
}

TaskListHook.propTypes = {
  tasks: PropTypes.array.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  seeEndTask: PropTypes.bool.isRequired
}

export default TaskListHook
