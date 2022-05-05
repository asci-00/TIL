import React, { useEffect } from 'react';

export default function Card(props) {
  const { onSelect } = props;

  useEffect(() => {
    const timeoutID = setTimeout(() => onSelect(1), 5000);
    return () => clearTimeout(timeoutID);
  }, [onSelect]);

  return [1, 2, 3, 4].map((choice) => (
    <button key={choice} data-testid={choice} onClick={() => onSelect(choice)} type="submit">
      {choice}
    </button>
  ));
}
