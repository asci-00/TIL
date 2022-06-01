import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Toggle from '../components/EventComponent';

describe('event rendering', () => {
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
  it('changes value when clicked through fireEvent', () => {
    const onChange = jest.fn();
    const { container } = render(<Toggle onChange={onChange} />);

    const button = container.querySelector('[data-testid=toggle]');
    expect(button.innerHTML).toBe('Turn on');

    fireEvent.click(button);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(button.innerHTML).toBe('Turn off');

    for (let i = 0; i < 5; i++) fireEvent.click(button);

    expect(onChange).toHaveBeenCalledTimes(6);
    expect(button.innerHTML).toBe('Turn on');
  });
});
