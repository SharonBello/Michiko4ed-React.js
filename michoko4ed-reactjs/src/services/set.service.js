import Axios from 'axios'
import { httpService } from './http.service.js'
import { getActionRemoveSet, getActionAddSet } from '../store/actions/set.actions.js'
import { utilService } from './util.service.js'
// import { storageService } from './async-storage.service.js'
// import { socketService } from './socket.service.js'

const setChannel = new BroadcastChannel('setChannel')
const PAGE_SIZE = 32

const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? '/api/set/'
        : 'http://localhost:3030/api/set/'

let axios = Axios.create({
    withCredentials: true,
})

export const setService = {
    getAllSets,
    getById,
    query,
    save,
    update,
    remove,
    getNumOfPages,
    subscribe,
    unsubscribe,
}

function getAllSets() {
    query()
        .then(sets => sets)
}

function getById(setId) {
    // return storageService.get(STORAGE_KEY, setId)
    let set = httpService.get(`set/${setId}`)
    return set
}

async function query(filterBy = {}, loggedUser) {
    const { txt = '', sortBy = 'title' } = filterBy
    const url = `?txt=${txt}&sortBy=${sortBy}`
    const urlToRequest = 'set/' + url
    // let sets = await storageService.query(STORAGE_KEY)
    let sets = httpService.get(urlToRequest)
    if (loggedUser) {
        sets = sets.filter(set => {
            return set.user_id === loggedUser._id
        })
    } else {
        sets = []
    }

    sets = sets.map(set => {
        return { ...set, questions: { ...set.questions } }
    })

    sets = sets.sort((a, b) => b.createdAt - a.createdAt)
    return sets
}

async function save(set) {
    if (set._id) {
        await httpService.put(`set/${set._id}`, set)
        return set
    } else {
        let newSet = {
            _id: utilService.makeId(),
            createdAt: Date.now(),
            title: set.title,
            description: set.description,
            imgUrl: set.imgUrl || [],
            user_id: set.user_id,
            questions: [{
                id: utilService.makeId(),
                type: 'multiple',
                question: '',
                correct_answer: '',
                incorrect_answers: ['', '', ''],
            }],
            status: "inActive"
        }
        newSet = await httpService.post('set', newSet)
        setChannel.postMessage(getActionAddSet(newSet))
        return newSet
    }
}

async function update(set) {
    try {
        const urlToRequest = `set/${set._id}`
        await httpService.put(urlToRequest, set)
        return set
    } catch (err) {
        console.dir('Cannot update set:', err)
        throw err
    }
}

async function remove(setId) {
    setChannel.postMessage(getActionRemoveSet(setId))
}

async function getNumOfPages() {
    const sets = await query()
    const setsQty = sets.data.length / PAGE_SIZE
    return setsQty
    // return JSON.parse(localStorage.getItem(STORAGE_KEY)).length / PAGE_SIZE
}

function subscribe(listener) {
    setChannel.addEventListener('message', listener)
}

function unsubscribe(listener) {
    setChannel.removeEventListener('message', listener)
}
