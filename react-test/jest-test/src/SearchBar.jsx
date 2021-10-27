import React from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap'

export default function Component(props) {
  return (
    <form id='search-bar'>
        <InputGroup className="mb-3">
            <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">Search</Button>
        </InputGroup>
    </form>
  )
}