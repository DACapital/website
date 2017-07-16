import React, { Component } from 'react'
import getWeb3 from '../utils/getWeb3'
import DacToken from '../contracts/DacToken.json'
import VendingMachine from '../contracts/VendingMachine.json'
var BigNumber = require('bignumber.js')
const contract = require('truffle-contract')

//
// Main Component
//
export default class VendingMachineComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mainAccount: null,
      tokenBalance: 0,
      tokenPrice: 0,
      weiToSpend: '',
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
      return this.setState({ tokenBalance: balance.dividedBy(Math.pow(10, 18)).toFixed(18) })
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
        return this.setState({ tokenBalance: balance.dividedBy(Math.pow(10, 18)).toFixed(18) })
      }).then(() => {
        return vendingMachineContract.deployed()
      }).then((instance) => {
        this.setState({ deployedVendingMachine: instance })

        return this.state.deployedVendingMachine.amountSold.call()
      }).then((sold) => {
        return this.state.deployedVendingMachine.calculateSaleAmount.call(sold, Math.pow(10, 18))
      }).then((price) => {
        // Set the current price
        return this.setState({ tokenPrice: price.dividedBy(Math.pow(10, 18)).toFixed(18) })
      })
    })
  }

  handleInputChange (event) {
    this.setState({weiToSpend: event.target.value})
  }

  purchaseClicked () {
    const { weiToSpend, deployedVendingMachine, mainAccount } = this.state
    console.log('weiToSpend:', weiToSpend)

    this.setState({pendingTrx: true})
    return deployedVendingMachine.purchaseTokens({from: mainAccount, value: new BigNumber(weiToSpend)})
    .then((result) => {
      this.setState({pendingTrx: false})
      return this.updateBalance()
    })
  }

  render () {
    const { web3, tokenBalance, tokenPrice, pendingTrx } = this.state
    return (
      <article className=''>
        <section className='w-100 fl space-shadow bg-white z-1 relative center pv4 lh-copy'>
          { web3 ? (
            <article className='fl w-50-ns ph4' >
              <h2 className='lh-title'>
              DAC Tokens
            </h2>
              <p className='measure'>
              You have {tokenBalance} DAC Tokens
            </p>
              <p className='measure'>
              The current price of DAC Tokens is {tokenPrice} per ETH
            </p>
              <p className='measure'>
                Amount of WEI to Spend:
                <input type='text' name='numberoftokens' placeholder='WEI' value={this.state.weiToSpend} onChange={(e) => this.handleInputChange(e)} />
                <br />
                <button onClick={(e) => this.purchaseClicked(e)}>
                  Purchase DAC Tokens
                </button>
              </p>
              <p className='measure'>
              Pending Transaction: {pendingTrx.toString()}
              </p>
            </article>
          ) : (
            <article className='fl w-50-ns ph4' >
              Please load metamask or ethereum provider.
            </article>
          )}

        </section>
      </article>
    )
  }
}
