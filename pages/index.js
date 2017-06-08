import React, { Component } from 'react'
import styled from 'styled-components'
import constants from '../config/constants'
import {
  initAnalytics,
  logPageView
} from '../utils/analytics'
//
// Local constants
//
const whitepaperLink = 'https://drive.google.com/file/d/0B6ywOTtPtq_6T2hHOXB6dGlOOGM/view?usp=sharing'
const githubLink = 'https://github.com/dacapital'
//
// Styled Components
//
const LogoContainer = styled.div`
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
`
const Logo = styled.img`
  animation-duration: 2.1s;
  animation-timing-function: ease-in-out;
`
const Title = styled.h3`
  text-shadow: 1px 1px 1px ${constants.primary};
`
const SpaceBkg = styled.section`
  background: #1C2541
`
const BotGuard = styled.div`
  position: absolute;
  left: -5000px;
`
const Stars = [
  <div key='star1' className='z-0' id='stars' />,
  <div key='star2' className='z-0' id='stars2' />,
  <div key='star3' className='z-0' id='stars3' />
]
//
// Main Component
//
export default class Index extends Component {
  componentWillMount () {
    //
    // TODO: Don't initialize more than once when this is no longer an SPA
    //
    initAnalytics()
    logPageView()
  }

  render () {
    return (
      <article className=''>
        <SpaceBkg className='vh-100 w-100 ph4'>
          <header
            className='h2 pv4'
          >
            <image
              className='h2 fl'
              src='/static/logo-name.png'
            />
            <div
              className='h2 fr flex items-center'
            >
              <a
                className='ml3 link dim white f7 f5-ns'
                target='_blank'
                href={whitepaperLink}
              >
                Whitepaper
              </a>
              <a
                className='ml3 h2'
                target='_blank'
                href={githubLink}
              >
                <image
                  className='h2'
                  src='/static/github.png'
                />
              </a>
            </div>
          </header>
          { Stars.map(star => star) }
          <LogoContainer className='ph4 mw7 tc fixed z-0'>
            <Logo className='mw3 mw4-ns animated pulse infinite' src='/static/logo.png' />
            <h1 className='center white mw7 relative fw3 mt4 avenir f5 f3-ns tracked lh-copy'>
              A decentralized autonomous platform for
              <br />
              digital asset index funds
            </h1>
          </LogoContainer>
        </SpaceBkg>
        <section className='w-100 fl space-shadow bg-white z-1 relative center pv4 lh-copy'>
          <section className='center mw7'>
            <article className='fl w-50-ns ph4'>
              <image
                className=''
                src='/static/platform_demo_1.png'
              />
            </article>
            <article className='fl w-50-ns ph4'>
              <h2 className='lh-title fw6'>
                Digital Asset Index Funds
              </h2>
              <p className='measure fw3'>
                In traditional stock markets, index funds provide investors with simple and cost-effective ways to gain a diversified exposure in a portfolio of underlying assets.
              </p>
              <p className='measure fw3'>
                We're creating the first decentralized, autonomous blockchain platform for digital asset based index funds.
              </p>
              <h2 className='lh-title fw6'>
                Decentralized
              </h2>
              <p className='measure fw3'>
                Our platform is built with smart contracts on the Ethereum blockchain. It enables funds of ERC20 tokens to be created, managed, and traded without any intermediaries.
              </p>
              <p className='fw3'>
                Find out more in our <a target='_blank' href={whitepaperLink}>whitepaper</a>.
              </p>
            </article>
          </section>
        </section>
        <SpaceBkg className='fl relative z-2 w-100 center'>
          { Stars.map(star => star) }
          <article className='center ph4 w-100 mw7 mv6'>
            <Title className='center fw3 tc white title f3-ns mt0'>
              Subscribe to the mailing list
            </Title>
            <div className='center tc'>
              <form
                action='//capital.us15.list-manage.com/subscribe/post?u=0a428990f1b06730570e4a6e2&amp;id=7f7d89e0a1'
                method='post'
                id='mc-embedded-subscribe-form'
                name='mc-embedded-subscribe-form'
                className='validate'
                target='_blank'
                noValidate
              >
                <input
                  className='pa3 tc bg-white blue f7 w-100 w5-ns ba b--blue'
                  type='email'
                  name='EMAIL'
                  id='mce-EMAIL'
                  placeholder='your@email.com'
                />
                <input
                  className='b ttu mt4 mt0-ns outline-0 hover-white w-100 w4-ns pa3 dim ba b--blue bg-blue white pointer f7 dib'
                  type='submit'
                  value='Submit'
                />
                <BotGuard aria-hidden='true'>
                  <input
                    type='text'
                    name='b_0a428990f1b06730570e4a6e2_7f7d89e0a1'
                    tabIndex='-1'
                    value=''
                  />
                </BotGuard>
              </form>
            </div>
          </article>
        </SpaceBkg>
      </article>
    )
  }
}
