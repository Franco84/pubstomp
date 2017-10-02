import React, { Component } from 'react';
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap'

class ServiceBoxes extends Component {

  renderBox(icon, title, description) {
    return (
      <div className="serviceBox">
        <div className="service-icon">
          <Glyphicon glyph={icon} />
        </div>
        <h3 className="title">{title}</h3>
        <p className="description">
          {description}
        </p>
      </div>
    )
  }

  render() {
    return (
        <Grid>
          <Row>
            <Col sm={4} xs={12}>
              {this.renderBox("user", "Join", "Set your profile to let people know what you want to play, and when. We'll match you and fill out your group so you can start a raid or take over that shiny new base you've been eyeing.")}
            </Col>
            <Col sm={4} xs={12}>
              {this.renderBox("transfer", "Connect", "LFG: Meet gamers who love the same games as you do, play at the same time, and team up to crush the competition.")}
            </Col>
            <Col sm={4} xs={12}>
              {this.renderBox("comment", "Plan Your Victory", "Chat, leave messages, and set notifications for your group. You can even help find a replacement so they can soldier on if you can't make it.")}
            </Col>
          </Row>
        </Grid>
    );
  }
}

export default ServiceBoxes;
