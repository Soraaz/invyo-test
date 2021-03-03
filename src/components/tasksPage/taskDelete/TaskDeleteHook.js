import React from 'react'
import PropTypes from 'prop-types'

import { red } from '@material-ui/core/colors'
import { withStyles, useTheme } from '@material-ui/core/styles'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const ColorButton = withStyles(() => ({
  root: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700]
    }
  }
}))(Button)

/**
 * TaskDeleteHook class
 */
function TaskDeleteHook (props) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      onClose={props.close}
      open={props.isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullScreen={fullScreen}
    >
      <DialogTitle id="alert-dialog-title">Supprimer la tâche !</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
      Es-tu sur de vouloir supprimer cette tâche ?
        </DialogContentText>
      </DialogContent>

      <DialogActions>

        <Button
          variant="contained"
          color="default"
          onClick={props.close} >
              Annuler
        </Button>

        <ColorButton
          variant="contained"
          color="primary"
          startIcon={<DeleteIcon/>}
          onClick={() => {props.delete(props.index)}}
        >
          Supprimer
        </ColorButton>
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
