import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
// import SpiderChart from './SpiderChart';

const Profile = () => {
  const [token, ] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  const profileUpdater = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    }

    const response = await fetch("/api/users/me", requestOptions);
    const data = await response.json();

    if(!response.ok) {
      console.log("Could not load the profile");
    } else {
      setName(data.name);
      setEmail(data.email);
      setPosition(data.position);
    }
  }

  useEffect(() => {
    profileUpdater();
  }, []);

  return (
    <div>
      <div className="column">
        <h1 className="title">Profile</h1>
        <div className="box">
          <div className='has-text-centered'>
            <figure className="image is-128x128 is-inline-block">
              <img
                className="is-rounded"
                src={`https://api.multiavatar.com/${email.split('@')[0]}%20${email.split('@')[1]}.svg`}
                alt="avatar"
              />
            </figure>

            <h2 className="title">{name}</h2>
          </div>

          <div>
            <ul className="mt-6 is-size-4 has-text-centered">
              <li>Email: {email}</li>
              <li>Company position: {position}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="column">
        <h1 className="title">Skills</h1>
        <div className="box">
          {/* <SpiderChart /> */}
        </div>
      </div>
    </div>
  );
}

export default Profile;