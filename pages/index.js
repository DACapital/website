import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import constants from '../config/constants'

const LogoContainer = styled.div`
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`
const Logo = styled.img`
  animation-duration: 2.1s;
  animation-timing-function: ease-in-out;
  width: 150px;
`
const LogoStrip = styled(Logo)`
  left: 51px;
`

const Title = styled.h1`
  text-shadow: 2px 2px ${constants.primary};
`

const LogoName = styled.img`
  position: absolute;
`

export default () => (
  <article className=''>
    <div className='vh-100 dt w-100 tc white cover ph4'>
      <LogoName className='h2 pv4' src='/static/logo-name.png' />
      <div className="z-0" id="stars"/>
      <div className="z-0" id="stars2"/>
      <div className="z-0" id="stars3"/>
      <div className='dtc v-mid center'>
        <LogoContainer className='fixed z-0'>
          <Logo className='animated pulse infinite' src='/static/logo.png' />
        </LogoContainer>
        <Title className='relative mt6 z-1 avenir f4 fw4 ttu tracked lh-title'>
          The world’s first decentralized
          <br />
          Index Funds for Blockchain Assets is coming.
        </Title>
      </div>
    </div>
    <div className='vh-100 w-100 fl space-shadow bg-white z-1 relative center f5 pv5 lh-copy ph4'>
      <div className='center mw7'>
        <article className='fl w-50-ns ph4'>
          <h2 className='lh-title'>
            Index Funds - reinvented
          </h2>
          <p className='measure'>
            In traditional markets, index funds provide investors convenient and cost-effective ways to gain diversified exposure.
          </p>
          <p className='measure'>
            A growing number of cryptocurrencies and blockchain-based assets provide the opportunity to reimagine index funds as decentralized global entities.
          </p>
        </article>
        <article className='fl w-50-ns ph4'>
          <h2 className='lh-title'>
            Based on Ethereum ERC20
          </h2>
          <p className='measure'>
            We are building a decentralized platform that enables index funds for Ethereum-based ERC20 tokens to be created and managed in a completely decentralized and autonomous way.
          </p>
          <p>
            Find out more in our <a href=''>whitepaper</a>.
          </p>
        </article>
        <article className='fl center ph4 w-100'>
          <h2 className='tc lh-title'>
            Subscribe to our mailing list:
          </h2>
          <div className="w5 center">
            <label className="db fw6 lh-copy f6" for="email-address">Email</label>
            <input className="pa2 input-reset ba bg-transparent w5" type="email" name="email-address"  id="email-address" />
            <input
              className="w-100 mt3 b ph3 pv2 input-reset ba b--green bg-green white grow pointer f6 dib"
              type="submit"
              value="Subscribe"
            />
          </div>
        </article>
      </div>
    </div>
  </article>
)
