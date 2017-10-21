import React, { Component } from 'react'
import {Grid, Row} from 'react-bootstrap'
import SettingsTabs from './SettingsTabs'

class UserPage extends Component {
  renderTabs() {
    return  (
      <Grid>
        <Row>
            <SettingsTabs />
        </Row>
      </Grid>
    )
  }

  render() {
    return (
      <div>
        {this.renderTabs()}
      </div>
    )
  }
}


  export default UserPage;
