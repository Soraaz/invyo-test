import React, { useState } from 'react'

import './TaskCreate.scss'

import PropTypes from 'prop-types'
import { debugLog } from '../../../lib/logs'
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField, useMediaQuery } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { format } from 'date-fns'

import { green } from '@material-ui/core/colors'
import { withStyles, useTheme } from '@material-ui/core/styles'
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
 * TaskCreateHook class
 */
function TaskCreateHook (props) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [name, setName] = useState({
    data: '',
    valid: false
  })

  const [description, setDescription] = useState({
    data: '',
    valid: false
  })

  const [date, setDate] = useState({
    data: new Date(),
    valid: true
  })

  /**
   * Update String
   * @param {Object} e Event
   * @param {String} dataName Name of the data to change
   */
  function updateString (e, dataName) {
    debugLog('TaskCreate::updateString')

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
    debugLog('TaskCreate::updateDate')
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
    debugLog('TaskCreate::handleCreate')
    const task = {
      title: name.data,
      description: description.data,
      date: format(date.data, 'dd/MM/yyyy'),
      isEnd: differenceInSeconds(date.data, new Date()) <= 0,
      id: props.index
    }

    props.add(task)
    close()
  }

  /**
   * Close
   */
  function close () {
    debugLog('TaskCreate::close')
    setName({
      data: '',
      valid: false
    })
    setDescription({
      data: '',
      valid: false
    })
    setDate({
      data: new Date(),
      valid: true
    })
    props.close()
  }

  /**
   * Handle key press
   * @param {Object} e Event
   */
  function handleKeyPress (e) {
    debugLog('TaskCreate::handleKeyPress')
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
      <DialogTitle id="form-dialog-title">Créer une tâche</DialogTitle>
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
            startIcon={<AddIcon/>}
            disabled={!name.valid || !description.valid || !date.valid}
            onClick={handleCreate}
          >
            Créer
          </ColorButton>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  )
}

TaskCreateHook.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default TaskCreateHook
