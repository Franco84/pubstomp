import React, { Component } from 'react'
import {Field, reduxForm} from 'redux-form'

class UserSearch extends Component {
    renderField(field) {
        const { meta: {touched, error} } = field
        const className = `search-width form-group ${touched && error ? 'has-danger' : ''}`
        return (
          <div className={className}>
            <div className="input-group">
              <span className="input-group-addon left-round glyph-height"><i class="glyphicon glyphicon-search"></i></span>
              <input
                className="form-control right-round input-xs"
                placeholder={field.placeholder}
                type={field.type}
                {...field.input}
              />
            </div>
          </div>
        )
      }

    onSubmit(values) {
      debugger
      }

      render() {
        const {handleSubmit} = this.props

        return (
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              placeholder=" Player Search"
              name="player_search"
              type="text"
              component={this.renderField}
            />
          </form>
        );
      }
}

export default reduxForm({
  form: 'UserSearch'
})(UserSearch)
