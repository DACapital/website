import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import Index, { Logo } from './index.js'

describe('With Enzyme', () => {
  it('App shows "Hello world!"', () => {
    const app = shallow(<Index />)
    expect(app.find(Logo)).toHaveLength(1)
  })
})

describe('With Snapshot Testing', () => {
  it('App shows "Hello world!"', () => {
    const component = renderer.create(<Index />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
