import React, { useState, useEffect } from 'react';

// Component that will handle the "pop up" window for creating and updating the skills
const SkillModal = ({active, handleModal, token, id, setErrorMessage}) => {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState(0);

  // Helper function for getting the skill to update
  useEffect(() => {
    const getSkill = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      };

      const response = await fetch(`/api/skills/${id}`, requestOptions)

      if(!response.ok) {
        setErrorMessage("Could not get the skill");
      } else {
        const data = await response.json();
        setSkillName(data.skill_name);
        setSkillLevel(data.skill_level);
      }
    }

    if(id) {
      getSkill();
    }
  }, [id, token])

  const cleanFormData = () => {
    setSkillName("");
    setSkillLevel(0);
  }

  const handleCreateSkill = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({skill_name: skillName, skill_level: skillLevel})
    };
    const response = await fetch("/api/skills", requestOptions);

    if(!response.ok) {
      setErrorMessage("Something went wrong when creating the skill");
    } else {
      cleanFormData(); // Clean the form data
      handleModal(); // Close the modal window
    }
  }

  const handleUpdateSkill = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({skill_name: skillName, skill_level: skillLevel})
    };
    const response = await fetch(`/api/skills/${id}`, requestOptions);

    if(!response.ok) {
      setErrorMessage("Something went wrong when updating the skill");
    } else {
      cleanFormData(); // Clean the form data
      handleModal(); // Close the modal window
    }
  }

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary-light">
          <h1 className="modal-card-title">{id ? "Update Skill" : "Add Skill"}</h1>
        </header>

        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">Skill name</label>
              <div className="control">
                <input
                  type="text"
                  placeholder='Enter skill name'
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Skill level</label>
              <div className="control">
                <input
                  type="number"
                  placeholder='Enter skill your level'
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
          </form>
        </section>

        <footer className="modal-card-foot has-background-primary-light">
          {id ? (
            <button className="button is-info" onClick={handleUpdateSkill}>Update</button>
          ) : (
            <button className="button is-primary" onClick={handleCreateSkill}>Create</button>
          )}
          <button className='button' onClick={handleModal}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}

export default SkillModal;