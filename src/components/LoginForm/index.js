import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-cont">
        <div className="login-form-cont">
          <img
            src="https://res.cloudinary.com/dnmcjyigq/image/upload/v1711118595/Illustration_grtizn.png"
            alt="website login"
            className="login-img"
          />
          <form className="my-form" onSubmit={this.submitForm}>
            <img
              src="https://res.cloudinary.com/dnmcjyigq/image/upload/v1711118430/logo_t4ndk3.png"
              alt="website logo"
              className="website-logo"
            />
            <p className="form-title">Insta Share</p>
            <div className="input-cont">
              <label htmlFor="username" className="input-label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
                placeholder="Username"
                className="input"
              />
            </div>

            <div className="input-cont">
              <label htmlFor="password" className="input-label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Password"
                className="input"
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
