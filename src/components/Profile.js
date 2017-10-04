import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { getProfile } from '../actions'

class Profile extends Component {

  componentDidMount(){
    this.props.getProfile()
  }

  render(){
    if (!this.props.profile) {
      return ( <div>Loading...</div>) }
    else return(
      <div>

      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    income: state.profile
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getProfile: getProfile}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
