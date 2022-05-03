import React from 'react';
import Map from './DOC';

export default function Contact(props) {
  const { name, email, site, center } = props;
  return (
    <div>
      <address>
        Contact {name} via{' '}
        <a data-testid="email" href={`mailto:${email}`}>
          email
        </a>
        or on their{' '}
        <a data-testid="site" href={site}>
          website
        </a>
      </address>
      <Map center={center} />
    </div>
  );
}
