import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {Navbar, NavDropdown, Nav, NavItem, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import {logout} from '../actions/index'

class Navigation extends Component {

  constructor(props) {
    super(props)
    this.state = { menuOpen: false }
    this.handleLogout = this.handleLogout.bind(this)

  }

  handleLogout() {
    this.props.logout()
    this.dropdownToggle(false)
  }


  registration() {
    if(!!sessionStorage.JWT) {
        return (
          <Link to="/" onClick={this.handleLogout} className="clean-link">Logout</Link>
          )
      } else {
        return (
          <Link to="/signup" className="clean-link">Register</Link>
          )
      }
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
                <LoginForm history={this.props.history} />
              </MenuItem>
            </NavDropdown>
            <NavItem eventKey={5}>{this.registration()}</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logout: logout}, dispatch)
}

export default connect(null, mapDispatchToProps)(Navigation)
