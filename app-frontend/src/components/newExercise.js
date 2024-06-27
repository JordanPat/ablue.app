import React, { useState } from 'react';
import axios from 'axios';

const ExerciseForm = () => {
  const [description, setDescription] = useState('');
  const [modifier, setModifier] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit pushed");
    try {
      const response = await axios.post('http://localhost:5000/api/exercises/add', {
        description,
        modifier,
        exerciseName,
        tag: tags.split(',').map(tag => tag.trim())
      });

      console.log('Exercise added:', response.data);
      // Optionally, reset form fields after successful submission
      setDescription('');
      modifier('');
      setExerciseName('');
      setTags('');
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  return (
    <div>
      <h2>Add New Exercise</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Exercise Name:</label>
          <input
            type="text"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Exercise Description:</label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value) 
              console.log("changed description")} }
            required
          />
        </div>
        <div>
          <label>Exercise Modifiers:</label>
          <textarea
            value={modifier}
            onChange={(e) => setModifier(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <button type="submit" onPress={handleSubmit}>Add Exercise</button>
      </form>
    </div>
  );
};

export default ExerciseForm;
