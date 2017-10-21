import React, { Component } from 'react'
import {connect} from 'react-redux'
import UserPage from './UserPage'
import LandingPage from './LandingPage'

class App extends Component {

  renderPage() {
    if (this.props.auth.authenticated) {
      return <UserPage />
    } else {
      return <LandingPage />
    }
  }

  render() {
    return (
      <div>
        {this.renderPage()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth
  }
}


export default connect(mapStateToProps)(App)
