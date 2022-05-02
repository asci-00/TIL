import React, { useState, useEffect } from 'react';

export default function Component(props) {
  const [data, setData] = useState(null);
  const { id } = props;

  async function fetchData(id) {
    const response = await fetch(`/data/${id}`);
    setData(await response.json());
  }

  useEffect(() => {
    fetchData(id);
  }, [id]);

  if (!data) return 'loading...';

  return (
    <details>
      <summary>{data.id}</summary>
      <strong>{data.phone}</strong>
    </details>
  );
}
