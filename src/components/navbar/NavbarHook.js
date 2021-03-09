import React from 'react'

import './Navbar.scss'
import { debugLog } from '../../lib/logs'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import { Button, makeStyles, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ListIcon from '@material-ui/icons/List'
import LanguageIcon from '@material-ui/icons/Language'
import StorageIcon from '@material-ui/icons/Storage'

import { Link } from 'react-router-dom'
import useToast from '../../lib/material-ui/ToastClass'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    top: 0,
    left: 'auto',
    right: 0,
    position: 'fixed'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  centerIcon: {
    margin: theme.spacing(0)
  }
}))

/**
   * NavbarHook class
   */
function NavbarHook (props) {
  debugLog('Navbar::constructor')

  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { addToast } = useToast()

  /**
   * Disconnect the user
   */
  function disconnect () {
    if (props.isConnected)
    {
      addToast('success', 'Tu es bien déconnecté ! A bientôt !')
      props.changeIsConnected(false, true)
    }
  }

  return(
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#394b59' }}>
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            Invyo test
          </Typography>

          <Link to="/todo" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Button
              classes={isMobile ? { startIcon: classes.centerIcon } : {}}
              color="inherit"
              startIcon={<ListIcon />}
            >
              {!isMobile && 'Todo list'}
            </Button>
          </Link>

          <Link to="/data" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Button
              classes={isMobile ? { startIcon: classes.centerIcon } : {}}
              color="inherit"
              startIcon={<StorageIcon />}
            >
              {!isMobile && 'Data view'}
            </Button>
          </Link>

          <Link to="/network" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Button
              classes={isMobile ? { startIcon: classes.centerIcon } : {}}
              color="inherit"
              startIcon={<LanguageIcon />}
            >
              {!isMobile && 'Network'}
            </Button>
          </Link>

          <Link to="/login" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Button
              classes={isMobile ? { endIcon: classes.centerIcon } : {}}
              color="inherit"
              startIcon={<AccountCircle />}
              onClick={disconnect}>
              { props.isConnected
                ? !isMobile && 'Se Déconnecter'
                : !isMobile && 'Se Connecter'
              }
            </Button>
          </Link>
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
