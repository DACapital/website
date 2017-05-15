import React from 'react'
import styled from 'styled-components'

const Container = styled.div``
const Title = styled.h1``
const Button = styled.a``
const Page = styled.div`
`
const LogoName = styled.img`
  width: 212px
`

export default () => (
  <Page className='debug-grid'>
    <LogoName
      src='/static/logo-name.png'
    />
    <h1 className='white f1 lh-title avenir'>
      The world’s first decentralized Index Funds for Blockchain Assets is coming.
    </h1>
  </Page>
)
