import './Task.scss'

import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import DeleteIcon from '@material-ui/icons/Delete'
import SettingsIcon from '@material-ui/icons/Settings'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { debugLog } from '../../../../lib/logs'
import TaskDeleteHook from '../../taskDelete/TaskDeleteHook'
import TaskUpdateHook from '../../taskUpdate/TaskUpdateHook'
import ProgressBarWithLabel from '../../../../lib/material-ui/ProgressBarWithLabel'
import { useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0)
  },

  startIcon: {
    margin: theme.spacing(0)
  }
}))

/**
* TaskHook
*/
function TaskHook(props) {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [taskUpdate, setTaskUpdate] = useState({
    isOpen: false
  })

  const [taskDelete, setTaskDelete] = useState({
    isOpen: false
  })

  /**
	* Toggle Update
	*/
  function toggleUpdate () {
    debugLog('TaskHook::toggleUpdate')
    setTaskUpdate({
      isOpen: !taskUpdate.isOpen
    })
  }

  /**
	* Toggle delete
	*/
  function toggleDelete () {
    debugLog('TaskHook::toggleDelete')
    setTaskDelete({
      isOpen: !taskDelete.isOpen
    })
  }

  /**
	* showIsEnd
	*/
  function showIsEnd () {
    debugLog('TaskHook::showIsEnd')
    return(
      <div>
        <ProgressBarWithLabel date={props.date}/>
      </div>
    )
  }

  /**
	* Task for browser
	*/
  function desktopCard() {
	  return (
      <Card className="TaskItem">
        <div className="TaskItem-name">{props.title}</div>
        <div className="TaskItem-name">{props.description}</div>
        <div className="TaskItem-name">{props.date}</div>
        <div className="TaskItem-name">{showIsEnd()}</div>

        <ButtonGroup className="TaskItem-options">
		  <Button
            variant="contained"
            color="default"
            classes={{ startIcon: classes.startIcon }}
            className={classes.button}
            startIcon={<SettingsIcon/>}
            onClick={toggleUpdate}
		  />
		  {updateTask}
		  <Button
            variant="contained"
            color="secondary"
            classes={{ startIcon: classes.startIcon }}
            className={classes.button}
            startIcon={<DeleteIcon/>}
            onClick={toggleDelete}
		  />
		  {deleteTask}
        </ButtonGroup>
	  </Card>
	  )
  }

  /**
	* Task for mobile phone
	*/
  function mobileCard() {
    return(
      <Card className="TaskItem-mobile">
        <Box fontWeight="fontWeightBold" >Titre:</Box>
        <div className="TaskItem-name-mobile">{props.title}</div>
        <Box fontWeight="fontWeightBold" >Description:</Box>
        <div className="TaskItem-name-mobile">{props.description}</div>
        <Box fontWeight="fontWeightBold" >Date de fin:</Box>
        <div className="TaskItem-name-mobile">{props.date}</div>
        <Box fontWeight="fontWeightBold" >Status:</Box>
        <div className="TaskItem-name-mobile">{showIsEnd()}</div>

        <Box fontWeight="fontWeightBold" >Options:</Box>
        <ButtonGroup>
	  <Button
            variant="contained"
            color="default"
            classes={{ startIcon: classes.startIcon }}
            className={classes.button}
            startIcon={<SettingsIcon/>}
            onClick={toggleUpdate}
	  />
	  {updateTask}
	  <Button
            variant="contained"
            color="secondary"
            classes={{ startIcon: classes.startIcon }}
            className={classes.button}
            startIcon={<DeleteIcon/>}
            onClick={toggleDelete}
	  />
	  {deleteTask}
        </ButtonGroup>
      </Card>)
  }

  const updateTask = <TaskUpdateHook
    isOpen={taskUpdate.isOpen}
    index={props.index}
    name={props.title}
    description={props.description}
    date={props.date}
    close={toggleUpdate}
    update={props.update}
  />

  const deleteTask = <TaskDeleteHook
    isOpen={taskDelete.isOpen}
    index={props.index}
    close={toggleDelete}
    delete={props.delete}
  />

  return(
    <div>
      {!isMobile && desktopCard()}
      {isMobile && mobileCard()}
    </div>
  )
}

TaskHook.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isEnd: PropTypes.bool.isRequired,
  delete: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default TaskHook

