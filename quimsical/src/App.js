import Settings from './Components/Settings'
import Question from './Components/Question'
import Results from './Components/Results'
import Footer from './Components/Footer'
import { useSelector } from 'react-redux'
import './App.css';

function App() {

  const questions = useSelector((state) => state.questions)
  const questionIndex = useSelector((state) => state.index)

  let component

  if (questions.length && questionIndex + 1 <= questions.length) {
    component = <Question />
  } else if (!questions.length) {
    component = <Settings />
  } else {
    component = <Results />
  }

  return (
    <div className="App">
      <div className="app-container">
        {component}
      </div>
      <Footer />
    </div>
  );
}

export default App;

