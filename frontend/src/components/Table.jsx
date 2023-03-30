import React, { useState, useEffect, useContext } from 'react';
import moment from "moment";
import ErrorMessage from './ErrorMessage';
import { UserContext } from '../context/UserContext';
import SkillModal from './SkillModal';

// Component that will show the skills of the current user
const Table = () => {
  const [token, ] = useContext(UserContext);
  const [skills, setSkills] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false); // Holds whether or not the user will see the Modal
  const [id, setId] = useState(null); // Needed when updating the skills

  const handleUpdate = async (id) => {
    setId(id);
    setActiveModal(true);
  }

  const handleDelete = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    };

    const response = await fetch(`/api/skills/${id}`, requestOptions);

    if(!response.ok) {
      setErrorMessage("Failed to delete skill");
    }

    getSkills();
  };

  const getSkills = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    };

    const response = await fetch("/api/skills", requestOptions);
    
    if(!response.ok) {
      setErrorMessage("Something went wrong");
    } else {
      const data = await response.json();
      setSkills(data);
      setLoaded(true);
    }
  };

  // On page load get the user's skills
  useEffect(() => {
    getSkills();
  });

  const handleModal = () => {
    setActiveModal(!activeModal);
    getSkills();
    setId(null);
  }

  return (
    <>
      <SkillModal
        active={activeModal}
        handleModal={handleModal}
        token={token}
        id={id}
        setErrorMessage={setErrorMessage}
      />

      <button className='button is-fullwidth mb-5 is-primary' onClick={() => setActiveModal(true)}>
        Add Skill
      </button>
      <ErrorMessage message={errorMessage} />
      {loaded && skills ?  (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id}>
                <td>{skill.skill_name}</td>
                <td>{skill.skill_level}</td>
                <td>{moment(skill.date_last_updated).format("MMM Do YY")}</td>
                <td>
                  <button
                    className="button mr-2 is-info is-light"
                    onClick={() => handleUpdate(skill.id)}
                  >
                    Update
                  </button>
                  <button
                    className="button mr-2 is-danger is-light"
                    onClick={() => handleDelete(skill.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p>Loading...</p>}
    </>
  );
}

export default Table;