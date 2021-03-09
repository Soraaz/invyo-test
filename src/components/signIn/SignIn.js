import React from 'react'

import './SignIn.scss'
import { debugLog } from '../../lib/logs'
import PropTypes from 'prop-types'
import { Intent, Card, FormGroup, H1, InputGroup, Button, Tooltip } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Redirect } from 'react-router-dom'

/**
     * SignIn class
     */
class SignIn extends React.Component {
  /**
       * Constructor (React lifecycle)
       */
  constructor(props) {
    super(props)
    debugLog('SignIn::constructor')

    this.state = {
      user: {
        email: '',
        password: ''
      },
      showPassword: false
    }
  }

  /**
       * Mount (React lifecycle)
       */
  componentDidMount() {
    debugLog('SignIn::componentDidMount')
  }

      /**
       * Update email
       * @param {Object} e Event
       * @return {Number} Test error code
       */
      updateEmail = (e) => {
        debugLog('SignIn::updateEmail')
        if (!e)
          return 1
        const email = e.target.value.toLowerCase()
        this.setState(state => ({
          ...state,
          user: {
            ...state.user,
            email: email
          }
        }))
      }

      /**
       * Update password
       * @param {Object} e Event
       * @return {Number} Test error code
       */
      updatePassword = (e) => {
        debugLog('SignIn::updatePassword')
        if (!e)
          return 1
        const password = e.target.value
        this.setState(state => ({
          ...state,
          user: {
            ...state.user,
            password: password
          }
        }))
      }

      /**
       * Show/Hide password
       */
      handleShowPassword = () => {
        debugLog('SignIn::handleShowPassword')
        this.setState(state => ({
          ...state,
          showPassword: !state.showPassword
        }))
      }

      /**
       * Handle SignIn click
       */
      handleSignIn = () => {
        debugLog('SignIn::handleSignIn')

        if (this.state.user.email === 'test@invyo.io' && this.state.user.password === 'test123@') {
          //showToast(Intent.SUCCESS, 'Tu es connecté ! Passe une bonne journée !')
          this.props.changeIsConnected(true)
        }
      //  else
        // showToast(Intent.DANGER, 'Erreur d\'authentification, Regarde si l\'email et le mot de passe sont correct')
      }
      /**
       * Render (React lifecycle)
       */
      render() {
        debugLog('SignIn:render')

        const lockButton =
          <Tooltip content={`${this.state.showPassword ? 'Hide' : 'Show'} Password` }>
            <Button
              icon={this.state.showPassword ? IconNames.UNLOCK : IconNames.LOCK}
              minimal={true}
              onClick={this.handleShowPassword}
            />
          </Tooltip>

        return(
          <div className="SignIn" >
            { this.state.isConnected ? <Redirect to="/todo"/> : null }
            <div className="SignIn-center">
              <Card className="SignIn-card">
                <H1>Login</H1>
                <FormGroup
                  label="Email:"
                  labelFor="SignIn-input"
                >
                  <InputGroup
                    id="SignIn-input"
                    placeholder=""
                    leftIcon={IconNames.ENVELOPE}
                    type="email"
                    autoComplete="username"
                    value={this.state.user.email}
                    onChange={this.updateEmail}
                  />
                </FormGroup>
                <FormGroup
                  label="Password:"
                  labelFor="password-input"
                >
                  <InputGroup
                    id="password-input"
                    placeholder=""
                    rightElement={lockButton}
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.user.password}
                    autoComplete="current-password"
                    onChange={this.updatePassword}
                  />
                </FormGroup>
                <div className="SignIn-button">
                  <Button type="button" intent={Intent.PRIMARY} fill={true} text="Login" rightIcon={IconNames.ARROW_RIGHT}
                    onClick={this.handleSignIn}/>
                </div>
              </Card>
            </div>
          </div>
        )
      }
}

SignIn.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  changeIsConnected: PropTypes.func.isRequired
}

export default SignIn
