import React, { useState } from 'react';

const CollectionSelector = () => {
  const [selectedCollection, setSelectedCollection] = useState('');
  const [formData, setFormData] = useState({
    // Define initial form data structure
    workouts: { name: '', date: '' },
    exercises: { description: '', exerciseId: '', exerciseName: '', tags: '' },
    workoutExercises: { workoutId: '', exerciseId: '', sets: '', reps: '', weight: '' },
    users: { username: '', email: '' },
    userMaxes: { userId: '', exerciseId: '', maxWeight: '' }
  });

  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value);
    // Reset form data when collection changes
    setFormData({
      workouts: { name: '', date: '' },
      exercises: { description: '', exerciseId: '', exerciseName: '', tags: '' },
      workoutExercises: { workoutId: '', exerciseId: '', sets: '', reps: '', weight: '' },
      users: { username: '', email: '' },
      userMaxes: { userId: '', exerciseId: '', maxWeight: '' }
    });
  };

  const handleInputChange = (e, collection) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [collection]: {
        ...prevState[collection],
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission based on selectedCollection
    console.log(`Form data for ${selectedCollection}:`, formData[selectedCollection]);
    // Add logic here to submit data to backend or handle locally
  };

  return (
    <div>
      <h2>Collection Selector</h2>
      <label>Select Collection:</label>
      <select value={selectedCollection} onChange={handleCollectionChange}>
        <option value="">Select Collection</option>
        <option value="workouts">Workouts</option>
        <option value="exercises">Exercises</option>
        <option value="workoutExercises">Workout Exercises</option>
        <option value="users">Users</option>
        <option value="userMaxes">User Maxes</option>
      </select>

      {selectedCollection && (
        <form onSubmit={handleSubmit}>
          {selectedCollection === 'workouts' && (
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={formData.workouts.name} onChange={(e) => handleInputChange(e, 'workouts')} />
              <label>Date:</label>
              <input type="date" name="date" value={formData.workouts.date} onChange={(e) => handleInputChange(e, 'workouts')} />
            </div>
          )}

          {selectedCollection === 'exercises' && (
            <div>
              <label>Description:</label>
              <input type="text" name="description" value={formData.exercises.description} onChange={(e) => handleInputChange(e, 'exercises')} />
              <label>Exercise ID:</label>
              <input type="text" name="exerciseId" value={formData.exercises.exerciseId} onChange={(e) => handleInputChange(e, 'exercises')} />
              <label>Exercise Name:</label>
              <input type="text" name="exerciseName" value={formData.exercises.exerciseName} onChange={(e) => handleInputChange(e, 'exercises')} />
              <label>Tags:</label>
              <input type="text" name="tags" value={formData.exercises.tags} onChange={(e) => handleInputChange(e, 'exercises')} />
            </div>
          )}

          {selectedCollection === 'workoutExercises' && (
            <div>
              <label>Workout ID:</label>
              <input type="text" name="workoutId" value={formData.workoutExercises.workoutId} onChange={(e) => handleInputChange(e, 'workoutExercises')} />
              <label>Exercise ID:</label>
              <input type="text" name="exerciseId" value={formData.workoutExercises.exerciseId} onChange={(e) => handleInputChange(e, 'workoutExercises')} />
              <label>Sets:</label>
              <input type="number" name="sets" value={formData.workoutExercises.sets} onChange={(e) => handleInputChange(e, 'workoutExercises')} />
              <label>Reps:</label>
              <input type="number" name="reps" value={formData.workoutExercises.reps} onChange={(e) => handleInputChange(e, 'workoutExercises')} />
              <label>Weight:</label>
              <input type="number" name="weight" value={formData.workoutExercises.weight} onChange={(e) => handleInputChange(e, 'workoutExercises')} />
            </div>
          )}

          {selectedCollection === 'users' && (
            <div>
              <label>Username:</label>
              <input type="text" name="username" value={formData.users.username} onChange={(e) => handleInputChange(e, 'users')} />
              <label>Email:</label>
              <input type="email" name="email" value={formData.users.email} onChange={(e) => handleInputChange(e, 'users')} />
            </div>
          )}

          {selectedCollection === 'userMaxes' && (
            <div>
              <label>User ID:</label>
              <input type="text" name="userId" value={formData.userMaxes.userId} onChange={(e) => handleInputChange(e, 'userMaxes')} />
              <label>Exercise ID:</label>
              <input type="text" name="exerciseId" value={formData.userMaxes.exerciseId} onChange={(e) => handleInputChange(e, 'userMaxes')} />
              <label>Max Weight:</label>
              <input type="number" name="maxWeight" value={formData.userMaxes.maxWeight} onChange={(e) => handleInputChange(e, 'userMaxes')} />
            </div>
          )}

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default CollectionSelector;
