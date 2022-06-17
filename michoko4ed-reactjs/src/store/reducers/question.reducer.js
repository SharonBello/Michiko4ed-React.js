const initialState = {   
    question: null,
    filterBy: {
        txt: '',
        sortBy: 'title'
    },
    questions: []
}

export function questionsReducer(state = initialState, action) {
    let questions

    switch (action.type) {
        case 'SET_QUESTION_':
            return { ...state, searchJob: action.jobs }
        case 'SET_QUESTIONS':
            return { ...state, questions: action.questions }
        case 'ADD_QUESTION':
            questions = [action.question, ...state.questions]
            return { ...state, questions }
        case 'REMOVE_QUESTION':
            questions = state.questions.filter(question => question._id !== action.questionId)
            return { ...state, questions }
        case 'UPDATE_QUESTION':
            questions = state.questions.map(currquestion =>
                (currquestion._id === action.question._id) ? action.question : currquestion)
            return { ...state, questions }
        case 'SET_FILTERBY':
            return { ...state, filterBy: action.filterBy }
        case 'GET_BY_ID':
            return { ...state, question: action.question }
        case 'GET_SELECTED':
            return { ...state, selectedOption: action.selectedOption }
        default:
            return state
    }
}