import React from 'react';
import { render } from '@testing-library/react';

import Main from '../components/Mock/Main';

jest.mock('../components/Mock/DOC', () => {
  return function DummyMap(props) {
    const {
      center: { lat, long },
    } = props;
    return (
      <div data-testid="map">
        {lat}:{long}
      </div>
    );
  };
});

it('should render contact information', () => {
  const center = { lat: 0, long: 0 };
  const { container } = render(
    <Main name="Joni Baez" email="test@example.com" site="http://test.com" center={center} />
  );

  expect(container.querySelector("[data-testid='email']").getAttribute('href')).toEqual('mailto:test@example.com');
  expect(container.querySelector('[data-testid="site"]').getAttribute('href')).toEqual('http://test.com');
  expect(container.querySelector('[data-testid="map"]').textContent).toEqual('0:0');
});
