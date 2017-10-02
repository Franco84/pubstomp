import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form'
import {Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { login } from '../actions'

class LoginForm extends Component {

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
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.history.push('/')
    this.props.login(values)
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props

    return (
      <form>
        <Field
          placeholder=" E-mail"
          name="email"
          type="text"
          component={this.renderField}
        />
        <Field
          placeholder=" Password"
          name="password"
          type="password"
          component={this.renderField}
        />
        <Button onClick={handleSubmit(this.onSubmit.bind(this))} disabled={pristine || submitting} type="submit" bsStyle="primary" bsSize="xsmall">Submit</Button>
      </form>

    );
  }
}

function validate(values) {
  const errors = {}
  if (!values.email) {
    errors.email = "Enter E-mail"
  }
  if (!values.password) {
    errors.password = "Enter Password"
  }
  return errors
}

export default reduxForm({
  validate,
  form: 'LoginForm'
})(
  connect(null,{login})(LoginForm)
);