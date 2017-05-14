import React from 'react'
import styled from 'styled-components'

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
  </Header>
)
