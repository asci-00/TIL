import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NotFound from '../components/NotFound';

configure({ adapter: new Adapter() });

describe('<NotFount />', () => {
  it('renders path', () => {
    const wrapper = mount(<NotFound path="/notfound" />);
    expect(wrapper.props().path).toBe('/notfound');
  });
});
