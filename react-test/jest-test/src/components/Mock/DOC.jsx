import React from 'react';

import { LoadScript, GoogleMap } from 'react-google-maps';

export default function Map(props) {
  const { center } = props;
  return (
    <LoadScript id="script-loader" googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap id="example-map" center={center} />
    </LoadScript>
  );
}
