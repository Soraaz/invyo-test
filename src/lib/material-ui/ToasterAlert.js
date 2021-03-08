import React, { useState } from 'react'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'

/**
 * ToasterAlert Class
 */
function ToasterAlert (props) {
  const [open, setOpen] = useState(false)

  return (
    <Alert variant="filled" severity="error">
      {props.text}
    </Alert>
  )
}

ToasterAlert.propTypes = {
  time: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired
}

export default ToasterAlert