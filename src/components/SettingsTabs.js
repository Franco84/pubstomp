import React, { Component } from 'react'
import {Tabs, Tab, Col} from 'react-bootstrap'
import Profile from './Profile'
import GamesList from './GamesList'


class SettingsTabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: 1
    }
  }

handleSelect(key) {
  this.setState({key})
}

renderForm(key) {
  if(this.state.key === 1) {
    return <Profile />
  } else if(this.state.key === 2) {
    return <GamesList />
  } else if(this.state.key === 3) {
    return "Tab 3 Content"
  }
}

render() {
  return (
    <div>
      <div>
        <Col xs={12} sm={8} smOffset={2}>
          <Tabs activeKey={this.state.key} onSelect={this.handleSelect.bind(this)} id="controlled-tab">
            <Tab eventKey={1} title="Profile"><div className="pad-top"></div></Tab>
            <Tab eventKey={2} title="Games"><div className="pad-top"></div></Tab>
            <Tab eventKey={3} title="Tab 3"><div className="pad-top"></div></Tab>
          </Tabs>
        </Col>
      </div>
      {this.renderForm(this.state.key)}
    </div>
  )
  }
}
export default SettingsTabs;
