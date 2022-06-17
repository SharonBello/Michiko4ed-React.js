import Axios from 'axios'
import { httpService } from './http.service.js'
import { gigService } from './gig.service.js'
import { socketService } from './socket.service.js'

const gameChannel = new BroadcastChannel('gameChannel')


const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? '/api/gig/'
        : 'http://localhost:3030/api/gig/'

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
    let gigs = await gigService.query();
    if (typeOf === 'getBuys') {
        if (loggedUser.isSeller) {
            games = games.filter(game => {
                return game.buyer.fullName === loggedUser.userName
            })
        } else {
            games = games.filter(game => game.buyer.fullName === loggedUser.userName)
        }
    } else {
        if (loggedUser.isSeller) {
            games = games.filter(game => {
                return game.seller.fullName === loggedUser.userName
            })
        } else {
            games = []
        }
    }

    games = games.map(game => {
        return { ...game, gig: { ...game.gig, imgUrl: gigs.find(gig => gig._id === game.gig._id)?.imgUrl[0] } }
    })

    games = games.sort((a, b) => b.createdAt - a.createdAt)
    return games
}

async function saveGame(gigId, loggedUser) {
    try {
        let gig = await httpService.get(`gig/${gigId}`)
        const game =
        {
            createdAt: Date.now(),
            deliveryDate: Date.now() + (gig.daysToMake * 86400000),
            buyer: {
                _id: loggedUser._id,
                fullName: loggedUser.userName,
                ImgUrl: loggedUser.imgUrl
            },
            seller: {
                _id: gig.owner._id,
                fullName: gig.owner.fullName,
                imgUrl: gig.owner.imgUrl
            },
            gig: {
                _id: gigId,
                description: gig.title,
                price: gig.price,
                category: gig.category
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