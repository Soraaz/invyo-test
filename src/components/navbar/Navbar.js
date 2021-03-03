import React from 'react'

import './Navbar.scss'
import { debugLog } from '../../lib/logs'
import { Button, Intent, Navbar as BluePrintNavbar } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import { Alignment } from '@blueprintjs/core/lib/esnext/common/alignment'
import { Link } from 'react-router-dom'
import App from '../../App'
import { isMobile } from 'react-device-detect'

/**
   * Navbar class
   */
class Navbar extends React.Component {
  /**
     * Constructor (React lifecycle)
     */
  constructor(props) {
    super(props)
    debugLog('Navbar::constructor')
  }

  /**
   * Disconnect the user
   */
  disconnect = () => {
    App.showToast(Intent.SUCCESS, 'Tu es bien déconnecté ! A bientôt !')
    this.props.changeIsConnected(false)
  }

  /**
     * Render (React lifecycle)
     */
  render() {
    debugLog('Navbar:render')

    return(
      <div className="Navbar">
        <BluePrintNavbar fixedToTop={true} className={'bp3-dark'}>
          <BluePrintNavbar.Group align={Alignment.LEFT}>
            <BluePrintNavbar.Heading>INVYO Test</BluePrintNavbar.Heading>
            <BluePrintNavbar.Divider />
            {
              this.props.isConnected ?
                <div>
                  <Link to="/data" style={{ color: 'inherit', textDecoration: 'inherit' }}><Button className="bp3-minimal" icon="box" text={!isMobile ? 'Articles' : null}/></Link>
                  <Link to="/todo" style={{ color: 'inherit', textDecoration: 'inherit' }}><Button className="bp3-minimal" icon="document" text={!isMobile ? 'Mes tâches' : null}/></Link>
                </div>
                : null
            }
          </BluePrintNavbar.Group>
          <BluePrintNavbar.Group align={Alignment.RIGHT}>
            {
              this.props.isConnected
                ? <Button className="bp3-button bp3-minimal bp3-icon-user" text={'Se Déconnecter'} onClick={this.disconnect}/>
                : <Link to="/login" style={{ color: 'inherit', textDecoration: 'inherit' }}><Button className="bp3-button bp3-minimal bp3-icon-user" text={'Se connecter'}/></Link>}
          </BluePrintNavbar.Group>
        </BluePrintNavbar>
      </div>
    )
  }
}

Navbar.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  changeIsConnected: PropTypes.func.isRequired
}

export default Navbar
