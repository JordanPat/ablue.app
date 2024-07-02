import React from 'react';
import CollectionSelector from '../../components/collectionSelector';
import GetExercises from '../../components/getExercises';

const exercise_url = process.env.REACT_APP_BACKEND_URL+"/api/exercises";

const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <br/>
        <GetExercises url={exercise_url}/>
        <br/>
        <CollectionSelector/>
        <br/>
    </div>
  );
};

export default Home;
