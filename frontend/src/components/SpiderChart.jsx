import React, { useState, useContext, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';
import { UserContext } from '../context/UserContext';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// export 

const SpiderChart = ({ skills_list }) => {
  // const [token, ] = useContext(UserContext);
  const [skills, setSkills] = useState([]);
  // const [errorMessage, setErrorMessage] = useState("");
  // const [loaded, setLoaded] = useState(false);
  
  const data = {
    labels: skills_list?.map((skill) => skill.skill_name),
    datasets: [
      {
        label: 'Level of proficiency',
        data:  skills_list?.map((skill) => skill.skill_level),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // const getSkills = async () => {
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token
  //     }
  //   };

  //   const response = await fetch("/api/skills", requestOptions);
    
  //   if(!response.ok) {
  //     setErrorMessage("Something went wrong");
  //   } else {
  //     const data = await response.json();
  //     setSkills(data);
  //     setLoaded(true);
  //   }
  //   console.log(skills);
  // };

  // On page load get the user's skills
  // useEffect(() => {
  //   getSkills();
  // }, []);

  return (
    <Radar data={data} />
  );
}

export default SpiderChart;