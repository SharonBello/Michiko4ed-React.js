const initialState = {
    games: [],
    game: {}
}

export function gameReducer(state = initialState, action) {
    let games


    switch (action.type) {
        case 'SET_GAME':
            games = state.games.map(game => game._id === action.game._id ? action.game : game)
            return { ...state, game: action.game, games }
        case 'SET_GAMES':
            return { ...state, games: action.games }
        case 'GET_BY_ID':
            return { ...state, game: action.game }
        case 'ADD_GAME':
            return { ...state, games: [action.game, ...state.games] }
        case 'GET_SELECTED':
            return { ...state, selectedOption: action.selectedOption }
        default:
            return state
    }
}