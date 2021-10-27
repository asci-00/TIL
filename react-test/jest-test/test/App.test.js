import { render, screen } from '@testing-library/react';
import SearchBar from 'src/SearchBar';

test('renders learn react link', () => {
  render(<SearchBar />);
  screen.debug()
});