import React, { Component } from 'react'
import axios from 'axios'
import GameSearch from './Forms/GameSearch'
import { Row, Col } from 'react-bootstrap'
import {Card, CardActions, CardMedia} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';

class GamesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementsArr: [],
      selectedGames: {},
      noGames: false,
      query: 'https://api.twitch.tv/kraken/games/top?limit=20&client_id=5tomyl16m18fgl444stt7mqf5np03x'
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

  changeQuery(newQuery) {
    this.setState({
          elementsArr: [],
          selectedGames: {},
          query: newQuery})
  }

  getGamesList(query) {
    var elements = []
    const instance = axios.create({
      transformRequest: [(data, headers) => {
      delete headers.common.token
      return data
      }]
    })
    instance.get(query)
        .then( response => {
          if(response.data.top) {
            let gamesList = response.data.top
            for( let i = 0; i < response.data.top.length; i++) {
                elements.push([gamesList[i].game.name,gamesList[i].game.box.medium, gamesList[i].game._id])
              }
                this.setState({elementsArr: elements})
            } else if (response.data.games.length === 0) {
                this.setState({noGames: true})
            } else if (response.data.games) {
                let gamesList = response.data.games
                  for( let i = 0; i < response.data.games.length; i++) {
                    elements.push([gamesList[i].name,gamesList[i].box.medium, gamesList[i]._id])
                  }
                  this.setState({elementsArr: elements})
            }
        })
        .catch( err => console.error( err.message ) );
    }

    printGamesList() {
      if(this.state.elementsArr.length === 0 && this.state.noGames === false){
        this.getGamesList(this.state.query)
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
          <Row className="feed">
          <Col xs={10} sm={10} md={10} lg={10} xsOffset={1} smOffset={1} mdOffset={1} lgOffset={1}>
          {this.state.elementsArr.length === 0 ? this.spinner() : null}
          {this.state.elementsArr.length === 0  ? this.printGamesList() : null}
          <GameSearch changeQuery={this.changeQuery.bind(this)} />
          {this.gamesRows()}
          </Col>
          </Row>
      </div>
    )
  }
}

export default GamesList
