import React, { useCallback, useState } from 'react'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import { Fade, makeStyles } from '@material-ui/core'

export const ToastContext = React.createContext({
  data: null,
  open: false,
  // eslint-disable-next-line no-unused-vars
  addToast: (intent, message) => {},
  removeToast: () => {}
})

// position: fixed;
// opacity: 1;
// transition: opacity 2000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
// width: 50vh;
// z-index: 1;
// margin-right: 50vh;
// margin-left: 50vh;
// /* margin-top: 50vh; */
// margin-top: 2vh;
// /* vertical-align: middle;

const useStyles = makeStyles(() => ({
  alert: {
    position: 'fixed',
    maxWidth: '600px',
    margin: 'auto',
    transform: 'translateX(-50%)',
    zIndex: 1,
    left: '50%',
    marginTop: '2vh',

    backdropFilter: 'blur(10px)',
    boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.4)'
  }
}))

/**
 * ToasterAlert Class
 * @param {{children: Array}} data
 */
function ToasterAlert ({ children }) {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [data, setData] = useState(null)

  /**
  * Remove Toast
  */
  const removeToast = () => {
    setOpen(false)
  }

  /**
  * Add Toast
  */
  const addToast = (intent, message) => {
    setOpen(true)
    setData({ intent: intent, message: message })
    setTimeout(() => {
      setOpen(false)
    }, 5000)
  }

  const contextValue = {
    data,
    open,
    addToast: useCallback((intent, message) => addToast(intent, message), []),
    removeToast: useCallback(() => removeToast(), [])
  }

  return (
    <ToastContext.Provider value={contextValue}>
      <Fade in={open} timeout={2000}>
        <Alert variant="filled" severity={(data && data.intent) ? data.intent : 'error'} className={classes.alert}>
          {data && data.message}
        </Alert>
      </Fade>
      {children}
    </ToastContext.Provider>
  )
}

ToasterAlert.propTypes = {
  children: PropTypes.array.isRequired
}

export default ToasterAlert