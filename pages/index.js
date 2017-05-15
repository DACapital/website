import React from 'react'
import styled from 'styled-components'

const Container = styled.div``
const Title = styled.h1``
const Button = styled.a``
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
    <Container className="ph3">
      <Title className="f6 fw6 ttu tracked white">Basic button</Title>
      <Button className="f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-green" href="#0">Button Text</Button>
    </Container>
  </Header>
)
