import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import { debugLog } from '../../../lib/logs'
import TaskHook from './task/TaskHook'
import { IconButton, makeStyles, Typography } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import stringToDate from 'lib/tools/StringToDate'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles((theme) => ({
  flexBox: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    display: 'flex',
    overflow: 'auto',
    maxHeight: '80vh',
    height: '80vh',
    alignContent: 'baseline',
    alignItems: 'center'
  },
  cardButtons: {
    width: '400px',
    padding: '1em',
    backdropFilter: 'blur(10px)',
    margin: 'auto',
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'center'
  },
  iconButton: {
    padding: 0
  },
  buttonsFlex: {
    display: 'flex',
    alignItems: 'center',
    flex:'auto',
    marginLeft:'20px'
  },
  spaceFlex: {
    flexGrow: 1,
    visibility: 'hidden'
  },
  groupButtons: {
    display: 'flex',
    alignItems: 'center'
  }
}))

/**
* TaskListHook class
*/
function TaskListHook (props){
  debugLog('TaskList:render')

  const classes = useStyles()

  const [taskFinishLength, setTaskFinishLength] = useState(() => {
    const tmpTask = props.tasks
    return tmpTask.filter((task) => {
      return (task.isEnd)
    }).length
  })

  useEffect(() => {
    setTaskFinishLength(() => {
      const tmpTask = props.tasks
      return tmpTask.filter((task) => {
        return (task.isEnd)
      }).length
    })
  }, [props.tasks])

  let TaskListHook = props.tasks.map((task, index) => {
    return (<TaskHook delete={props.deleteTask} key={task.id} id={task.id} index={index} title={task.title} description={task.description} date={task.date} isEnd={task.isEnd} update={props.updateTask}/>)
  })

  TaskListHook = TaskListHook.filter((task) => {
    return (!task.props.isEnd || props.seeEndTask)
  })

  TaskListHook = TaskListHook.sort((dataA, dataB) => new Date(stringToDate(dataA.props.date)) > new Date(stringToDate(dataB.props.date)) ? 1 : -1)

  return (
    <div className="TaskList">

      <div className={classes.cardButtons}>

        <div className={classes.buttonsFlex}>
          <Typography variant="subtitle1"><b>In progress </b>{' ' + (props.tasks.length - taskFinishLength)}</Typography>
          <li id="spacer" className={classes.spaceFlex} />
          <div className={classes.groupButtons}>
            <MoreVertIcon />
            <IconButton onClick={props.toggleTaskCreate} className={classes.iconButton}>
              <AddCircleIcon color="error"/>
            </IconButton>
          </div>
        </div>

        <div className={classes.buttonsFlex}>
          <Typography variant="subtitle1"><b>Done </b>{taskFinishLength}</Typography>
          <li id="spacer" className={classes.spaceFlex} />
          <div className={classes.groupButtons}>
            <MoreVertIcon />
            <IconButton onClick={props.toggleSeeEndTask} className={classes.iconButton}>
              {!props.seeEndTask ? <VisibilityOffIcon color="secondary" /> : <VisibilityIcon color="secondary" />}
            </IconButton>
          </div>
        </div>

      </div>

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
