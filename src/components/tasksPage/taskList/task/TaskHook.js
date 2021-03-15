import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'

import DeleteIcon from '@material-ui/icons/Delete'
import SettingsIcon from '@material-ui/icons/Settings'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { debugLog } from '../../../../lib/logs'
import TaskDeleteHook from '../../taskDelete/TaskDeleteHook'
import TaskUpdateHook from '../../taskUpdate/TaskUpdateHook'
import ProgressBarWithLabel from '../../../../lib/material-ui/ProgressBarWithLabel'
import { CardActions, IconButton, MenuItem, Typography, Menu, ListItemIcon, ListItemText } from '@material-ui/core'
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
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px'
  },
  blurEffectBack: {
    background: 'rgba(255,255,255,0.1)',
    width: '190px',
    marginTop: '1em',
    marginLeft: '1em',
    marginBottom: '1em',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px'
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 500,
    wordBreak: 'break-all'
  },
  cardDescription: {
    fontSize: 12,
    fontWeight: 20,
    marginTop: '8px',
    wordBreak: 'break-all'
  },
  dateBar: {
    textAlign: 'center'
  },
  settings: {
    marginLeft: 'auto',
    padding: '0px'
  },
  menu: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.2)',
    margin: '1em',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px'
  },
  listIcon: {
    marginRight: '1vw',
    minWidth: 0
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
    handleMenuClose()
    setTaskUpdate({
      isOpen: !taskUpdate.isOpen
    })
  }

  /**
	* Toggle delete
	*/
  function toggleDelete () {
    debugLog('TaskHook::toggleDelete')
    handleMenuClose()
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
	* Task Card
	*/
  function taskCard() {
    return(
      <Card className={classes.blurEffectBack}>
        <Card className={classes.blurEffect}>
          <Typography variant="h5" className={classes.cardTitle}>{props.title}</Typography>
          <Typography variant="body1" className={classes.cardDescription}>{props.description}</Typography>
          <div className={classes.dateBar}>{showIsEnd()}</div>
          {settingsButtons}
        </Card>
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
    id={props.id}
    create={false}
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

    <Menu classes={{ paper: classes.menu }} onClose={handleMenuClose} open={Boolean(taskMenu.anchor)} anchorEl={taskMenu.anchor} disableAutoFocusItem={true}>
      <MenuItem onClick={toggleUpdate}>
        <ListItemIcon className={classes.listIcon}>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Edit" />
      </MenuItem>
      <MenuItem onClick={toggleDelete}>
        <ListItemIcon className={classes.listIcon}>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </MenuItem>
    </Menu>
  </CardActions>

  return(
    <div>
      {taskCard()}
      {updateTask}
      {deleteTask}
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
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
}

export default TaskHook

