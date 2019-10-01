/* eslint-disable max-classes-per-file */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export class FormikRadioButtonGroup extends React.Component {
  handleChange = val => {
    this.props.onChange(this.props.name, val);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, value, options, inline = false } = this.props;
    return (
      <>
        {options.map((child, index) => {
          return (
            <div
              key={`${name}_${child.value}_${index}`}
              className={`position-relative form-check ${
                inline ? 'form-check-inline' : ''
              }`}
            >
              <label className="form-check-label">
                <input
                  id={child.value}
                  name={name}
                  type="radio"
                  className="form-check-input"
                  onChange={() => this.handleChange(child.value)}
                  onBlur={this.handleBlur}
                  defaultChecked={value === child.value}
                  disabled={child.disabled}
                />
                {child.label}
              </label>
            </div>
          );
        })}
      </>
    );
  }
}

export class FormikDatePicker extends React.Component {
  handleChange = val => {
    this.props.onChange(this.props.name, val);
  };

  handleBlur = val => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, value, className } = this.props;
    return (
      <DatePicker
        id={name}
        name={name}
        className={className}
        selected={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    );
  }
}
