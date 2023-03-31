import React, { useState, useEffect, useContext } from 'react';
// import Register from './components/Register';
import Header from './components/Header';
// import { UserContext } from './context/UserContext';
// import Login from './components/Login';
// import Profile from './components/Profile';
import { Route, Routes } from 'react-router-dom';
import RootPage from './pages/RootPage';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  const [message, setMessage] = useState("");
  // const [token, ] = useContext(UserContext);
  // const [form, setForm] = useState("login");

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

  // const changeForm = (formName) => {
  //   setForm(formName);
  // }

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    <>
      <Header title={message}/>
      

      <Routes>
        <Route path='/' element={<RootPage />}/>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </>
  );
}

export default App;
