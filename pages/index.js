import React from 'react'
import styled from 'styled-components'
import tachyons from 'styled-components-tachyons'

const H1 = styled.h1`
  ${tachyons}
`

const Header = styled.div`
  padding: 20px 40px
`

const LogoName = styled.img`
  width: 212px
`

export default () => (
  <Header>
    <LogoName
      src='/static/logo-name.png'
    />
    <H1 f1 f_headline_l fw1 i dark-pink>
      Hello World
    </H1>
  </Header>
)
