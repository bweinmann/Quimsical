import React from 'react'
import { useState, useEffect, } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const decoded = function (html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export default function Question() {

  //retrieve data from store
  const [questions, setQuestions] = useState([])
  const [settings, setSettings] = useState([])
  const [answerSelected, setAnswerSelected] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  
  const score = useSelector((state) => state.score)
  const encoded = useSelector((state) => state.questions)

  useEffect(() => {
  const decodedQuestions = encoded.map(q => {
    return {
      ...q,
      question: decoded(q.question),
      correct_answer: decoded(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(a => decoded(a))
    }
  })
  setQuestions(decodedQuestions)
  }, [encoded])

  const questionIndex = useSelector((state) => state.index)
  const dispatch = useDispatch()

  const question = questions[questionIndex]
  const answer = question && question.correct_answer

  const getNum = (max) => {
    return Math.floor(Math.random()*Math.floor(max));
  }

  //returns right and wrong answers together in a random position
  useEffect(() => {
    if (!question) {
      return;
    }
    let answers = [...question.incorrect_answers]
    answers.splice(getNum(question.incorrect_answers.length), 0, question.correct_answer)
    setSettings(answers)
    }, [question])

    const handleSelection = (event) => {
      setAnswerSelected(true)
      setSelectedAnswer(event.target.textContent)
      
      if (event.target.textContent === answer) {
        dispatch({
          type: 'SET_SCORE',
          score: score + 1,
        })
      }
      if (questionIndex + 1 <= questions.length) {
        setTimeout(() => {
          setAnswerSelected(false)
          setSelectedAnswer(null)
          dispatch({
            type: 'SET_INDEX',
            index: questionIndex + 1,
          })
        }, 2500)
      }
    }

    const getClass = setting => {
      if (!answerSelected) {
        return ``;
      }
  
      if (setting === answer) {
        return `correct`
      }
  
      if (setting === selectedAnswer) {
        return `selected`
      }
    }
  
    if (!question) {
      return <div>Loading</div>
    }
  
      return (
      <div>
        <p>Question {questionIndex + 1}</p>
        <h3>{question.question}</h3>
        <ul>
          {settings.map((setting, i) => (
            <li key={i} onClick={handleSelection} className={getClass(setting)}>
              {setting}
            </li>
          ))}
        </ul>
        <div>
          Score: {score} / {questions.length}
        </div>
      </div>
  )
}

