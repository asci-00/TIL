import React from 'react';
import { render } from '@testing-library/react';
import Toggle from '../components/EventComponent';

it('changes value when clicked', () => {
  const onChange = jest.fn();
  const { container } = render(<Toggle onChange={onChange} />);

  const button = container.querySelector('[data-testid=toggle]');
  expect(button.innerHTML).toBe('Turn on');

  button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(button.innerHTML).toBe('Turn off');

  for (let i = 0; i < 5; i++) button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  expect(onChange).toHaveBeenCalledTimes(6);
  expect(button.innerHTML).toBe('Turn on');
});
