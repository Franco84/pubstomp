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

  onSubmit(value) {
    this.props.changeQuery(value.game_search)
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
