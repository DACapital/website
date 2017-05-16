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

const Title = styled.h1`
  text-shadow: 1px 1px ${constants.primary};
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
        <Title className='center white mw7 relative fw5 mt4 avenir f5 f3-ns fw4 tracked lh-copy'>
          The world’s first decentralized
          <br />
          Index Funds for Blockchain Assets are coming.
        </Title>
      </LogoContainer>
    </section>
    <section className='w-100 fl space-shadow bg-white z-1 relative center pt4 pb7 lh-copy ph2'>
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
        <article className='fl center ph4 w-100 pv4'>
          <h3 className='tc lh-title f3-ns'>
            Subscribe to our mailing list:
          </h3>
          <div className='w5 center'>
            <input
              className='pa2 tc ba-30 f5 w5'
              type='email'
              name='email-address'
              id='email-address'
              placeholder='your@email.com'
            />
            <input
              className='outline-0 hover-white w-100 mt3 b ph3 pv2 input-reset ba b--green bg-green white grow pointer f5 dib'
              type='submit'
              value='Subscribe'
            />
          </div>
        </article>
      </section>
    </section>
  </article>
)
