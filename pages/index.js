import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Logo = styled.img`
  position: absolute;
  left: 50px;
  width: 300px;
  bottom: -200px;
`
const LogoStrip = styled(Logo)`
  left: 51px;
`

const LogoName = styled.img`
`

export default () => (
  <article>
    <div className='vh-100 dt w-100 tc white cover ph4 pt2'>
      <div className="z-0" id="stars"/>
      <div className="z-0" id="stars2"/>
      <div className="z-0" id="stars3"/>
      <div className='dtc v-mid center'>
        <image
          className='z-1 relative w4 w-30-ns mw5'
          src='/static/logo.png'
        />
        <h2 className='mt4 avenir f4 fw4 ttu tracked lh-title'>
          The world’s first decentralized
          <br />
          Index Funds for Blockchain Assets is coming.
        </h2>
      </div>
    </div>
    <div className='bg-white z-1 relative'>
      <div className='center measure-wide f5 pv5 lh-copy ph4'>
        <h1 className='f2 lh-title'>The repercussion of ugliness is endless</h1>
        <p>
          The choice of paper size is one of the  first of any given work to be printed. There are two basic paper size systems in the world: the international A sizes, and the American sizes.
        </p>
        <p>
          The international Standard paper sizes, called the A series, is based
          on a golden rectangle, the divine proportion. It is extremely handsome
          and practical as well. It is adopted by many countries around the world
          and is based on the German DIN metric Standards. The United States uses
          a basic letter size (8 1/2 x 11”) of ugly proportions, and results in
          complete chaos with an endless amount of paper sizes. It is a
          by-product of the culture of free enterprise, competition and waste.
          Just another example of the misinterpretations of freedom.
        </p>
        <p>
          These are the basic DIN sizes in mm. for : A0, 841x1189 - A1, 594x841 -
          A2, 420x594 - A3, 297x420 - A4, 210x297 - A5, 148x210 - A6, 105 x148 -
          A7, 74x 105 - A8, 52x74 - A9, 37x52 - A10, 26x37.
        </p>
        <p>
          The A4 is the basic size for stationary. Two thirds of it is a square,
          a nice economical happenstance resulting from the golden rectangle.
          It is one of the reasons we tend to use as much
          as possible the DIN sizes: proportions are always leading to other nice proportions.
        </p>
        <p>
          This does not happen with the American basic size which leads to nothing. I counted 28 different standard sizes in USA!. The only reason we use it is because everybody in USA uses it, all stationary in USA is that size, so are manilla folders,  les and of ce equipment!
          The repercussion of ugliness is endless.
        </p>
      </div>
    </div>
  </article>
)
