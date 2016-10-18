import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import validate from './functions/validate'
import submit from './functions/submit'
import './UPCEntry.scss'

import FontAwesome from 'react-fontawesome'

const renderUPCList = ({ fields, meta: { touched, error } }) => {
  if (fields.length === 0) {
    fields.push({})
  }

  return (
    <div>
      {fields.map((member, index) =>
        <div key={index}>
          <div className='inputRow'>
            <div className='inputRowField'>
              <Field
                name={`${member}.upcValue`}
                type='text'
                component={renderField}
                label='Enter UPC Value' />
            </div>
            <div className='rowButtons'>
              <FontAwesome onClick={() => fields.push({})} name='plus' />
              <FontAwesome className={index === 0 && 'disabled'} onClick={() => fields.push({})} name='minus'
                onClick={index !== 0 && (() => fields.remove(index))} />
            </div>
          </div>
        </div>
    )}
    </div>
)
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input {...input} type={type} placeholder={label} />
      <div className='error'>{touched && error && <span>{error}</span>}</div>
    </div>
  </div>
)

const FieldArraysForm = (props) => {
  const { error, handleSubmit, invalid, pristine, reset, submitting } = props
  return (
    <div>
      <h1>UPC Data Entry</h1>
      <form onSubmit={handleSubmit(submit)}>
        <FieldArray name='upcList' component={renderUPCList} />
        <div className='error'>{error && <strong>{error}</strong>}</div>
        <div>
          <button type='submit' disabled={invalid || submitting}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'upcListForm',     // a unique identifier for this form
  validate
})(FieldArraysForm)
