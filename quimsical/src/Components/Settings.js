import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Fetch from './Fetch'

 function Settings() {
    //storing API data
    const [settings, setSettings] = useState(null);
    //replaced with selector for redux actions
    const loading = useSelector(state => state.settings.loading);
    const questionCategory = useSelector(state => state.settings.question_category);
    const questionDifficulty = useSelector(state => state.settings.question_difficulty);
    const questionType = useSelector(state => state.settings.question_type)
    const questionAmount = useSelector(state => state.settings.question_amount);

    //updates state
    const dispatch = useDispatch();

    useEffect(() => {
        const apiURL = `https://opentdb.com/api_category.php`;

        const handleLoading = (value) => {
            dispatch({
                type: 'CHANGE_LOADING',
                LOADING: value,
            })
        }

        handleLoading(true)

        fetch(apiURL)
            .then((res) => res.json())
            .then((response) => {
                handleLoading(false);
                setSettings(response.trivia_categories);
                // console.log(response.trivia_categories);
            });
    }, [setSettings, dispatch]);

    //when the category is chosen, event occurs
    //type of action is defined within the payload object due to switch function interpretation
    const handleCategory = (event) => {
        dispatch({
            type: 'CHANGE_CATEGORY',
            question_category: event.target.value,
          })
        }
    
    const handleType = (event) => {
        dispatch({
            type: 'CHANGE_TYPE',
            question_type: event.target.value,
          })
        }
    
    const handleDifficulty = (event) => {
        dispatch({
            type: 'CHANGE_DIFFICULTY',
            question_difficulty: event.target.value,
          })
        }
    
    const handleAmount = (event) => {
        dispatch({
            type: 'CHANGE_AMOUNT',
            question_amount: event.target.value,
          })
        }
    
     if(!loading) {  
        return (
        <div>
            <h1>Quimsical</h1>
            <div>
                <h2>Choose a Category:</h2>
                    <select value={questionCategory} onChange={handleCategory}>
                        <option>All</option>
                        {settings && settings.map((setting) => (
                            <option value={setting.id} key={setting.id}>
                                {setting.name}
                            </option>
                    ))}
                </select>
            </div>
            <div>
                <h2>Choose a Difficulty:</h2>
                    <select value={questionDifficulty} onChange={handleDifficulty}>
                        <option value="" key="difficulty-0">All</option>
                        <option value="easy" key="difficulty-1">Easy</option>
                        <option value="medium" key="difficulty-2">Medium</option>
                        <option value="hard" key="difficulty-3">Hard</option>
                    </select>
            </div>
            <div>
                <h2>Select Question Type:</h2>
                    <select value={questionType} onChange={handleType}>
                        <option value="" key="type-0">All</option>
                        <option value="multiple" key="type-1">Multiple Choice</option>
                        <option value="boolean" key="type-2">True/False</option>
                    </select>
            </div>
			<div>
                <h2>Number of Questions:</h2>
                    <input value={questionAmount} onChange={handleAmount} />
            </div>
            <Fetch text="Begin!" />
        </div>      
        );
     } 
        <p>Loading...</p>
}              

export default Settings