import React, { Component } from 'react';
import ServiceBoxes from './ServiceBoxes'
import pubstomp from '../img/pubstomp.jpg'
import {Grid, Row, Col} from 'react-bootstrap'


class App extends Component {
  render() {

    return (
      <div>
        <Grid>
          <Row>
            <Col xs={6} xsOffset={3}>
              <img className="img-responsive" src={pubstomp} />
            </Col>
          </Row>
        </Grid>
        <ServiceBoxes />
      </div>
    );
  }
}

export default App;
