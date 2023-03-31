import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Register from '../components/Register';
import Login from '../components/Login';
import Profile from '../components/Profile';

const RootPage = () => {
  const [token, ] = useContext(UserContext);
  const [form, setForm] = useState("login");

  const changeForm = (formName) => {
    setForm(formName);
  }

  return (
    <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          {
            !token ? (
              <div className="columns">
                {form === "login" ? <Login onForm={changeForm} /> : <Register onForm={changeForm} />}
              </div>
            ) : (
              <div>
                <Profile />
              </div>
            )
          }
        </div>
        <div className="column"></div>
      </div>
  );
}

export default RootPage;