import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {Navbar, NavDropdown, Nav, NavItem, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import LoginForm from './Forms/LoginForm'
import {logout, getProfile, profileLogout} from '../actions'
import pubstomp_2 from '../img/pubstomp_2.png'

class Navigation extends Component {

  constructor(props) {
    super(props)
    this.state = { menuOpen: false}
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    this.props.profileLogout()
    this.props.logout()
    this.setState({ menuOpen: false})
  }

  name() {
    const LoginButton = (<NavDropdown title="Login" className="no-border" id="basic-nav-dropdown" open={this.state.menuOpen} onToggle={val => this.dropdownToggle(val)}>
      <MenuItem onClick={() => this.menuItemClickedThatShouldntCloseDropdown()} className="default-cursor no-hover" key={4}>
        <LoginForm navObj={this} history={this.props.history} />
      </MenuItem>
    </NavDropdown>)
    if(this.props.auth.authenticated) {
      return (<NavItem><Link to='/' className="clean-link">Welcome, {this.props.profile.display_name ? this.props.profile.display_name : 'Player!' }</Link></NavItem>)
    } else {
      return LoginButton
    }
  }

  registration() {
    const LogoutButton = <Link to="/" onClick={this.handleLogout.bind(this)} className="clean-link">Logout</Link>
    const RegisterButton = <Link to="/signup" className="clean-link">Register</Link>
    if(this.props.auth.authenticated) {
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
            <span><Link to='/' className="clean-link">  <img alt="PubStomp Secondary Logo" className="secondary-logo" src={pubstomp_2} /></Link></span>
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

function mapStateToProps(state){
  return {
    profile: state.profile,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logout: logout, getProfile: getProfile, profileLogout: profileLogout}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
