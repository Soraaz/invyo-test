import React, { useState } from 'react'

import './TaskUpdate.scss'

import PropTypes from 'prop-types'
import { debugLog } from '../../../lib/logs'
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField, useMediaQuery } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import { format } from 'date-fns'

import { green } from '@material-ui/core/colors'
import { withStyles, useTheme } from '@material-ui/core/styles'
import stringToDate from 'lib/tools/StringToDate'
import differenceInSeconds from 'date-fns/differenceInSeconds'

const ColorButton = withStyles(() => ({
  root: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  }
}))(Button)

/**
 * TaskUpdateHook class
 */
function TaskUpdateHook (props) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [name, setName] = useState({
    data: props.name,
    valid: true
  })

  const [description, setDescription] = useState({
    data: props.description,
    valid: true
  })

  const [date, setDate] = useState({
    data: stringToDate(props.date),
    valid: true
  })

  /**
   * Update String
   * @param {Object} e Event
   * @param {String} dataName Name of the data to change
   */
  function updateString (e, dataName) {
    debugLog('TaskUpdate::updateString')
    if (e) {
      const name = e.target.value
      const valid = name.length > 0 && name.length < 200

      switch(dataName) {
      case 'name':
        setName({
          data: name,
          valid: valid
        })
        break
      case 'description':
        setDescription({
          data: name,
          valid: valid
        })
        break
      default:
        break
      }
    }
  }

  /**
   * Update Date
   * @param {Object} e Event
   */
  function updateDate(e) {
    debugLog('TaskUpdate::updateDate')
    if (e) {
      const date = e.target.value
      const valid = /* date >= new Date() */ true
      setDate({
        data: new Date(date),
        valid: valid
      })
    }
  }

  /**
   * Create a new data
   */
  function handleCreate () {
    debugLog('TaskUpdate::handleCreate')
    const task = {
      title: name.data,
      description: description.data,
      date: format(date.data, 'dd/MM/yyyy'),
      isEnd: differenceInSeconds(date.data, new Date()) <= 0,
      id: props.index
    }

    props.update(task, props.index)
    props.close()
  }

  /**
   * Close
   */
  function close () {
    debugLog('TaskUpdate::close')
    setName({
      data: props.name,
      valid: true
    })
    setDescription({
      data: props.description,
      valid: true
    })
    setDate({
      data: stringToDate(props.date),
      valid: true
    })
    props.close()
  }

  /**
   * Handle key press
   * @param {Object} e Event
   */
  function handleKeyPress (e) {
    debugLog('TaskUpdate::handleKeyPress')
    if (e) {
      e.stopPropagation()
      if (e.key === 'Enter')
        if (name.valid && description.valid && date.valid)
          handleCreate()
    }
  }

  return (
    <Dialog
      onClose={props.close}
      open={props.isOpen}
      aria-labelledby="form-dialog-title"
      fullScreen={fullScreen}
    >
      <DialogTitle id="form-dialog-title">Modifier une tâche</DialogTitle>
      <DialogContent>
        <FormGroup
        >
          <TextField
            fullWidth
            autoFocus
            margin="dense"
            error={!name.valid && true}
            id="new-task-name"
            label="Titre"
            defaultValue={name.data}
            onChange={(e) => updateString(e, 'name')}
            onKeyPress={handleKeyPress}
          />

          <TextField
            fullWidth
            margin="dense"
            error={!description.valid && true}
            id="new-task-description"
            label="Description"
            defaultValue={description.data}
            onChange={(e) => updateString(e, 'description')}
            onKeyPress={handleKeyPress}
          />

          <TextField
            fullWidth
            id="date"
            margin="dense"
            label="Date de fin"
            type="date"
            defaultValue={format(date.data, 'yyyy-MM-dd')}
            onChange={updateDate}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormGroup>

      </DialogContent>
      <DialogActions>
        <ButtonGroup className="align-right">

          <Button
            variant="contained"
            color="default"
            onClick={close} >
                Annuler
          </Button>

          <ColorButton
            variant="contained"
            color="primary"
            startIcon={<EditIcon/>}
            disabled={!name.valid || !description.valid || !date.valid}
            onClick={handleCreate}
          >
            Modifier
          </ColorButton>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  )
}

TaskUpdateHook.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default TaskUpdateHook
