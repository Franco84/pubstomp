import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form'
import {Button} from 'react-bootstrap'

class GameSearch extends Component {

  renderField(field) {
    const { meta: {touched, error} } = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <input
          className="form-control"
          placeholder={field.placeholder}
          type={field.type}
          {...field.input}
        />
      </div>
    )
  }

  onSubmit(values) {
    const newQuery = `https://api.twitch.tv/kraken/search/games?query=${values.game_search}&type=suggest&client_id=5tomyl16m18fgl444stt7mqf5np03x`
    this.props.changeQuery(newQuery)
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props

    return (
      <form>
        <Field
          placeholder=" Search for games.."
          name="game_search"
          type="text"
          component={this.renderField}
        />
        <div className="flex-div">
          <Button className="margin-button" onClick={handleSubmit(this.onSubmit.bind(this))} disabled={pristine || submitting} type="submit" bsStyle="primary" bsSize="small">Submit</Button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'GameSearch'
})(GameSearch)
