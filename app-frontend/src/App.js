import logo from './logo.svg';
import './App.css';
import ExerciseForm from './components/newExercise';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>
          aBlue Workout app.
        </h3>

        <ExerciseForm />
        <br/>
        <br/>
        <div>
        <a
          className="App-link"
          href="https://acadianblue.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          llc
        </a>
        </div>
      </header>
      
    </div>
   
  );
}

export default App;
