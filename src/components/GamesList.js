import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import axios from 'axios'
import GameSearch from './Forms/GameSearch'
import { Row, Col } from 'react-bootstrap'
import {getGames, favoriteGame, getFavoriteGames} from '../actions'
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
      favoriteGames: [],
      noGames: false,
      query: ' '
    }
  }

  componentDidMount() {
    this.props.getFavoriteGames()
  }

  onGameChange( game ) {
     const gameInfo = {game_id: game.id, cover_url: game.url, name: game.name}
      this.props.favoriteGame(gameInfo)
  }

  changeQuery(value) {
    this.setState({
          elementsArr: [],
          favoriteGames: [],
          query: value})
  }

  getGamesList(query) {
    let elements = {}
    const instance = axios.create({
      transformRequest: [(data, headers) => {
      delete headers.common.token
      return data
    }]
    })
    instance.defaults.baseURL = 'http://localhost:8080/api/v1/games/search/'
    instance.get(query)
        .then( response => {
          if(response.data.length > 0) {
            for(let i = 0; i < response.data.length; i++) {
              if(response.data[i].cover) {
                elements[i] = {}
                elements[i].name = response.data[i].name
                elements[i].url = `http:${response.data[i].cover.url}`
                elements[i].id = response.data[i].id
                elements[i].url = elements[i].url.replace("thumb", "cover_uniform")
                }
              }
                this.setState({elementsArr: elements})
            } else if (response.data.length === 0) {
                this.setState({noGames: true})
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
      let rows = Object.keys(this.state.elementsArr).map((currElement, index) => {
        return (
          <div key={index}>
          <Col className="gamelist" xs={3} sm={2} smOffset={this.getOffSet(index)}>
            <Card onClick={() => {
              this.onGameChange(this.state.elementsArr[currElement])
            }}>
              <CardMedia>
                <img className="card-pic" src={this.state.elementsArr[currElement].url} alt='hi'/>
              </CardMedia>
              <CardActions>
                <div className="gamelist-checkbox" >
                  <Checkbox style={{ display: "flex"}}
                    checked={this.props.favoriteGames.includes(this.state.elementsArr[currElement].id)}
                    id={this.state.elementsArr[currElement].id}
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
    )}, this)
    return rows
  }

  render() {
    return (
      <div>
          <Row className="feed">
          <Col xs={12} sm={10} xsOffset={0} smOffset={1}>
          <GameSearch changeQuery={this.changeQuery.bind(this)} />
          {this.state.elementsArr.length === 0 ? this.spinner() : null}
          {this.state.elementsArr.length === 0  ? this.printGamesList() : null}
          </Col>
          {this.gamesRows()}
          </Row>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    favoriteGames: state.games
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getGames: getGames, favoriteGame: favoriteGame, getFavoriteGames: getFavoriteGames}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesList)
