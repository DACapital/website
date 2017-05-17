import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  render () {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()
    return (
      <html lang='en'>
        <Head>
          <title>DACapital</title>
          <meta name='theme-color' content='#1C2541' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='stylesheet' href='/static/tachyons.css' />
          <link rel='stylesheet' href='/static/animate.min.css' />
          <link rel='stylesheet' href='/static/stars.css' />
          <style>{`
            body {
              background-color: #1C2541;
              margin: 0px;
            }
            .space-shadow {
              -webkit-box-shadow: inset 0px 0px 10px 0px rgba(28,37,65,0.65);
              -moz-box-shadow: inset 0px 0px 10px 0px rgba(28,37,65,0.65);
              box-shadow: inset 0px 0px 10px 0px rgba(28,37,65,0.65);
            }
          `}</style>
          {styleTags}
        </Head>
        <body className='avenir'>
          <div className='root'>
            {main}
          </div>
          <NextScript />
        </body>
      </html>
    )
  }
}
