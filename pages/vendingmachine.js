import React, { Component } from 'react'
import styled from 'styled-components'
import getWeb3 from '../utils/getWeb3'
import DacToken from '../contracts/DacToken.json'
import VendingMachine from '../contracts/VendingMachine.json'
import constants from '../config/constants'
import { calcDacForEth, calcEthForDac } from '../utils/pricing'
import ReactLoading from 'react-loading'
var BigNumber = require('bignumber.js')
const contract = require('truffle-contract')

const MAX_TOKENS = new BigNumber(16800000).times(Math.pow(10, 18))

//
// Styled Components
//
const LogoContainer = styled.div`
  left: 50%;
  transform: translateX(-50%);  
`
const Logo = styled.img`
`
const SpaceBkg = styled.section`
  background: #1C2541
`

const PurchaseButton = styled.a`
  ${constants.secondary};
`
const Stars = [
  <div key='star1' className='z-0' id='stars' />,
  <div key='star2' className='z-0' id='stars2' />,
  <div key='star3' className='z-0' id='stars3' />
]

//
// Main Component
//
export default class VendingMachineComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mainAccount: null,
      tokenBalance: new BigNumber(0),
      tokenPrice: new BigNumber(0),
      ethToSpend: '',
      dacToBuy: '',
      web3: null,
      deployedToken: null,
      deployedVendingMachine: null,
      pendingTrx: false
    }
  }

  componentWillMount () {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      if (results.web3.isConnected()) {
        console.log('Web3 is connected')
        this.setState({ web3: results.web3 })

        this.loadContracts()
      } else {
        console.log('Web3 was not connected')
      }
    })
    .catch((err) => {
      console.log('Error finding web3.')
      console.error(err)
    })
  }

  updateBalance () {
    const { deployedToken } = this.state

    return deployedToken.balanceOf.call(this.state.mainAccount)
    .then((balance) => {
      // Set the user's current token balance
      return this.setState({ tokenBalance: balance })
    })
  }

  loadContracts () {
    const tokenContract = contract(DacToken)
    tokenContract.setProvider(this.state.web3.currentProvider)

    const vendingMachineContract = contract(VendingMachine)
    vendingMachineContract.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    return this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({ mainAccount: accounts[0] })
      // Check error
      if (error) {
        console.error(error)
        return
      }

      return tokenContract.deployed().then((instance) => {
        this.setState({ deployedToken: instance })

        return this.state.deployedToken.balanceOf.call(this.state.mainAccount)
      }).then((balance) => {
        // Set the user's current token balance
        return this.setState({ tokenBalance: balance })
      }).then(() => {
        return vendingMachineContract.deployed()
      }).then((instance) => {
        this.setState({ deployedVendingMachine: instance })

        return this.state.deployedVendingMachine.amountSold.call()
      }).then((sold) => {
        return this.state.deployedVendingMachine.calculateSaleAmount.call(sold, Math.pow(10, 18))
      }).then((price) => {
        // Set the current price
        return this.setState({ tokenPrice: price })
      })
    })
  }

  handleEthInputChange (event) {
    const { deployedVendingMachine } = this.state

    // Get the value that was updated
    let eth = event.target.value

    // Check to see if it is empty
    if (!eth) {
      return this.setState({
        ethToSpend: '',
        dacToBuy: ''
      })
    }

    // Bail if it is not a number
    if (isNaN(eth)) {
      return
    }

    // Check decimal place length
    let ethBN = new BigNumber(eth)
    if (ethBN.decimalPlaces() > 18) {
      return
    }

    // Calculate the wei value
    let wei = ethBN.times(Math.pow(10, 18))

    return deployedVendingMachine.amountSold.call()
    .then((sold) => {
      let dacAmount = calcDacForEth(sold, wei)

      // Check to see if the limit has been reached
      if (dacAmount.plus(sold).greaterThan(MAX_TOKENS)) {
        // Get the amount of dac that is left
        let leftInVendingMachine = MAX_TOKENS.sub(sold)

        // Calculate the eth price and update vals
        eth = calcEthForDac(sold, leftInVendingMachine).dividedBy(Math.pow(10, 18))
        dacAmount = leftInVendingMachine
      }

      console.log('dacAmount: ' + dacAmount)
      console.log('eth: ' + eth)
      console.log('wei: ' + wei)

      // Set the current price
      return this.setState({
        tokenPrice: new BigNumber(dacAmount).dividedBy(new BigNumber(eth)),
        ethToSpend: eth,
        dacToBuy: new BigNumber(dacAmount).dividedBy(Math.pow(10, 18)).toFormat()
      })
    })
  }

  handleDacInputChange (event) {
    const { deployedVendingMachine } = this.state

    // Get the value that was updated
    let dacString = event.target.value

    // Check to see if it is empty
    if (!dacString) {
      return this.setState({
        ethToSpend: '',
        dacToBuy: ''
      })
    }

    // Bail if it is not a number
    if (isNaN(dacString)) {
      return
    }

    // Check decimal place length
    let dacBN = new BigNumber(dacString)
    if (dacBN.decimalPlaces() > 18) {
      return
    }

    // Calculate the base unit value
    let dacBaseUnits = dacBN.times(Math.pow(10, 18))

    return deployedVendingMachine.amountSold.call()
    .then((sold) => {
      let ethAmount = calcEthForDac(sold, dacBaseUnits)

      // Check to see if the limit has been reached
      if (dacBaseUnits.plus(sold).greaterThan(MAX_TOKENS)) {
        // Get the amount of dac that is left
        let leftInVendingMachine = MAX_TOKENS.sub(sold)

        // Calculate the eth price and update vals
        ethAmount = calcEthForDac(sold, leftInVendingMachine)
        dacBaseUnits = leftInVendingMachine
        dacString = dacBaseUnits.dividedBy(Math.pow(10, 18)).toFormat()
      }

      console.log('ethAmount: ' + ethAmount)
      console.log('dacBaseUnits: ' + dacBaseUnits)
      console.log('dacBaseUnits: ' + dacBaseUnits)

      // Set the current price
      return this.setState({
        tokenPrice: new BigNumber(dacBaseUnits).times(Math.pow(10, 18)).dividedBy(new BigNumber(ethAmount)),
        ethToSpend: new BigNumber(ethAmount).dividedBy(Math.pow(10, 18)).toFormat(),
        dacToBuy: dacString
      })
    })
  }

  purchaseClicked (e) {
    const { ethToSpend, deployedVendingMachine, mainAccount, pendingTrx } = this.state
    console.log('e:', e)

    // Check for empty or already a transaction waiting
    if (!ethToSpend || pendingTrx) {
      return
    }

    this.setState({pendingTrx: true})
    return deployedVendingMachine.purchaseTokens({from: mainAccount, value: new BigNumber(ethToSpend).times(Math.pow(10, 18))})
    .then((result) => {
      this.setState({pendingTrx: false})
      return this.updateBalance()
    }).catch((err) => {
      console.error(err)
      return this.setState({pendingTrx: false})
    })
  }

  render () {
    const {
      web3,
      tokenBalance,
      tokenPrice,
      pendingTrx,
      ethToSpend,
      dacToBuy
    } = this.state

    return (
      <article className=''>

        <SpaceBkg className='w-100 ph4'>
          <header
            className='h2 pv4'
          >
            <image
              className='h2 fl'
              src='/static/logo-name.png'
            />
            <div className='fr' >
              <p className='white avenir f5-ns'>
                Your Balance: {tokenBalance.dividedBy(Math.pow(10, 18)).toFormat()} DAC
              </p>
            </div>
          </header>
          { Stars.map(star => star) }
        </SpaceBkg>
        <section className='pv4 tc relative'>
          <LogoContainer className='ph4 mw7 tc relative'>
            <Logo className='mw3' src='/static/logo.png' />
            <p className='center white mw7 relative mt1 mb0 avenir f4-ns tracked lh-copy'>
              Purchase DA.Capital Tokens
            </p>
            <p className='center white mt0 avenir f6-ns lh-copy'>
              @ {tokenPrice.dividedBy(Math.pow(10, 18)).toFormat()} per ETH
            </p>
          </LogoContainer>
        </section>
        <section className='w-70 space-shadow bg-white relative center pv1 lh-copy avenir'>
          { web3 ? (
            <article className='w-80-ns ph4  center' >

              <div className='tc'>
                <h2 className='tc'>
                  Amount
                </h2>
                <div>
                  <div className='fl w-50 pb2'>
                    <img className='h3' src='/static/ethereum.png' />
                  </div>
                  <div className='fl w-50 pb2'>
                    <img className='h3' src='/static/logo.png' />
                  </div>
                </div>
                <div className='tc pb4'>
                  <input type='text' className='input-reset h3 br2 ba b--black-20 pa2 mb2 w-40' name='numberoftokens' placeholder='ETH' value={ethToSpend} onChange={(e) => this.handleEthInputChange(e)} disabled={pendingTrx ? 'disabled' : ''} />
                  <img className='v-mid pa1' src='/static/transfer.png' />
                  <input type='text' className='input-reset h3 br2 ba b--black-20 pa2 mb2 w-40' name='numberoftokens' placeholder='DAC' value={dacToBuy} onChange={(e) => this.handleDacInputChange(e)} disabled={pendingTrx ? 'disabled' : ''} />
                </div>

                <PurchaseButton className='h3 f4 inline-flex justify-center items-center link dim br2 ph3 mb2 dib white bg-blue w-60 ' href='#0' onClick={(e) => this.purchaseClicked(e)} disabled={pendingTrx}>
                  Purchase DAC Tokens
                </PurchaseButton>
                {
                  pendingTrx
                  ? <ReactLoading type='bars' className='center' color={constants.secondary} />
                  : null
                }

              </div>

            </article>
          ) : (
            <article className='fl w-50-ns ph4 white' >
              Please load metamask or ethereum provider.
            </article>
          )}

        </section>
      </article>
    )
  }
}
