import { debugLog, infoLog, errorLog } from './index'

jest.unmock('./')

describe('Logs', () => {
  let outputData = ''
  // eslint-disable-next-line no-console
  const savedLog = console['log']

  beforeEach(() => {
    // eslint-disable-next-line no-console
    console['log'] = jest.fn((inputs) => (outputData += inputs))
  })

  afterEach(() => {
    outputData = ''
    // eslint-disable-next-line no-console
    console['log'] = savedLog
  })

  it('debugLog', () => {
    expect(outputData).toBe('')
    debugLog('debug')
    expect(outputData).toBe('')
  })

  it('debugLog force', () => {
    expect(outputData).toBe('')
    debugLog('debug', true)
    expect(outputData).toBe('%cDEBUG:debug')
  })

  it('infoLog', () => {
    expect(outputData).toBe('')
    infoLog('info')
    expect(outputData).toBe('%cINFO:info')
  })

  it('errorLog', () => {
    expect(outputData).toBe('')
    errorLog('error')
    expect(outputData).toBe('%cERROR:error')
  })
})
