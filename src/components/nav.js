import React, { Component } from 'react';
import {Navbar, NavDropdown, Nav, NavItem, MenuItem} from 'react-bootstrap';

class Navigation extends Component {
  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <span>PubStomp</span>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Games</NavItem>
            <NavItem eventKey={2} href="#">Friends</NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={3} title="Login" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>User Name Here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Password Here</MenuItem>
            </NavDropdown>
            <NavItem eventKey={2} href="#">Register</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
