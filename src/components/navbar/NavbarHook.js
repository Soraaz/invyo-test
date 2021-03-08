import React from 'react'

import './Navbar.scss'
import { debugLog } from '../../lib/logs'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { Button, makeStyles, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

/**
   * NavbarHook class
   */
function NavbarHook () {
  debugLog('Navbar::constructor')

  const classes = useStyles()

  /**
   * Disconnect the user
   */
  // function disconnect () {
  //   App.showToast('success', 'Tu es bien déconnecté ! A bientôt !')
  //   this.props.changeIsConnected(false)
  // }

  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

NavbarHook.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  changeIsConnected: PropTypes.func.isRequired
}

export default NavbarHook
