import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import {Card, CardActions, CardMedia} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';

class GamesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementsArr: [],
      selectedGames: {}
    }
  }

   onGameChange( id ) {
    if (id.toString() in (this.state.selectedGames)) {
      let selectedGames = {}
      for(let key in this.state.selectedGames) {
          if(key !== id.toString()) {
            selectedGames[key]= this.state.selectedGames[key]
          }
        }
      this.setState({selectedGames: {selectedGames}})
    } else {
      this.setState({selectedGames: {...this.state.selectedGames, [id.toString()]: id} })
    }
  }

  getGamesList() {
    var elements = []
    const instance = axios.create({
      transformRequest: [(data, headers) => {
      delete headers.common.token
      return data
      }]
    })
    instance.get('https://api.twitch.tv/kraken/games/top?limit=20&client_id=5tomyl16m18fgl444stt7mqf5np03x')
        .then( response => {
          let gamesList = response.data.top
          for( let i = 0; i < response.data.top.length; i++) {
            elements.push([gamesList[i].game.name,gamesList[i].game.box.medium, gamesList[i].game._id])
            }
            this.setState({elementsArr: elements})
          })
        .catch( err => console.error( err.message ) );
    }

    printGamesList() {
      if(this.state.elementsArr.length === 0){
        this.getGamesList()
      }
    }

    spinner() {
      return (
        <div>
          <CircularProgress size={80} thickness={5} />
        </div>
      )
    }

    getOffSet(index) {
      return index === 0 || index % 5 === 0 ? 1 : 0
      }

    gamesRows() {
      let rows = this.state.elementsArr.map((currElement, index) => {
        return (
          <div key={index}>
          <Col className="gamelist" sm={2} smOffset={this.getOffSet(index)}>
            <Card onClick={() => {
              this.onGameChange(this.state.elementsArr[index][2])
            }}>
              <CardMedia>
                <img src={this.state.elementsArr[index][1]} alt='hi'/>
              </CardMedia>
              <CardActions>
                <div className="gamelist-checkbox" >
                  <Checkbox style={{ display: "flex"}}
                    checked={this.state.elementsArr[index][2] in this.state.selectedGames ? true : false}
                    id={this.state.elementsArr[index][2]}
                    disableTouchRipple
                    disableFocusRipple
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                  />
                </div>
              </CardActions>
            </Card>
          </Col>
        </div>
    )})
    return rows
  }

  render() {
    return (
      <div>
        <p>Select Your Games!</p>
          <Row className="feed">
          <Col xs={10} sm={10} md={10} lg={10} xsOffset={1} smOffset={1} mdOffset={1} lgOffset={1}>
          {this.state.elementsArr.length === 0 ? this.spinner() : null}
          {this.state.elementsArr.length === 0  ? this.printGamesList() : null}
          {this.gamesRows()}
          </Col>
          </Row>
      </div>
    )
  }
}

export default GamesForm
