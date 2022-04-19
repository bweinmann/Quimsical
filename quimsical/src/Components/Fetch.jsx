import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

export default function Fetch(props) {

    //construct settings for the API query
    const difficulty = useSelector(state => state.settings.question_difficulty)
    const category = useSelector(state => state.settings.question_category)
    const amount = useSelector(state => state.settings.question_amount)
    const type = useSelector(state => state.settings.question_type)
    const indexOf = useSelector(state => state.index)

    const dispatch = useDispatch();

    const setLoading = (value) => {
        dispatch({
            type: 'CHANGE_LOADING',
            loading: value,
        })
    }

    const setQuestions = value => {
        dispatch({
            type:'SET_QUESTIONS',
            questions: value
        })
    }

    const handleRequest = async () => {

        let apiURL = `https://opentdb.com/api.php?amount=${amount}`;

        if (category.length) {
            apiURL = apiURL.concat(`&category=${category}`)
        }
        if (difficulty.length) {
            apiURL = apiURL.concat(`&difficulty=${difficulty}`)
        }
        if (type.length) {
            apiURL = apiURL.concat(`&type=${type}`)
        }

        setLoading(true)

        await fetch(apiURL)
        .then((res) => res.json())
        .then((response) => {
            setQuestions(response.results)
            setLoading(false)
        })

        if (indexOf > 0) {
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
