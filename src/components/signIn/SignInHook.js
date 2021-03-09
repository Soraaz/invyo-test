import React, { useState } from 'react'

import { Typography, Avatar, Button, FormControl, makeStyles, Grid, Paper, Link, Checkbox, FormControlLabel, TextField, CssBaseline, InputAdornment, IconButton } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { debugLog } from 'lib/logs'
import useToast from '../../lib/material-ui/ToastClass'
import PropTypes from 'prop-types'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(./assets/dashboard_background.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  blurEffect: {
    background: 'rgba(255,255,255,0.3)',
    padding: '3em',
    backdropFilter: 'blur(10px)',
    boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.2)'
  }
}))

/**
 * SignInHook class
 */
function SignInHook (props) {
  debugLog('SignIn::constructor')
  const classes = useStyles()

  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const { addToast } = useToast()

  /**
   * Update email
   * @param {Object} e Event
   * @return {Number} Test error code
   */
  function updateEmail (e) {
    debugLog('SignIn::updateEmail')
    if (!e)
      return 1
    setEmail(e.target.value.toLowerCase())
  }

  /**
   * Update password
   * @param {Object} e Event
   * @return {Number} Test error code
   */
  function updatePassword (e) {
    debugLog('SignIn::updatePassword')
    if (!e)
      return 1
    setPassword(e.target.value)
  }

  /**
   * Show/Hide password
   */
  function handleShowPassword () {
    debugLog('SignIn::handleShowPassword')
    setShowPassword(!showPassword)
  }

  /**
   * handle RemembeMe checkbox
   * @param {Object} e Event
   */
  function handleRememberMe (e) {
    debugLog('SignIn::handleRememberMe')
    setRememberMe(e.target.value)
  }

  /**
   * Handle SignIn click
   */
  function handleSignIn () {
    debugLog('SignIn::handleSignIn')

    if (email === 'test@invyo.io' && password === 'test123@') {
      addToast('success', 'Tu es connecté ! Passe une bonne journée !')
      props.changeIsConnected(true, rememberMe)
    }
    else
    {
      addToast('error', 'Erreur d\'authentification, Regarde si l\'email et le mot de passe sont correct')
      setError(true)
    }
  }

  return(
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.blurEffect}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Login
          </Typography>
          <FormControl error className={classes.form}>
            <TextField
              error={error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={updateEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={error}
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={updatePassword}
              InputProps={{
                endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onChange={handleRememberMe} />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignIn}
            >
            Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </FormControl>
        </div>
      </Grid>
    </Grid>
  )
}

SignInHook.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  changeIsConnected: PropTypes.func.isRequired
}

export default SignInHook
