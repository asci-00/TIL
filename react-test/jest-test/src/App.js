import React, { useState } from 'react';
import {Navbar, Container, NavDropdown, Nav} from 'react-bootstrap'
import SearchComponent from './components/SearchBar'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App(props) {
  const [query, setQuery] = useState('')
  return (
    <section id='root-wrapper'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">React Test Library Study</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar><br/>
      <Container>
        <SearchComponent onChange={setQuery} placeholder='Input your query'/>
      </Container>
    </section>
  )
}