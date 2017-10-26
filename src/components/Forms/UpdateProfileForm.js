import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form'
import {Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateProfile } from '../../actions'
import {Row, Col} from 'react-bootstrap'

class UpdateProfileForm extends Component {

  constructor(props) {
    super(props)
    this.calculateTimes = this.calculateTimes.bind(this)
    this.getTime = this.getTime.bind(this)
    this.timeFields = this.timeFields.bind(this)
  }

  calculateTimes(time, difference) {
    let newTime = 0
      if ((time - difference) < 0) {
        newTime = (time - difference) + 24
    } else if ((time - difference) > 24) {
        newTime = (time - difference) - 24
    } else {
        newTime = time - difference
    }
    if (newTime < 10) {
      return "0" + newTime.toString()
    } else {
      return newTime
    }
  }

  getTime() {
    let time = new Date()
    let difference = time.getTimezoneOffset()
    let numberOfHours = difference / 60
    let groups = []
    groups.push(`${this.calculateTimes(22, numberOfHours)}:00-${this.calculateTimes(1, numberOfHours)}:00`)
    groups.push(`${this.calculateTimes(1, numberOfHours)}:00-${this.calculateTimes(4, numberOfHours)}:00`)
    groups.push(`${this.calculateTimes(4, numberOfHours)}:00-${this.calculateTimes(7, numberOfHours)}:00`)
    groups.push(`${this.calculateTimes(7, numberOfHours)}:00-${this.calculateTimes(10, numberOfHours)}:00`)
    groups.push(`${this.calculateTimes(10, numberOfHours)}:00-${this.calculateTimes(13, numberOfHours)}:00`)
    groups.push(`${this.calculateTimes(13, numberOfHours)}:00-${this.calculateTimes(16, numberOfHours)}:00`)
    groups.push(`${this.calculateTimes(16, numberOfHours)}:00-${this.calculateTimes(19, numberOfHours)}:00`)
    groups.push(`${this.calculateTimes(19, numberOfHours)}:00-${this.calculateTimes(22, numberOfHours)}:00`)
    return groups
  }

  timeFields() {
    let groups = this.getTime()
    return groups.map((group, index) => {
        return  (
          <Col xs={3}>
            <label className="time-label" htmlFor={group}>{group}</label>
            <Field
              name={`time${index}`}
              type="checkbox"
              component="input"
              className="time-field"
            />
          </Col>
      )
    })
  }

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
    this.props.updateProfile(values, this.props.profile.id)
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props

    return (
      <form>
        <Field
          placeholder={`Preferred Name / Gamertag: ${this.props.profile.display_name}`}
          name="display_name"
          type="text"
          component={this.renderField}
        />
        <Field
          placeholder={`First Name: ${this.props.profile.first_name}`}
          name="first_name"
          type="text"
          component={this.renderField}
        />
        <Field
          placeholder={`Last Name: ${this.props.profile.last_name}`}
          name="last_name"
          type="text"
          component={this.renderField}
        />

        <Row>
          <p> Play Times:</p>
          <Col xs={12}></Col>

          {this.timeFields()}
        </Row>

        <div className="flex-div">
          <Button className="margin-button" onClick={handleSubmit(this.onSubmit.bind(this))} disabled={pristine || submitting} type="submit" bsStyle="primary" bsSize="small">Update</Button>
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
  form: 'UpdateProfileForm',
   enableReinitialize : true
})(
  connect(null,{updateProfile})(UpdateProfileForm)
);
