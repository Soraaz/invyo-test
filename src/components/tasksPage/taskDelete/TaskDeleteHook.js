import React from 'react'
import PropTypes from 'prop-types'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Zoom } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
  blurEffect: {
    background: 'rgba(255,255,255,0.1)',
    padding: '1em',
    boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px',
    maxWidth: '80vw'
  },
  blurEffectBack: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)'
  },
  cancelButton: {
    color: 'white',
    boxShadow: '-1px -4px 50px 3px ' + theme.palette.warning.main,
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark
    }
  }
}))

const ColorButton = withStyles((theme) => ({
  root: {
    boxShadow: '-1px -4px 50px 3px ' + theme.palette.error.main,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  }
}))(Button)

/**
 * TaskDeleteHook class
 */
function TaskDeleteHook (props) {
  const classes = useStyles()

  return (
    <Dialog
      onClose={props.close}
      open={props.isOpen}
      aria-labelledby="form-dialog-title"
      classes={{ paper: classes.blurEffect, root: classes.blurEffectBack }}
      TransitionComponent={Zoom}
      transitionDuration={{ enter: 500, exit: 500 }}
    >
      <DialogTitle id="form-dialog-title">Supprimer la tâche</DialogTitle>
      <DialogContent>

        <DialogContentText id="alert-dialog-description">
     Es-tu sur de vouloir supprimer cette tâche ?
        </DialogContentText>

      </DialogContent>
      <DialogActions>
        <ButtonGroup className="align-right">

          <Button
            variant="contained"
            color="default"
            className={classes.cancelButton}
            onClick={props.close} >
              Annuler
          </Button>

          <ColorButton
            variant="contained"
            color="primary"
            onClick={() => {props.delete(props.index)}}
            startIcon={<DeleteIcon/>}
          >
              Supprimer
          </ColorButton>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  )
}

TaskDeleteHook.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired
}

export default TaskDeleteHook
