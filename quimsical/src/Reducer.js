const initState = {
    settings: {
        loading: false,
        question_category: ``,
        question_difficulty: ``,
        question_type: ``,
        question_amount: 50,
    },
    questions: [],
    index: 0,
    score: 0,
}

export default function Reducer (state = initState, action) {
    switch (action.type) {
            case "CHANGE_LOADING":
                return {
                    ...state, 
                    settings: {
                        ...state.settings,
                        loading: action.loading
                  },
                }
            case "CHANGE_CATEGORY":
                return {
                  ...state,
                  settings: {
                    ...state.settings,
                    question_category: action.question_category
                  }
                }
              case "CHANGE_DIFFICULTY":
                return {
                  ...state,
                  settings: {
                    ...state.settings,
                    question_difficulty: action.question_difficulty
                  }
                }
              case "CHANGE_TYPE":
                return {
                  ...state,
                  settings: {
                    ...state.settings,
                    question_type: action.question_type
                  }
                }
              
              case "CHANGE_AMOUNT":
                return {
                  ...state,
                  settings: {
                    ...state.settings,
                    question_number: action.question_amount
                  }
                }

                case 'SET_QUESTIONS':
                    return {
                        ...state,
                        questions: action.questions,
                    }

                case 'SET_INDEX':
                    return {
                        ...state,
                        questions: action.index,
                    }
                case 'SET_SCORE':
                    return {
                        ...state,
                        questions: action.score,
                    }

              default:
                return state
        }
    }