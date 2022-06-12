import React, { Component, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitButton } from '../../common/submitButton/submitButton.component';
import { toast } from 'react-toastify'

const defaultFields = {
  username: '',
  password: ''
}
class LoginComponent extends Component {

  constructor() {
    super();
    // initial state
    this.state = {
      data: {
        ...defaultFields
      },
      error: {
        ...defaultFields
      },
      remember_me: false,
      isSubmitting: false,
    }
  }


  handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      return this.setState({
        remember_me: checked
      })
    }
    this.setState((preState) => ({
      data: {
        ...preState.data,
        [name]: value
      }
    }), () => {
      if (this.state.error[name]) {
        this.validateForm();
      }
    })
  }

  validateForm = () => {
    let unameErr;
    let passwordErr;
    let isValidForm = true;

    if (!this.state.data.username) {
      unameErr = true;
      isValidForm = false;
    }
    if (!this.state.data.password) {
      passwordErr = true;
      isValidForm = false;
    }

    this.setState({
      error: {
        username: unameErr,
        password: passwordErr
      }
    })

    return isValidForm;
  }

  handleSubmit = e => {
    e.preventDefault();
    toast.success('Login btn clicked');
    let valid = this.validateForm();
    if (!valid) return;
    this.setState({
      isSubmitting: true
    })
    // API call
    setTimeout(() => {
      this.setState({
        isSubmitting: false
      })
      toast.error('login failed with invalid username')
      // store remmember in local storage
      localStorage.setItem('remember_me', JSON.stringify(this.state.remember_me))
      this.props.navigate('/home')
    }, 1000);
  }

  // render method is mandatory and is responsibile to return single html node
  // try to keep UI logic inside render method
  render() {

    return (
      <div>
        <h2>Login</h2>
        <p>Please Login to continue</p>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label htmlFor="uname">Username</label>
          <input className="form-control" type="text" name="username" id="uname" placeholder="Username" onChange={this.handleChange} ></input>
          <p className="error">{this.state.error.username && `Username is Required*`}</p>
          <label htmlFor="pwd">Password</label>
          <input className="form-control" type="password" name="password" id="pwd" placeholder="Password" onChange={this.handleChange} />
          <p className="error">{this.state.error.password && `Password is Required*`}</p>
          <input type="checkbox" name="remember_me" onChange={this.handleChange}></input>
          <label> &nbsp;Remember Me</label>
          <hr />
          <SubmitButton
            enabledLabel="Login"
            disabledLabel="Logingin..."
            isDisabled={this.state.isSubmitting}
            isSubmitting={this.state.isSubmitting}
          ></SubmitButton>
        </form>
        <p>Don't Have An Account?</p>
        <p style={{ float: 'left' }}>Register <Link to="/register">Here</Link></p>
        <p style={{ float: 'right' }} > <Link to="/forgot_password">Forgot Password?</Link></p>
      </div >
    )
  }
}


export const Login = () => {
  let navigate = useNavigate();

  useEffect(() => {
    let remember = JSON.parse(localStorage.getItem('remember_me'));

    console.log('remember is >', typeof (remember))
    if (remember) {
      navigate('/home')
    }
  }, [])

  return (
    <LoginComponent navigate={navigate} ></LoginComponent>
  )
}

// class based componenet

// state,
// setState
// events 
// default behaviour


// life cycle of component
// init
// constructor
// render ==> view ready
// componentDidMount() // self invoked function executed once component is fully loaded

// update 
// either props change or state change we termed it as component is updated
// render
// componentDidUpdate() //self invoked once component is updated
// componentDidUpdate (1starg,2ndarg) // 1st arg for previous props
// 2nd arg for previous state

// destroy
// componentWillUnMount();