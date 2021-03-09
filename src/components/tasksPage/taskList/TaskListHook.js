import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import { debugLog } from '../../../lib/logs'
import TaskHook from './task/TaskHook'
import { Card, IconButton, makeStyles, Typography } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import stringToDate from 'lib/tools/StringToDate'

const useStyles = makeStyles((theme) => ({
  flexBox: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row'
    },
    display: 'flex',
    overflow: 'auto',
    maxHeight: '80vh',
    height: '80vh',
    alignContent: 'baseline',
    alignItems: 'center'
  },
  cardButtons: {
    width: '300px',
    background: 'rgba(255,255,255,0.1)',
    padding: '1em',
    backdropFilter: 'blur(10px)',
    margin: 'auto',
    marginTop: '1em',
    marginBottom: '1em',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center'
  }
}))

/**
* TaskListHook class
*/
function TaskListHook (props){
  debugLog('TaskList:render')

  const classes = useStyles()

  const [taskFinishLength, setTaskFinishLength] = useState(() => {
    return props.tasks.filter((task) => {
      return (task.isEnd)
    }).length
  })

  useEffect(() => {
    setTaskFinishLength(() => {
      return props.tasks.filter((task) => {
        return (task.isEnd)
      }).length
    })
  }, [props.tasks])

  let TaskListHook = props.tasks.filter((task) => {
    return (!task.isEnd || props.seeEndTask)
  })

  TaskListHook = TaskListHook.map((task, index) => {
    return (<TaskHook delete={props.deleteTask} key={task.id} index={index} title={task.title} description={task.description} date={task.date} isEnd={task.isEnd} update={props.updateTask}/>)
  })

  TaskListHook = TaskListHook.sort((dataA, dataB) => new Date(stringToDate(dataA.props.date)) > new Date(stringToDate(dataB.props.date)) ? 1 : -1)

  return (
    <div className="TaskList">

      <Card className={classes.cardButtons}>

        <Typography variant="subtitle1"><b>In progress </b>{props.tasks.length - taskFinishLength}
          <IconButton onClick={props.toggleTaskCreate}>
            <AddCircleIcon color="error"/>
          </IconButton>
        </Typography>

        <Typography variant="subtitle1"><b>Done </b>{taskFinishLength}
          <IconButton onClick={props.toggleSeeEndTask}>
            {!props.seeEndTask ? <VisibilityOffIcon color="secondary" /> : <VisibilityIcon color="secondary" />}
          </IconButton>
        </Typography>

      </Card>

      {TaskListHook.length ?
        <div className="TaskList-header">
          <div className={classes.flexBox}>
            {TaskListHook}
          </div>
        </div> :
        <p>Pas de tâches pour le moment !</p>}
    </div>
  )
}

TaskListHook.propTypes = {
  tasks: PropTypes.array.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  seeEndTask: PropTypes.bool.isRequired,
  toggleTaskCreate: PropTypes.func.isRequired,
  toggleSeeEndTask: PropTypes.func.isRequired
}

export default TaskListHook
