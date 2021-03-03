import { debug } from '../../config/debug'

/**
 * Debug log function
 * @param data data to print
 * @param force Force print
 */
export const debugLog = (data, force) => {
  if (debug || force) {
    console.log('%cDEBUG:', 'color: blue') // eslint-disable-line no-console
    console.log(data) // eslint-disable-line no-console
  }
}

/**
 * Info log function
 * @param data data to print
 */
export const infoLog = (data) => {
  console.log('%cINFO:', 'color: green') // eslint-disable-line no-console
  console.log(data) // eslint-disable-line no-console
}

/**
 * Error log function
 * @param data data to print
 */
export const errorLog = (data) => {
  console.log('%cERROR:', 'color: red') // eslint-disable-line no-console
  console.log(data) // eslint-disable-line no-console
}
