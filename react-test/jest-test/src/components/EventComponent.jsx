import React, { useState } from 'react';

export default function Toggle(props) {
  const [state, setState] = useState(false);
  const { onChange } = props;

  return (
    <button
      type="submit"
      onClick={() => {
        setState((previousState) => !previousState);
        onChange(!state);
      }}
      data-testid="toggle"
    >
      {state === true ? 'Turn off' : 'Turn on'}
    </button>
  );
}
