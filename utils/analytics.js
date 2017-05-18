import ReactGA from 'react-ga'
//
// Initialize Google Analytics
//
export const initAnalytics = () => {
  if (process.browser && process.env.production) {
    console.log('GA init')
    ReactGA.initialize('UA-99334873-1')
  }
}
//
// Log Page Views
//
export const logPageView = () => {
  if (process.browser && process.env.production) {
    console.log('Pageview', window.location.pathname)
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }
}
