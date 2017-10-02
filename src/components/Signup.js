import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap'
import SignupForm from './SignupForm'


class Signup extends Component {
  render() {

    return (
      <Grid>
        <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
          <p className="text-center">PubStomp Sign Up:</p>
          <SignupForm />
        </Col>
      </Grid>
    );
  }
}

export default Signup;
