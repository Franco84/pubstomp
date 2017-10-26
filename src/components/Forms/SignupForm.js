import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form'
import {Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { signup } from '../../actions'

class SignupForm extends Component {

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
    this.props.signup(values)
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props

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
        <Field
          placeholder=" Confirm Password"
          name="password_confirmation"
          type="password"
          component={this.renderField}
        />

        <div className="flex-div">
          <Button className="margin-button" onClick={handleSubmit(this.onSubmit.bind(this))} disabled={pristine || submitting} type="submit" bsStyle="primary" bsSize="small">Submit</Button>
          <Button className="margin-button" type="button" disabled={pristine || submitting} bsSize="small" onClick={reset}>Clear</Button>
        </div>
      </form>

    );
  }
}

function validate(values) {
  const errors = {}
  if (!values.name) {
    errors.name = "Enter Name"
  }
  if (!values.email) {
    errors.email = "Enter E-mail"
  }
  if (!values.password) {
    errors.password = "Enter Password"
  }
  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = "Passwords do not match"
  }
  return errors
}

export default reduxForm({
  validate,
  form: 'SignupForm'
})(
  connect(null,{signup})(SignupForm)
);
