import React, { useEffect, useState } from 'react'

import { debugLog } from '../../lib/logs'
import TaskListHook from './taskList/TaskListHook'

import { makeStyles } from '@material-ui/core'
import stringToDate from 'lib/tools/StringToDate'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import useToast from '../../lib/material-ui/ToastClass'
import TaskUpdateHook from './taskUpdate/TaskUpdateHook'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  centerIcon: {
    margin: theme.spacing(0)
  },
  card: {
    paddingTop: '15px',
    background: 'content-box'
    // backgroundColor: '#5c3a7d'
  }
}))

let tasksIndex = 0

/**
 * TasksPageHook class
 */
function TasksPageHook () {
  const classes = useStyles()

  const { addToast } = useToast()

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
      tasksIndex++
      task.id = tasksIndex
      setTasks([...tasks, task])
      addToast('success', 'Ta nouvelle tâche a bien été créer !')
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
    addToast('success', 'La tâche a bien été supprimée !')
  }

  /**
   * Update a data
   * @param {Object} task Data data
   * @param {Number} index Index of the data
   */
  function updateTask (task, index) {
    debugLog('TaskPage::updateTask')

    setTasks([
      ...tasks.slice(0, index),
      task,
      ...tasks.slice(index+1)
    ])
    addToast('success', 'La tâche a bien été modifier !')
  }

  return(
    <div className="Tasks">
      <div className="Tasks-center">

        <TaskUpdateHook
          index={tasksIndex + 1}
          isOpen={taskCreate.isOpen}
          close={toggleTaskCreate}
          update={handleTaskCreate}
          create={true}
        />

        <div className={classes.card}>
          {/* <Typography variant="h4">Mes tâches</Typography> */}

          <TaskListHook seeEndTask={seeEndTask} tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} toggleTaskCreate={toggleTaskCreate} toggleSeeEndTask={toggleSeeEndTask} />
        </div>
      </div>
    </div>
  )
}

export default TasksPageHook
