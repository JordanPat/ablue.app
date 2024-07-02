// src/components/Exercises.js

import React, { useState } from 'react';
import axios from 'axios';

const GetExercises = (props) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExercises = async () => {
    console.log("passed url in getExercises: ", props.url);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(props.url);
      setExercises(response.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const clearExercises = () => {
    setExercises([]);
    setError(null);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={fetchExercises}>Get Exercises</button>
      <button onClick={clearExercises}>Clear</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!loading && !error && exercises.length > 0 && (
        <div>
          <h1>Exercises</h1>
          <ul>
            {exercises.map((exercise) => (
              <li key={exercise._id}>
                <strong>{exercise.exerciseName}:</strong> {exercise.description} ({exercise.tag.join(', ')})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetExercises;
