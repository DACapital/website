import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import constants from '../config/constants'

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
const LogoStrip = styled(Logo)`
  left: 51px;
`

const Title = styled.h3`
  text-shadow: 1px 1px 1px ${constants.primary};
`

const LogoName = styled.img`
`

const Stars = [
  <div className='z-0' id='stars'/>,
  <div className='z-0' id='stars2'/>,
  <div className='z-0' id='stars3'/>,
]

export default () => (
  <article className=''>
    <section className='vh-100 w-100 ph4'>
      <LogoName className='h2 pv4 fl' src='/static/logo-name.png' />
      { Stars.map(star => star) }
      <LogoContainer className='ph4 mw7 tc fixed z-0'>
        <Logo className='mw3 mw4-ns animated pulse infinite' src='/static/logo.png' />
        <h1 className='center white mw7 relative fw6 mt4 avenir f5 f3-ns fw4 tracked lh-copy'>
          The world’s first decentralized
          <br />
          Index Funds for Blockchain Assets are coming.
        </h1>
      </LogoContainer>
    </section>
    <section className='w-100 fl space-shadow bg-white z-1 relative center pv4 lh-copy'>
      <section className='center mw7'>
        <article className='fl w-50-ns ph4'>
          <h2 className='lh-title'>
            Index Funds
          </h2>
          <p className='measure'>
            In traditional markets, index funds provide investors with simple, cost-effective ways to gain diversified exposure in a portfolio of underlying assets.
          </p>
          <p className='measure'>
            We're creating the first decentralized, autonomous blockchain platform for blockchain specific index-funds.
          </p>
        </article>
        <article className='fl w-50-ns ph4'>
          <h2 className='lh-title'>
            Ethereum
          </h2>
          <p className='measure'>
            Our platform is built with smart contracts on the Ethereum blockchain. It enables funds of ERC20 tokens to be created, managed and traded.
          </p>
          <p>
            Find out more in our <a href=''>whitepaper</a>.
          </p>
        </article>
      </section>
    </section>
    <section className='fl bg-green relative z-2 w-100 pv6 center'>
      <article className='center ph4 w-100 mw7'>
        <Title className='center tc white title f3-ns mt0'>
          Subscribe to the mailing list
        </Title>
        <div className='center tc'>
          <input
            className='pa3 tc bg-white blue f7 w-100 w5-ns ba b--blue'
            type='email'
            name='email-address'
            id='email-address'
            placeholder='your@email.com'
          />
          <input
            className='b ttu mt4 mt0-ns outline-0 hover-white w-100 w4-ns pa3 dim ba b--blue bg-blue white pointer f7 dib'
            type='submit'
            value='Submit'
          />
        </div>
      </article>
    </section>
  </article>
)
