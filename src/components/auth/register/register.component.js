
import React, { useState, useEffect } from 'react';
import { SubmitButton } from './../../common/submitButton/submitButton.component'
import { Link } from 'react-router-dom'
import { notify } from './../../../utils/notify'

const defaultForm = {
  name: '',
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  phoneNumber: '',
  dob: '',
  isMarried: '',
  tempAddr: '',
  permanentAddr: '',
  gender: '',
}

const defaultErrorFields = {
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  phoneNumber: '',
}

export const Register = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFields, setFormFields] = useState({
    ...defaultForm
  })
  const [errorFields, setErrorFields] = useState({
    ...defaultErrorFields
  })
  const [currentFormField, setCurrentFormField] = useState(null);
  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    validateForm(currentFormField)

  }, [formFields])

  const validateForm = fieldName => {
    let errMsg;
    switch (fieldName) {
      case 'username':
        errMsg = formFields[fieldName]
          ? formFields.username.length > 6
            ? ''
            : 'username must be 6 characters long'
          : 'required field*';
        break;

      case 'password':
        errMsg = formFields['confirmPassword']
          ? formFields['confirmPassword'] === formFields[fieldName]
            ? ''
            : 'password didnot match'
          : formFields[fieldName]
            ? formFields[fieldName].length > 8
              ? ''
              : 'weak password'
            : 'required field*';
        break;
      case 'confirmPassword':
        errMsg = formFields['password']
          ? formFields['password'] === formFields[fieldName]
            ? ''
            : 'password didnot match'
          : formFields[fieldName]
            ? formFields[fieldName].length > 8
              ? ''
              : 'password must be 8 characters long'
            : 'required field'
        break;
      case 'email':
        errMsg = formFields[fieldName]
          ? formFields[fieldName].includes('@') && formFields[fieldName].includes('.com')
            ? ''
            : 'invalid email'
          : 'required field'
        break;
      default:
        break;
    }


    // check for errors
    const customErrObj = { ...errorFields };
    if (!errMsg) {
      if (customErrObj[fieldName]) {
        delete customErrObj[fieldName]
      }
    }
    let prevErrors = Object.values(customErrObj).filter(err => err);

    if (errMsg) {
      prevErrors.push(errMsg);
    }

    setIsValidForm(prevErrors.length === 0);
    // state update
    setErrorFields({
      ...errorFields,
      [fieldName]: errMsg
    })

    // TODO 
    // remove this logic of checking isValidForm


  }

  const submit = (e) => {
    e.preventDefault();
    notify.showInfo('registration in progres')
    setIsSubmitting(true)
    console.log('formFields >>', formFields)
    // API call
    setTimeout(() => {
      notify.showWarning('registration failed')
      setIsSubmitting(false)
    }, 3000)
  }

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      value = checked;
    }
    setCurrentFormField(name);

    // preserve existing formfields data
    setFormFields({
      ...formFields,
      [name]: value
    })
  }

  return (
    <div>
      <h2>Register</h2>
      <p>Please register to start using our app</p>
      <form className="form-group" onSubmit={submit}>
        <label>Name</label>
        <input type="text" className="form-control" name="name" placeholder="Name" onChange={handleChange}></input>
        <label>Username</label>
        <input type="text" className="form-control" name="username" placeholder="Username" onChange={handleChange}></input>
        <p className="error">{errorFields.username}</p>
        <label>Password</label>
        <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange}></input>
        <p className="error">{errorFields.password}</p>

        <label>Confirm Password</label>
        <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange}></input>
        <p className="error">{errorFields.confirmPassword}</p>

        <label>Email</label>
        <input type="text" className="form-control" name="email" placeholder="Email" onChange={handleChange}></input>
        <p className="error">{errorFields.email}</p>

        <label>Phone Number</label>
        <input type="number" className="form-control" name="phoneNumber" onChange={handleChange}></input>
        <label>D.O.B</label>
        <input type="date" className="form-control" name="dob" onChange={handleChange}></input>
        <label>Gender</label>
        <input type="text" className="form-control" name="gender" placeholder="Gender" onChange={handleChange}></input>
        <label>Temporary Address</label>
        <input type="text" className="form-control" name="tempAddr" placeholder="Temporary Address" onChange={handleChange}></input>
        <label>Permanent Address</label>
        <input type="text" className="form-control" name="permanentAddr" placeholder="Permanent Address" onChange={handleChange}></input>
        <input type="checkbox" name="isMarried" onChange={handleChange}></input>
        <label> &nbsp;Is Married</label>
        <hr />
        <SubmitButton
          isDisabled={!isValidForm}
          isSubmitting={isSubmitting}
        ></SubmitButton>
      </form>
      <p>Back to <Link to="/">Login</Link></p>
    </div>
  )
}


// hooks

// functions that will enhance fuunctional components

// basic hooks
// stateHooks, EffectHooks, contextHooks

// additioanl hooks
// useRef,
// UseCallback,
//  useMemo,
//  useReducer,
//   useImperativeHandle
// useLayoutEffect
// useDebugValue


