import React from 'react';
import { render } from '@testing-library/react';
import pretty from 'pretty';

import Hello from '../components/SearchBar';

it('should render a greeting', () => {
  const { container } = render(<Hello />);
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<form id=\\"search-bar\\">
      <div class=\\"mb-3 input-group\\"><input placeholder=\\"Recipient's username\\" aria-label=\\"Recipient's username\\" aria-describedby=\\"basic-addon2\\" class=\\"form-control\\" value=\\"\\"><button id=\\"button-addon2\\" type=\\"button\\" class=\\"btn btn-outline-secondary\\">Search</button></div>
      <div role=\\"alert\\" class=\\"fade alert alert-dark show\\">placeholder</div>
    </form>"
  `); /* ... jest에 의해 자동으로 채워집니다 ... */
  render(<Hello name="Jenny" />);
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<form id=\\"search-bar\\">
      <div class=\\"mb-3 input-group\\"><input placeholder=\\"Recipient's username\\" aria-label=\\"Recipient's username\\" aria-describedby=\\"basic-addon2\\" class=\\"form-control\\" value=\\"\\"><button id=\\"button-addon2\\" type=\\"button\\" class=\\"btn btn-outline-secondary\\">Search</button></div>
      <div role=\\"alert\\" class=\\"fade alert alert-dark show\\">placeholder</div>
    </form>"
  `); /* ... jest에 의해 자동으로 채워집니다 ... */
  render(<Hello name="Margaret" />);
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<form id=\\"search-bar\\">
      <div class=\\"mb-3 input-group\\"><input placeholder=\\"Recipient's username\\" aria-label=\\"Recipient's username\\" aria-describedby=\\"basic-addon2\\" class=\\"form-control\\" value=\\"\\"><button id=\\"button-addon2\\" type=\\"button\\" class=\\"btn btn-outline-secondary\\">Search</button></div>
      <div role=\\"alert\\" class=\\"fade alert alert-dark show\\">placeholder</div>
    </form>"
  `); /* ... jest에 의해 자동으로 채워집니다 ... */
});
