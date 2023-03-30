import React, { useState, useContext } from 'react';
import ErrorMessage from './ErrorMessage';
import { UserContext } from '../context/UserContext';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: JSON.stringify(`grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`)
    };

    const response = await fetch("/api/token", requestOptions);
    const data = await response.json();

    if(!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  }

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className='title has-text-centered'>Login</h1>
        <div className='field'>
          <label className='label'>Email Address</label>
          <div className='control'>
            <input 
              type='email'
              placeholder='Enter email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
        </div>

        <div className='field'>
          <label className='label'>Password</label>
          <div className='control'>
            <input 
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>

        <ErrorMessage message={errorMessage}/>

        <br />
        <div className="columns ">
          <div className="column m-5 ml-6 is-half">
            <button className="button ml-6 is-primary" type="submit">
              Login
            </button>
          </div>
          <div className="column m-5 is-half">
            <button
              className="button mr-6 is-primary is-light"
              onClick={() => props.onForm('register')}>
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;