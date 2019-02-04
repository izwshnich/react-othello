import * as React from 'react'
import { shallow } from 'enzyme'
import Hello from './Hello'

describe('<Hello />', () =>{
  it('should render without throwing an error', () => {
    expect(shallow(<Hello name={'Jest'} />).contains(<div>Hello, Jest</div>)).toBe(true)
  })
})