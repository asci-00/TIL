import { render, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('Search 시나리오', () => {
  it('DOM 구조 확인', () => {
    const element = render(<SearchBar />);
    screen.debug()
  });
  it('스냅샷 확인', () => {
    const element = render(<SearchBar />);
    expect(element.container).toMatchSnapshot()
  })
  
})

