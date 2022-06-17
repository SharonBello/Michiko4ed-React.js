import Axios from 'axios'
import { httpService } from './http.service.js'
import { getActionRemoveQuestion, getActionAddQuestion, getActionUpdateQuestion } from '../store/actions/question.actions.js'
import { utilService } from './util.service.js'

const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? '/api/question/'
        : 'http://localhost:3030/api/question/'

let axios = Axios.create({
    withCredentials: true,
})

const STORAGE_KEY = 'question'
const PAGE_SIZE = 32
const questionChannel = new BroadcastChannel('questionChannel')

export const questionService = {
    query,
    subscribe,
    unsubscribe,
    getById,
    saveQuestionRating,
    remove,
    save,
    getNumOfPages,
    getAllQuestions
}

function getAllQuestions() {
    query()
        .then(questions => questions)
}

function getById(questionId) {
    // return storageService.get(STORAGE_KEY, questionId)
    let question = httpService.get(`question/${questionId}`)
    return question
}

async function query(filterBy = {}) {
    const { txt = '', sortBy = 'title' } = filterBy
    const url = `?txt=${txt}&sortBy=${sortBy}`
    const urlToRequest = 'question/' + url
    // let questions = await storageService.query(STORAGE_KEY)
    let questions = httpService.get(urlToRequest)
    return questions
}

async function remove(questionId) {
    questionChannel.postMessage(getActionRemoveQuestion(questionId))

}

async function save(question) {
    if (question._id) {
        await httpService.put(`question/${question._id}`, question)
        return question
    } else {
        let newQuestion = {
            "questionId": utilService.makeId(),
            "type": question.questions.type,
            "content": question.questions.question || "",
            "correct_answer": question.questions.correct_answer,
            "incorrect_answers": [question.questions.incorrect_answer],
            "userId": question.user_id,
            "imgUrl": question.imgUrl || [],
            "gameId": question.game_id,
        }

        newQuestion = await httpService.post('question', newQuestion)
        questionChannel.postMessage(getActionAddQuestion(newQuestion))
        return newQuestion
    }

}

async function getNumOfPages() {
    const questions = await query()
    const questionsQty = questions.data.length / PAGE_SIZE
    return questionsQty
    // return JSON.parse(localStorage.getItem(STORAGE_KEY)).length / PAGE_SIZE
}

function subscribe(listener) {
    questionChannel.addEventListener('message', listener)
}

function unsubscribe(listener) {
    questionChannel.removeEventListener('message', listener)
}

async function saveQuestionRating(question) {
    // const savedQuestion = await axios.put(BASE_URL + question._id, question)
}