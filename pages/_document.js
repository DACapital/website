import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  render () {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()
    return (
      <html lang="en">
        <Head>
          <title>DACapital</title>
          <meta name="theme-color" content="#1C2541" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="/static/tachyons.css" />
          <link rel="stylesheet" href="/static/stars.css" />
          <style>{`
            body {
              background-color: #1C2541;
              background: radial-gradient(ellipse at bottom, black 0%, #1C2541 100%);
              margin: 0px;
            }
          `}</style>
          {styleTags}
        </Head>
        <body>
          <div className='root'>
            {main}
          </div>
          <NextScript />
        </body>
      </html>
    )
  }
}
