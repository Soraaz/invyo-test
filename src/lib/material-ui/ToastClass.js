import { useContext } from 'react'
import { ToastContext } from './ToasterAlert'
import { debugLog } from '../logs'

/**
   * Use Toast
   */
function useToast() {
  debugLog('App::showToast')
  const { data, open, addToast, removeToast } = useContext(ToastContext)
  return { data, open, addToast, removeToast }
}

export default useToast