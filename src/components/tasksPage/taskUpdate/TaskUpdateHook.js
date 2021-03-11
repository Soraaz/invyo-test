import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { debugLog } from '../../../lib/logs'
import { format } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField, Fade } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { withStyles, makeStyles, ThemeProvider, createMuiTheme, useTheme } from '@material-ui/core/styles'
import stringToDate from 'lib/tools/StringToDate'
import differenceInSeconds from 'date-fns/differenceInSeconds'

const useStyles = makeStyles((theme) => ({
  blurEffect: {
    background: 'rgba(255,255,255,0.1)',
    padding: '1em',
    boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px',
    height: '80vh',
    width: '80vw',
    maxWidth: '80vw'
  },
  blurEffectKeyboard: {
    '& .Muipaper-root': {
      background: 'rgba(255,255,255,0.1)',
      padding: '1em',
      boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.2)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '20px'
    }
  },
  blurEffectBack: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)'
  },
  cancelButton: {
    color: 'white',
    boxShadow: '-1px -4px 50px 3px ' + theme.palette.error.main,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  }
}))

const ColorButton = withStyles((theme) => ({
  root: {
    boxShadow: '-1px -4px 50px 3px ' + theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }
}))(Button)

/**
 * TaskUpdateHook class
 */
function TaskUpdateHook (props) {
  const classes = useStyles()
  const theme = useTheme()

  const keyBoardTheme = createMuiTheme(theme, {
    overrides: {
      MuiPopover: {
        paper: {
          background: 'transparent',
          borderRadius: '20px'
        }
      }
    }
  })

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
      const date = e
      const valid = true
      setDate({
        data: date,
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
      id: props.id
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
      classes={{ paper: classes.blurEffect, root:  classes.blurEffectBack }}
      TransitionComponent={Fade}
      transitionDuration={{ enter: 1000, exit: 1000 }}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
              multiline
              rows={4}
              defaultValue={description.data}
              onChange={(e) => updateString(e, 'description')}
              // onKeyPress={handleKeyPress}
            />

            <ThemeProvider theme={keyBoardTheme}>
              <KeyboardDatePicker
                autoOk
                className={classes.blurEffectKeyboard}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                value={date.data}
                onChange={updateDate}
                PopoverProps={{ transitionDuration: 5 }}
              />
            </ThemeProvider>
          </FormGroup>

        </DialogContent>
        <DialogActions>
          <ButtonGroup className="align-right">

            <Button
              variant="contained"
              color="default"
              className={classes.cancelButton}
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
      </MuiPickersUtilsProvider>
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
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
}

export default TaskUpdateHook
