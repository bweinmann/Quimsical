import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

export default function Fetch(props) {

    //construct settings for the API query
    const questionDifficulty = useSelector(state => state.settings.question_difficulty)
    const questionCategory = useSelector(state => state.settings.question_category)
    const questionAmount = useSelector(state => state.settings.question_amount)
    const questionType = useSelector(state => state.settings.question_type)
    const questionIndex = useSelector(state => state.index)

    const dispatch = useDispatch();

    const setLoading = (value) => {
        dispatch({
            type: 'CHANGE_LOADING',
            loading: value,
        })
    }

    const setQuestions = (value) => {
        dispatch({
            type:'SET_QUESTIONS',
            questions: value,
        })
    }

    const handleRequest = async () => {

        let apiURL = `https://opentdb.com/api.php?amount=${questionAmount}`;

        if (questionCategory.length) {
            apiURL = apiURL.concat(`&category=${questionCategory}`)
        }
        if (questionDifficulty.length) {
            apiURL = apiURL.concat(`&difficulty=${questionDifficulty}`)
        }
        if (questionType.length) {
            apiURL = apiURL.concat(`&type=${questionType}`)
        }
        console.log(apiURL.concat(`&category=${questionCategory}`));
        setLoading(true)

        await fetch(apiURL)
        .then((res) => res.json())
        .then((response) => {
            setQuestions(response.results)
            setLoading(false)
        })

        if (questionIndex > 0) {
            dispatch ({
                type: 'SET_INDEX',
                index: 0,
            })

            dispatch ({
                type: 'SET_SCORE',
                score: 0,
            })
        }
    }
  return (
    <button onClick={handleRequest}>{props.text}</button>
  )
}
