import React from 'react';

export default class AuthModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/travelPlanner/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'login';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const href = action === 'sign-up'
      ? '#login'
      : '#sign-up';
    const text = action === 'sign-up'
      ? 'Already registered? Log in'
      : 'No account? Register now';
    const headerText = action === 'sign-up'
      ? 'Create Account'
      : 'Sign In';
    const submitText = action === 'sign-up'
      ? 'Register'
      : 'Log In';
    return (
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form-header">{headerText}</h2>
        <div className="auth-input-container">
          <label htmlFor="username" className="auth-label">
            Username
          </label>
          <input className="auth-input" required autoFocus id="username" type="text" name="username" onChange={handleChange} />
        </div>
        <div className="auth-input-container">
          <label htmlFor="password" className="auth-label">
            Password
          </label>
          <input className="auth-input" required id="password" type="password" name="password" onChange={handleChange} />
        </div>
        <div className="log-in-row">
          <small>
            <a className="auth-anchor" href={href}>
              {text}
            </a>
          </small>
          <button type="submit" className="button log-in">
            <small>
              {submitText}
            </small>
          </button>
        </div>
      </form>
    );
  }
}
