const initialState = {   
    set: null,
    filterBy: {
        txt: '',
        sortBy: 'title'
    },
    sets: []
}

export function setReducer(state = initialState, action) {
    let sets

    switch (action.type) {
        case 'SET_SET':
            return { ...state, searchSet: action.sets }
        case 'SET_SETS':
            return { ...state, sets: action.sets }
        case 'ADD_SET':
            sets = [action.sets, ...state.sets]
            return { ...state, sets }
        case 'REMOVE_SET':
            sets = state.sets.filter(set => set._id !== action.setId)
            return { ...state, sets }
        case 'UPDATE_SET':
            sets = state.sets.map(currset =>
                (currset._id === action.set._id) ? action.set : currset)
            return { ...state, sets }
        case 'SET_FILTERBY':
            return { ...state, filterBy: action.filterBy }
        case 'GET_BY_ID':
            return { ...state, set: action.set }
        case 'GET_SELECTED':
            return { ...state, selectedOption: action.selectedOption }
        default:
            return state
    }
}