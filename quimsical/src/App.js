import Settings from './Components/Settings'
import Question from './Components/Question'
import Results from './Components/Results'
import { useSelector } from 'react-redux'
import './App.css';

function App() {

  const questions = useSelector((state) => state.questions)
  const index = useSelector((state) => state.index)

  let component

  if (questions.length && index + 1 <= questions.length) {
    component = <Question />
  } else if (!questions.length) {
    component = <Settings />
  } else {
    component = <Results />
  }

  return (
    <div className="App">
      <div className="container">
        {component}
      </div>
    </div>
  );
}

export default App;

