import React from 'react'

import './TasksPage.scss'
import { debugLog } from '../../lib/logs';
import { Button, Card, Elevation, H1, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import TaskCreate from './taskCreate/TaskCreate';
import TaskList from './taskList/TaskList';
import App from '../../App';

/**
 * TasksPage class
 */
class TasksPage extends React.Component {
  /**
   * Constructor (React lifecycle)
   */
  constructor(props) {
    debugLog('TasksPage::constructor')
    const tasks = localStorage.getItem('taskList') !== null ? JSON.parse(localStorage.getItem('taskList')) : []

    super(props)
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
   * Open a new Task Panel
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
   * Handle create new Task
   * @param {object} task Task
   */
  handleTaskCreate = (task) => {
    debugLog('TaskPage::handleTaskCreate')
    if (task) {
      this.setState(state => ({
        ...state,
        tasks: [...state.tasks, task]
      }), () => {
        localStorage.setItem('taskList', JSON.stringify(this.state.tasks))
        App.showToast(Intent.SUCCESS, 'Ta nouvelle tâche a bien été créer !')
      })
    }
  }

  /**
   * Handle create new Task
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
   * Delete a task
   * @param {Number} index Index of the task
   */
  deleteTask = (index) => {
    debugLog('TaskPage::deleteTask')
    this.setState(state => ({
      ...state,
      tasks:  [...state.tasks.slice(0, index), ...state.tasks.slice(index+1)]
    }), () =>
    {
      localStorage.setItem('taskList', JSON.stringify(this.state.tasks))
      App.showToast(Intent.SUCCESS, 'La tâche a bien été supprimée !')
    })
  }

  /**
   * Update a task
   * @param {Number} task Task data
   * @param {Number} index Index of the task
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
      localStorage.setItem('taskList', JSON.stringify(this.state.tasks))
      App.showToast(Intent.SUCCESS, 'La tâche a bien été modifier !')
    })
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
            >Nouvelle tâche</Button>
            <Button
              className="Tasks-view-finish"
              intent={Intent.PRIMARY}
              rightIcon={this.state.seeEndTask ? IconNames.EYE_OFF : IconNames.EYE_ON}
              onClick={this.toggleSeeEndTask}
            >{this.state.seeEndTask ? 'Cacher' : 'Voir'} les tâches finis</Button>
            <TaskList tasks={this.state.tasks} deleteTask={this.deleteTask} seeEndTask={this.state.seeEndTask} updateTask={this.updateTask}/>
          </Card>
        </div>
      </div>
    )
  }
}

export default TasksPage;
