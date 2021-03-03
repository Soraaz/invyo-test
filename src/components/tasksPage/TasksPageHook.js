import React, { useEffect, useState } from 'react'

import './TasksPage.scss'
import { debugLog } from '../../lib/logs'
import TaskCreateHook from './taskCreate/TaskCreateHook'
import TaskListHook from './taskList/TaskListHook'
import App from '../../App'

import { Button, Card, makeStyles, useMediaQuery, useTheme, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { green } from '@material-ui/core/colors'
import stringToDate from 'lib/tools/StringToDate'
import differenceInSeconds from 'date-fns/differenceInSeconds'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  centerIcon: {
    margin: theme.spacing(0)
  }
}))

const ColorButton = withStyles(() => ({
  endIcon: {
    margin: 0
  },
  root: {
	  backgroundColor: green[500],
	  '&:hover': {
      backgroundColor: green[700]
	  }
  }
}))(Button)

let tasksIndex = 0

/**
 * TasksPageHook class
 */
function TasksPageHook () {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [tasks, setTasks] = useState(() => {
    const tasks = localStorage.getItem('dataList') !== null ? JSON.parse(localStorage.getItem('dataList')) : []
    tasksIndex = tasks.length

    return tasks.map((task, index) => {
      return ({
        title: task.title,
        description: task.description,
        date: task.date,
        isEnd: differenceInSeconds(stringToDate(task.date), new Date()) <= 0,
        id: index
      })
    })
  })
  const [taskCreate, setTaskCreate] = useState({
    isOpen: false
  })
  const [seeEndTask, setSeeEndTask] = useState(false)

  useEffect(() => {
    localStorage.setItem('dataList', JSON.stringify(tasks))
  }, [tasks])

  /**
   * Open a new Data Panel
   */
  function toggleTaskCreate () {
    debugLog('TasksPage::toggleTaskCreate')
    setTaskCreate({
      isOpen: !taskCreate.isOpen
    })
  }

  /**
   * Handle create new Data
   * @param {object} task Data
   */
  function handleTaskCreate (task) {
    debugLog('TaskPage::handleTaskCreate')
    if (task) {
      setTasks([...tasks, task])
      tasksIndex++
      App.showToast('success', 'Ta nouvelle tâche a bien été créer !')
    }
  }

  /**
   * Handle create new Data
   * Invert SeeEndTask state
   */
  function toggleSeeEndTask () {
    debugLog('TaskPage::seeEndTask')
    setSeeEndTask(!seeEndTask)
  }

  /**
   * Delete a data
   * @param {Number} index Index of the data
   */
  function deleteTask (index) {
    debugLog('TaskPage::deleteTask')
    setTasks([...tasks.slice(0, index), ...tasks.slice(index+1)])
    App.showToast('success', 'La tâche a bien été supprimée !')
  }

  /**
   * Update a data
   * @param {Object} task Data data
   * @param {Number} index Index of the data
   */
  function updateTask (task, index) {
    debugLog('TaskPage::updateTask')
    setTasks([
      ...tasks.splice(0, index),
      {
        ...tasks[index],
        ...task
      },
      ...tasks.slice(index+1)
    ])
    App.showToast('success', 'La tâche a bien été modifier !')
  }

  /**
   * Showing hidden tasks button
   */
  function textShowButton () {
    return <span>{seeEndTask ? 'Cacher' : 'Voir'} les tâches finis</span>
  }

  return(
    <div className="Tasks" >
      <div className="Tasks-center">

        <TaskCreateHook
          index={tasksIndex + 1}
          isOpen={taskCreate.isOpen}
          close={toggleTaskCreate}
          add={handleTaskCreate}
        />

        <Card className="Tasks-card">
          <Typography variant="h4">Mes tâches</Typography>

          <ColorButton
            className="Tasks-new-button"
            variant="contained"
            color="primary"
            endIcon={<AddIcon/>}
            classes={isMobile ? { endIcon: classes.centerIcon } : {}}
            onClick={toggleTaskCreate}
          >
            {!isMobile ? 'Nouvelle tâche' : null}
          </ColorButton>

          <Button
            className={'Tasks-view-finish ' + classes.button}
            variant="contained"
            color="primary"
            classes={isMobile ? { endIcon: classes.centerIcon } : {}}
            endIcon={seeEndTask ? <VisibilityOffIcon/> : <VisibilityIcon/>}
            onClick={toggleSeeEndTask}
          >
            {!isMobile ? textShowButton() : null}
          </Button>

          <TaskListHook tasks={tasks} deleteTask={deleteTask} seeEndTask={seeEndTask} updateTask={updateTask}/>
        </Card>
      </div>
    </div>
  )
}

export default TasksPageHook
