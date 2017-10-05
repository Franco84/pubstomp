import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form'
import {Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { createProfile } from '../actions'

class ProfileForm extends Component {

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
    this.props.createProfile(values)
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props

    return (
      <form>
        <Field
          placeholder=" GamerTag/Preferred Name"
          name="display_name"
          type="text"
          component={this.renderField}
        />
        <Field
          placeholder=" First Name"
          name="first_name"
          type="text"
          component={this.renderField}
        />
        <Field
          placeholder=" Last Name"
          name="last_name"
          type="text"
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
  if (!values.display_name) {
    errors.display_name = "Enter Display Name"
  }
  if (!values.first_name) {
    errors.first_name = "Enter First Name"
  }
  if (!values.last_name) {
    errors.last_name = "Enter Last Name"
  }
  return errors
}

export default reduxForm({
  validate,
  form: 'ProfileForm',
   enableReinitialize : true
})(
  connect(null,{createProfile})(ProfileForm)
);
