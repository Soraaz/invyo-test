import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { mount, shallow } from 'enzyme'

import Content, { NCContent } from './Content'

import {
  HOME_URL,
  LOGIN_URL,
  SIGNIN_URL,
  ACCOUNT_URL,
  DASHBOARD_URL,
  PROJECT_URL,
  MAGIC_LINK_URL,
  PASSWORD_LOST_URL
} from '../../config/routes'
import { errorLog } from '../../lib/logs'

jest.mock('../login/Login', () => {
  // eslint-disable-next-line react/display-name
  return () => <div className="Login"/>
})

jest.mock('../signin/Signin', () => {
  // eslint-disable-next-line react/display-name
  return () => <div className="Signin"/>
})

jest.mock('../account/Account', () => {
  // eslint-disable-next-line react/display-name
  return () => <div className="Account"/>
})

jest.mock('../dashboard/Dashboard', () => {
  // eslint-disable-next-line react/display-name
  return () => <div className="Dashboard"/>
})

jest.mock('../project/Project', () => {
  // eslint-disable-next-line react/display-name
  return () => <div className="Project"/>
})

jest.mock('../link/Link', () => {
  // eslint-disable-next-line react/display-name
  return () => <div className="Link"/>
})

jest.mock('../passwordLost/PasswordLost', () => {
  // eslint-disable-next-line react/display-name
  return () => <div className="PasswordLost"/>
})

let wrapper

/**
 * Content tests
 */
describe('Content', () => {
  let toaster

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter>
        <NCContent
          authentication={{}}
        />
      </MemoryRouter>
    )
    toaster = NCContent.toaster
  })

  afterEach(() => {
    wrapper.unmount()
    NCContent.toaster = toaster
  })

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('show toast', () => {
    let intent, message, timeout

    NCContent.toaster = { show: (json) => { intent = json.intent; message = json.message; timeout = json.timeout } }
    NCContent.showToast('primary', 'show toast')
    expect(intent).toBe('primary')
    expect(message).toBe('show toast')
    expect(timeout).toBe(5000)

    NCContent.showToast('primary', 'show toast', 1)
    expect(intent).toBe('primary')
    expect(message).toBe('show toast')
    expect(timeout).toBe(1)

    NCContent.toaster = undefined
    NCContent.showToast()
  })

  it('clear toaster', () => {
    NCContent.toaster = { clear: jest.fn() }
    NCContent.clearToaster()
    expect(NCContent.toaster.clear).toHaveBeenCalled()

    NCContent.toaster = undefined
    NCContent.clearToaster()
  })

  it('API error toast', () => {
    Content.showToast = jest.fn()

    expect(errorLog).toHaveBeenCalledTimes(0)
    NCContent.apiErrorToast({
      message: 'API error'
    })
    expect(errorLog).toHaveBeenCalledTimes(1)
    NCContent.apiErrorToast({
      message: 'API error',
      desc: 'API error description'
    })
    expect(errorLog).toHaveBeenCalledTimes(3)
  })
})

/**
 * Content routes tests
 */
describe('Content routes', () => {

  beforeEach(() => {
  })

  afterEach(() => {
    wrapper.unmount()
  })

  /**
   * Authorized state setup
   */
  const authorized = () => {
    const mockStore = configureStore()
    return mockStore({
      authentication: {
        authorized: true,
        user: {
          id: ''
        }
      },
      workspace: {},
      project: {
        id: ''
      },
      selection: {
        type: '',
        highlighted: {},
        selected: []
      }
    })
  }

  /**
   * Unauthorized state setup
   */
  const unauthorized = () => {
    const mockStore = configureStore()
    return mockStore({
      authentication: {
        authorized: false
      }
    })
  }

  /**
   * Route selector
   * @param {Function} auth Authorization type
   * @param {String} url Route URL
   */
  const route = (auth, url) => {
    return mount(
      <Provider store={auth()}>
        <MemoryRouter initialEntries={[url]}>
          <Content />
        </MemoryRouter>
      </Provider>
    )
  }

  it('home', () => {
    wrapper = route(unauthorized, HOME_URL)
    expect(wrapper.find('.Login')).toHaveLength(0)
  })

  it('home with subdomain', () => {
    window.TANATLOC = {
      SubDomain: 'SubDomain'
    }
    wrapper = route(unauthorized, HOME_URL)
    expect(wrapper.find('.Login')).toHaveLength(1)
  })

  it('login', () => {
    wrapper = route(unauthorized, LOGIN_URL)
    expect(wrapper.find('.Login')).toHaveLength(1)
  })

  it('login to dashboard', () => {
    wrapper = route(authorized, LOGIN_URL)
    expect(wrapper.find('.Dashboard')).toHaveLength(1)
  })

  it('signin', () => {
    wrapper = route(unauthorized, SIGNIN_URL)
    expect(wrapper.find('.Signin')).toHaveLength(1)
  })

  it('signin to dashboard', () => {
    wrapper = route(authorized, SIGNIN_URL)
    expect(wrapper.find('.Dashboard')).toHaveLength(1)
  })

  it('account', () => {
    wrapper = route(authorized, ACCOUNT_URL)
    expect(wrapper.find('.Account')).toHaveLength(1)
  })

  it('account to login', () => {
    wrapper = route(unauthorized, ACCOUNT_URL)
    expect(wrapper.find('.Login')).toHaveLength(1)
  })

  it('dashboard', () => {
    wrapper = route(authorized, DASHBOARD_URL)
    expect(wrapper.find('.Dashboard')).toHaveLength(1)
  })

  it('dashboard to login', () => {
    wrapper = route(unauthorized, DASHBOARD_URL)
    expect(wrapper.find('.Login')).toHaveLength(1)
  })

  it('project', () => {
    wrapper = route(authorized, PROJECT_URL)
    expect(wrapper.find('.Project')).toHaveLength(1)
  })

  it('project to login', () => {
    wrapper = route(unauthorized, PROJECT_URL)
    expect(wrapper.find('.Login')).toHaveLength(1)
  })

  it('password lost', () => {
    wrapper = route(unauthorized, PASSWORD_LOST_URL)
    expect(wrapper.find('.PasswordLost')).toHaveLength(1)
  })

  it('password lost to dashboard', () => {
    wrapper = route(authorized, PASSWORD_LOST_URL)
    expect(wrapper.find('.Dashboard')).toHaveLength(1)
  })

  it('magic link', () => {
    wrapper = route(unauthorized, MAGIC_LINK_URL)
    expect(wrapper.find('.Link')).toHaveLength(1)
  })
})
