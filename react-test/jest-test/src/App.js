import React, { useState } from 'react';

export default function App(props) {
  const [state, setState] = useState({
    value: 0,
    title: '',
  })

  const changeTitle = (e) => setState(prev => ({...prev, title: e.target.value }))

  const increment = () => setState(prev => ({...prev, value: prev.value + 1 }))

  return (
    <div>
      <input type='text' value={state.title} id="title" onChange={changeTitle} />
      <div>
        <b>{state.value}</b>
        <button id="up" onClick={increment}>증가</button>
      </div>
    </div>
  )
}