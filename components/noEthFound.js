import { Component } from 'react'

export default class NoEthFound extends Component {
  render () {
    return (
      <article className='w-80-ns ph4  center' >
        <div className='tc'>
          <div className='pt4'>
            <img className='h3' src='/static/ethereum.png' />
          </div>
          <h1 className='tc'>
            Ethereum Not Found
          </h1>
          <h3>
            DA.Capital requires an Ethereum client to be running in your browser and up to date.
            It could not be detected and indicates that it is not present or not correctly configured.
          </h3>
          <h3>
            Please use one of the following clients.
          </h3>
          <div>
            <div className='fl w-50 pb2'>
              <h4>Metamask</h4>
              <a href='https://metamask.io/'>
                <img className='h4' src='/static/metamask-logo.svg' />
              </a>
              <h5>Install <a href='https://metamask.io/'>Metamask</a> in Chrome.</h5>
              <h5>Browse to this page in Chrome.</h5>
            </div>
            <div className='fl w-50 pb2'>
              <h4>Mist</h4>
              <a href='https://github.com/ethereum/mist/releases'>
                <img className='h4' src='/static/mist-logo.svg' />
              </a>
              <h5>Install and sync up <a href='https://github.com/ethereum/mist/releases'>Mist.</a></h5>
              <h5>Browse to this page in Mist</h5>
            </div>
          </div>
          Please load an Ethereum provider.
        </div>
      </article>
    )
  }
}
