import Axios from 'axios'
import { httpService } from './http.service.js'
import { questionService } from './question.service.js'
import { socketService } from './socket.service.js'
import { utilService } from './util.service.js'

const gameChannel = new BroadcastChannel('gameChannel')

const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? '/api/question/'
        : 'http://localhost:3030/api/question/'

let axios = Axios.create({
    withCredentials: true,
})

export const gameService = {
    query,
    saveGame,
    updateGame
}

async function query(loggedUser, typeOf) {
    let games = await httpService.get('game')
    if (typeOf === 'getGames') {
        if (loggedUser) {
            games = games.filter(game => {
                return game.user.fullName === loggedUser.fullName
            })
        } else {
            games = []
        }
    }

    games = games.map(game => {
        return { ...game, question: { ...game.question } }
    })

    games = games.sort((a, b) => b.createdAt - a.createdAt)
    return games
}

async function saveGame(questionId, loggedUser) {
    try {
        let question = await httpService.get(`question/${questionId}`)
        const game =
        {
            _id: utilService.makeId(),
            createdAt: Date.now(),
            user: {
                _id: loggedUser._id,
                fullName: loggedUser.userName,
                ImgUrl: loggedUser.imgUrl
            },
            question: {
                _id: questionId,
                title: question.title,
                description: question.description,
            },
            status: "pending"
        }

        let addedGame = await httpService.post('game', game)
        return addedGame
    } catch (err) {
        console.dir('Cannot save game:', err)
        throw err
    }
}

async function updateGame(game) {
    try {
        const urlToRequest = `game/${game._id}`
        await httpService.put(urlToRequest, game)
        return game
    } catch (err) {
        console.dir('Cannot update game:', err)
        throw err
    }
}