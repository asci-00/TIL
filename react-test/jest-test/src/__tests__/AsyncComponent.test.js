import React from 'react';

import { render, waitFor } from '@testing-library/react';
import AsyncComponent from '../components/AsyncComponent';

it('renders fetch data', async () => {
  const fakeData = { id: '1', phone: '010-0912-1244' };

  jest.spyOn(globalThis, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData),
    })
  );

  const { container } = render(<AsyncComponent id="1" />);

  expect(container.textContent).toBe('loading...');

  // expect(container.querySelector('summary').textContent).toBe(fakeData.id);
  // expect(container.querySelector('strong').textContent).toBe(fakeData.phone);

  await waitFor(() => expect(container.querySelector('summary').textContent).toBe(fakeData.id));
  await waitFor(() => expect(container.querySelector('strong').textContent).toBe(fakeData.phone));

  globalThis.fetch.mockRestore();
});
