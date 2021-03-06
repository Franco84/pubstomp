import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import ProfileForm from './Forms/ProfileForm'
import UpdateProfileForm from './Forms/UpdateProfileForm'
import { getProfile } from '../actions'
import {Grid, Row, Col} from 'react-bootstrap'

class Profile extends Component {

  componentDidMount(){
    if(localStorage.getItem('token')) {
      this.props.getProfile()
    }
  }

  showForm() {
    if(this.props.profile.length === 0) {
      return (
        <div>
          <p className="text-center">Complete your profile:</p>
          <ProfileForm />
      </div>
    )
    } else {
        return(
         <div>
          <p className="text-center">Update your profile:</p>
          <UpdateProfileForm profile={this.props.profile}/>
        </div>
    )
    }
  }

  render(){
    return (
      <Grid>
        <Row>
          <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
            <div>
              {this.showForm()}
            </div>
          </Col>
        </Row>
      </Grid>

    )
  }
}

  function mapStateToProps(state){
    return {
      profile: state.profile,
      auth: state.auth
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({getProfile: getProfile}, dispatch)
  }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
