import React, { useState, useEffect, useContext } from 'react';
import Register from './components/Register';
import Header from './components/Header';
import { UserContext } from './context/UserContext';
import Login from './components/Login';
// import Table from './components/Table';
import Profile from './components/Profile';

const App = () => {
  const [message, setMessage] = useState("");
  const [token, ] = useContext(UserContext);
  const [form, setForm] = useState("login");

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api", requestOptions);
    const data = await response.json();
    
    if (!response.ok) {
      console.log("Something messed up");
    } else {
      setMessage(data.message);
    }
  };

  const changeForm = (formName) => {
    setForm(formName);
  }

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    <>
      <Header title={ message }/>
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
                {/* <br /> */}
                {/* <Table /> */}
              </div>
            )
          }
        </div>
        <div className="column"></div>
      </div>
    </>
  );
}

export default App;
