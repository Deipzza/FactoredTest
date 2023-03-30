import React from 'react';
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

const SpiderChart = ({ skillsList }) => {
  const data = {
    labels: skillsList?.map((skill) => skill.skill_name),
    datasets: [
      {
        label: 'Level of proficiency',
        data:  skillsList?.map((skill) => skill.skill_level),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {data.labels?.length === 0 ? (
        <p>Here you will see a Spider type chart with your skills. Try adding some!</p>
      ) : (
        <Radar data={data} />
      )}
    </>
  );
}

export default SpiderChart;