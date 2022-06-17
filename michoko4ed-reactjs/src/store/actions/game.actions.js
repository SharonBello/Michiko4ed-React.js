import { gameService } from '../../services/game.service.js'


export function loadGames(loggedUser, typeOf) {
    
    return async dispatch => {
        try {
            const games = await gameService.query(loggedUser, typeOf)            
            const action = { type: 'SET_GAMES', games }
            dispatch(action)
        } catch (err) {
            console.error('Cannot load games:', err)
        }
    }
}


export function onSaveGame(gigId, loggedUser) {
    return async (dispatch) => {
        try {
            const game = await gameService.saveGame(gigId, loggedUser)            
            const action = { type: 'SET_GAME', game }
            dispatch(action)
            return game
        } catch (err) {
            console.log('Cannot save game:', err)
        }
    }
}


export function onUpdateGame(game) {
    return async (dispatch) => {
        try {
            await gameService.updateGame(game)
            const action = { type: 'SET_GAME', game }
            dispatch(action)
        } catch (err) {
            console.log('Cannot update game', err)
        }
    }
}


export function addGame(game,loggedUser){
    return async (dispatch) => {
        try {
            const action = { type: 'ADD_GAME', game }
            dispatch(action)
        } catch (err) {
            console.log('Cannot update game', err)
        }
    }
}