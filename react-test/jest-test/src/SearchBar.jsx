import React, { useState } from 'react';
import {InputGroup, FormControl, Button, Alert} from 'react-bootstrap'

export default function Component(props) {
  const { onChange, onSubmit } = props
  const [val, setValue] = useState('')

  return (
    <form id='search-bar'>
        <InputGroup className="mb-3">
            <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={val}
                onChange={ev => { setValue(ev.target.value); onChange(ev.target.value) }}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={()=>onSubmit(val)}>Search</Button>
        </InputGroup>
        <Alert variant='dark'>{val ? val : 'Input your text'}</Alert>
    </form>
  )
}