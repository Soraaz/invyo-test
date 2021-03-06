import React from 'react'

import './TasksPage.scss'
import { debugLog } from '../../lib/logs'
import { Button, Card, Elevation, H1, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import TaskCreate from './taskCreate/TaskCreate'
import TaskListHook from './taskList/TaskListHook'
import { isMobile } from 'react-device-detect'

/**
 * TasksPage class
 */
class TasksPage extends React.Component {
  /**
   * Constructor (React lifecycle)
   */
  constructor(props) {
    super(props)
    debugLog('TasksPage::constructor')
    const tasks = localStorage.getItem('dataList') !== null ? JSON.parse(localStorage.getItem('dataList')) : []

    this.state = {
      seeEndTask: false,
      tasks: tasks.map((task) => {
        return ({
          title: task.title,
          description: task.description,
          date: task.date,
          isEnd: task.date < new Date().toLocaleDateString()
        })
      }),
      taskCreate: {
        isOpen: false
      }
    }
  }

  /**
   * Open a new Data Panel
   */
  toggleTaskCreate = () => {
    debugLog('TasksPage::toggleTaskCreate')
    this.setState(state => ({
      ...this.state,
      taskCreate: {
        ...state.taskCreate,
        isOpen: !state.taskCreate.isOpen
      }
    }))
  }

  /**
   * Handle create new Data
   * @param {object} task Data
   */
  handleTaskCreate = (task) => {
    debugLog('TaskPage::handleTaskCreate')
    if (task) {
      this.setState(state => ({
        ...state,
        tasks: [...state.tasks, task]
      }), () => {
        localStorage.setItem('dataList', JSON.stringify(this.state.tasks))
        // showToast(Intent.SUCCESS, 'Ta nouvelle tâche a bien été créer !')
      })
    }
  }

  /**
   * Handle create new Data
   * Invert SeeEndTask state
   */
  toggleSeeEndTask = () => {
    debugLog('TaskPage::seeEndTask')
    this.setState(state => ({
      ...state,
      seeEndTask: !state.seeEndTask
    }))
  }

  /**
   * Delete a data
   * @param {Number} index Index of the data
   */
  deleteTask = (index) => {
    debugLog('TaskPage::deleteTask')
    this.setState(state => ({
      ...state,
      tasks:  [...state.tasks.slice(0, index), ...state.tasks.slice(index+1)]
    }), () =>
    {
      localStorage.setItem('dataList', JSON.stringify(this.state.tasks))
      // showToast(Intent.SUCCESS, 'La tâche a bien été supprimée !')
    })
  }

  /**
   * Update a data
   * @param {Object} task Data data
   * @param {Number} index Index of the data
   */
  updateTask = (task, index) => {
    debugLog('TaskPage::updateTask')

    this.setState(state => ({
      ...state,
      tasks: [
        ...this.state.tasks.splice(0, index),
        {
          ...this.state.tasks[index],
          ...task
        },
        ...this.state.tasks.slice(index+1)
      ]
    }), () =>
    {
      localStorage.setItem('dataList', JSON.stringify(this.state.tasks))
      // showToast(Intent.SUCCESS, 'La tâche a bien été modifier !')
    })
  }

  textShowButton = () => {
    return <span>{this.state.seeEndTask ? 'Cacher' : 'Voir'} les tâches finis</span>
  }

  /**
   * Render (React lifecycle)
   */
  render() {
    debugLog('TasksPage:render')

    return(
      <div className="Tasks" >
        <div className="Tasks-center">

          <TaskCreate
            isOpen={this.state.taskCreate.isOpen}
            close={this.toggleTaskCreate}
            add={this.handleTaskCreate}
          />

          <Card className="Tasks-card" elevation={Elevation.TWO}>
            <H1>Mes tâches</H1>
            <Button
              className="Tasks-new-button"
              intent={Intent.SUCCESS}
              rightIcon={IconNames.ADD}
              onClick={this.toggleTaskCreate}
            >{!isMobile ? 'Nouvelle tâche' : null}</Button>
            <Button
              className="Tasks-view-finish"
              intent={Intent.PRIMARY}
              rightIcon={this.state.seeEndTask ? IconNames.EYE_OFF : IconNames.EYE_ON}
              onClick={this.toggleSeeEndTask}
            >{!isMobile ? this.textShowButton() : null}</Button>
            <TaskListHook tasks={this.state.tasks} deleteTask={this.deleteTask} seeEndTask={this.state.seeEndTask} updateTask={this.updateTask}/>
          </Card>
        </div>
      </div>
    )
  }
}

export default TasksPage
