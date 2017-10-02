import React, { Component } from 'react';
import {Navbar, NavDropdown, Nav, NavItem, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'

class Navigation extends Component {

  constructor(props) {
    super(props)
    this.state = { menuOpen: false }
  }

  dropdownToggle(newValue){
      if (this._forceOpen){
          this.setState({ menuOpen: true });
          this._forceOpen = false;
      } else {
          this.setState({ menuOpen: newValue });
      }
  }
  menuItemClickedThatShouldntCloseDropdown(){
      this._forceOpen = true;
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <span><Link to='/' className="clean-link">PubStomp</Link></span>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}>Games</NavItem>
            <NavItem eventKey={2}>Friends</NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown title="Login" className="no-border" id="basic-nav-dropdown" open={this.state.menuOpen} onToggle={val => this.dropdownToggle(val)}>
              <MenuItem onClick={() => this.menuItemClickedThatShouldntCloseDropdown()} className="default-cursor no-hover" key={4}>
                <LoginForm />
              </MenuItem>
            </NavDropdown>
            <NavItem eventKey={5}><Link to="/signup" className="clean-link">Register</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
