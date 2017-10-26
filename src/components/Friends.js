
import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'

class Friends extends Component {

  render(){
    return (
    <div>
        <Row className="feed">
        <Col xs={12} sm={10} xsOffset={0} smOffset={1}>
          Hi!
        </Col>
        </Row>
    </div>
  )}
}

export default Friends
