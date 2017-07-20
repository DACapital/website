import { Component } from 'react'

export default class NoContractFound extends Component {
  render () {
    return (
      <article className='w-80-ns ph4  center' >
        <div className='tc'>
          <div className='pt4'>
            <img className='h3' src='/static/ethereum.png' />
          </div>
          <h1 className='tc'>
            Ethereum Contract Not Found
          </h1>
          <h3>
            DA.Capital requires an Ethereum client to be running in your browser and up to date.
            It could not be detected and indicates that it is not present or not correctly configured.
          </h3>
          <h3>
            A common cause is that the Ethereum network you are connected to is not supported. Currently,
            only the Ropsten Testnet is supported.
          </h3>
          Please load a different Ethereum provider.
        </div>
      </article>
    )
  }
}
