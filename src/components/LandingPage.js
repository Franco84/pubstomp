import React, { Component } from 'react';
import ServiceBoxes from './ServiceBoxes'
import pubstomp from '../img/pubstomp.jpg'
import {Grid, Row, Col} from 'react-bootstrap'

class LandingPage extends Component {
  renderLogo() {
    return  (
      <Grid>
        <Row>
          <Col xs={6} xsOffset={3}>
            <img alt="PubStomp Main Logo" className="img-responsive" src={pubstomp} />
          </Col>
        </Row>
      </Grid>
    )
  }

  render() {
    return (
      <div>
        {this.renderLogo()}
        <ServiceBoxes />
      </div>
    )
  }
}


  export default LandingPage;
