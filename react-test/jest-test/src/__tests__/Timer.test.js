import React from 'react';
import { render } from '@testing-library/react';
import Card from '../components/TimeWithComponent';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe('component with setTimeout api test', () => {
  it('should select null after timing out', () => {
    const onSelect = jest.fn();
    render(<Card onSelect={onSelect} />);

    expect(onSelect).not.toHaveBeenCalled();

    // 그리고 5초만큼 앞당긴다.
    jest.advanceTimersByTime(5000);
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('should cleanup on being removed', () => {
    const onSelect = jest.fn();
    const { unmount } = render(<Card onSelect={onSelect} />);
    jest.advanceTimersByTime(100);
    expect(onSelect).not.toHaveBeenCalled();

    // 마운트 해제한다.
    unmount();
    jest.advanceTimersByTime(5000);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should accept selections', () => {
    const onSelect = jest.fn();
    const { container } = render(<Card onSelect={onSelect} />);
    container.querySelector("[data-testid='2']").dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onSelect).toHaveBeenCalledWith(2);
  });
});
