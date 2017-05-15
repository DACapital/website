import React from 'react'
import styled from 'styled-components'
import tachyons from 'styled-components-tachyons'
import Link from 'next/link'

const H1 = styled.h1`
  ${(tachyons) => {
    console.log(tachyons)
  }}
`

const Header = styled.div`
  background-color: var(--white)
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
    <H1 f1 f_headline_l fw1 i white_60>
      Hello World
    </H1>
    <Link href="/">
      Hello World
    </Link>
  </Header>
)
