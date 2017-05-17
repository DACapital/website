import ReactGA from 'react-ga'

export const initAnalytics = () => {
  if (process.browser && process.production) {
    console.log('GA init')
    ReactGA.initialize('UA-99334873-1')
  }
}
export const logPageView = () => {
  if (process.browser && process.production) {
    console.log('Logging pageview', window.location.pathname)
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }
}
