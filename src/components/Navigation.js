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
    this.state = { menuOpen: false, loggedIn: !!sessionStorage.JWT}
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    this.props.logout(this)
  }

  name() {
    const LoginButton = (<NavDropdown title="Login" className="no-border" id="basic-nav-dropdown" open={this.state.menuOpen} onToggle={val => this.dropdownToggle(val)}>
      <MenuItem onClick={() => this.menuItemClickedThatShouldntCloseDropdown()} className="default-cursor no-hover" key={4}>
        <LoginForm navObj={this} history={this.props.history} />
      </MenuItem>
    </NavDropdown>)
    const Name = (<NavItem>Welcome</NavItem>)
    if(this.state.loggedIn) {
      return Name
    } else {
      return LoginButton
    }
  }

  registration() {
    const LogoutButton = <Link to="/" onClick={this.handleLogout.bind(this)} className="clean-link">Logout</Link>
    const RegisterButton = <Link to="/signup" className="clean-link">Register</Link>
    if(this.state.loggedIn) {
      return LogoutButton
    } else {
      return RegisterButton
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
            {this.name()}
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
