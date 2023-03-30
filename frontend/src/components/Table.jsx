import React, { useState, useContext } from 'react';
import moment from "moment";
import ErrorMessage from './ErrorMessage';
import { UserContext } from '../context/UserContext';
import SkillModal from './SkillModal';

// Component that will show the skills of the current user
const Table = ({ skillsFunction, skillsList, loaded }) => {
  const [token, ] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
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

    await skillsFunction();
  };

  const handleModal = async () => {
    setActiveModal(!activeModal);
    await skillsFunction();
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
      {loaded && skillsList ?  (
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
            {skillsList.map((skill) => (
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