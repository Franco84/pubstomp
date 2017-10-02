import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap'
import SignupForm from './SignupForm'


class Signup extends Component {
  render() {

    return (
      <Grid>
        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
            <p className="text-center">PubStomp Sign Up:</p>
            <SignupForm history={this.props.history} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Signup;
