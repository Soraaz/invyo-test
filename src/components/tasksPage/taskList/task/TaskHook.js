import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'

import DeleteIcon from '@material-ui/icons/Delete'
import SettingsIcon from '@material-ui/icons/Settings'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { debugLog } from '../../../../lib/logs'
import TaskDeleteHook from '../../taskDelete/TaskDeleteHook'
import TaskUpdateHook from '../../taskUpdate/TaskUpdateHook'
import ProgressBarWithLabel from '../../../../lib/material-ui/ProgressBarWithLabel'
import { CardActions, IconButton, MenuItem, Typography, Menu } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0)
  },
  startIcon: {
    margin: theme.spacing(0)
  },
  blurEffect: {
    width: '190px',
    background: 'rgba(255,255,255,0.1)',
    padding: '1em',
    backdropFilter: 'blur(10px)',
    boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.2)',
    margin: '1em',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px'
  },
  cardTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: 500
  },
  cardDescription: {
    fontSize: 12,
    color: 'black',
    fontWeight: 20,
    marginTop: '8px'
  },
  dateBar: {
    textAlign: 'center'
  },
  settings: {
    marginLeft: 'auto',
    padding: '0px'
  }
}))

/**
* TaskHook
*/
function TaskHook(props) {
  const classes = useStyles()

  const [taskUpdate, setTaskUpdate] = useState({
    isOpen: false
  })

  const [taskDelete, setTaskDelete] = useState({
    isOpen: false
  })

  const [taskMenu, setTaskMenu] = useState({
    anchor: null
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
	* Toggle Menu
  @param {object} event Eveht
	*/
  function handleMenu (event) {
    debugLog('TaskHook::handleMenu')
    setTaskMenu({
      anchor: event.currentTarget
    })
  }

  /**
	* Toggle Menu close
	*/
  function handleMenuClose () {
    debugLog('TaskHook::handleMenuClose')
    setTaskMenu({
      anchor: null
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
      <Card className={classes.blurEffect}>
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
      <Card className={classes.blurEffect}>
        <Typography variant="h5" className={classes.cardTitle}>{props.title}</Typography>
        <Typography variant="body1" className={classes.cardDescription}>{props.description}</Typography>
        <div className={classes.dateBar}>{showIsEnd()}</div>
        {settingsButtons}
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

  const settingsButtons =
  <CardActions disableSpacing>
    <IconButton edge="end" className={classes.settings} onClick={handleMenu}>
      <MoreVertIcon />
    </IconButton>

    <Menu onClose={handleMenuClose} open={Boolean(taskMenu.anchor)} anchorEl={taskMenu.anchor}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>

  </CardActions>

  // const settingsButtons = <ButtonGroup>
  //   <Button
  //     variant="contained"
  //     color="default"
  //     classes={{ startIcon: classes.startIcon }}
  //     className={classes.button}
  //     startIcon={<SettingsIcon/>}
  //     onClick={toggleUpdate}
  //   />
  //   {updateTask}
  //   <Button
  //     variant="contained"
  //     color="secondary"
  //     classes={{ startIcon: classes.startIcon }}
  //     className={classes.button}
  //     startIcon={<DeleteIcon/>}
  //     onClick={toggleDelete}
  //   />
  //   {deleteTask}
  // </ButtonGroup>

  return(
    <div>
      {/* {!isMobile && desktopCard()}
      {isMobile && mobileCard()} */}
      {mobileCard()}
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

