import Axios from 'axios'
import { httpService } from './http.service.js'
import { getActionRemoveQuestion, getActionAddQuestion } from '../store/actions/question.actions.js'

import { utilService } from './util.service.js'
import { setService } from './set.service.js'

const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? '/api/question/'
        : 'http://localhost:3030/api/set/'

let axios = Axios.create({
    withCredentials: true,
})

const STORAGE_KEY = 'question'
const questionChannel = new BroadcastChannel('questionChannel')

export const questionService = {
    subscribe,
    unsubscribe,
    getQuestionById,
    removeQuestion,
    saveQuestion,
    getAllQuestions
}

function getAllQuestions(setId) {
    let allQuestions = setService.getById(setId).questions
    return allQuestions
}

function getQuestionById(questionId) {
    // return storageService.get(STORAGE_KEY, questionId)
    let question = httpService.get(`set/setId/${questionId}`)
    return question
}

async function removeQuestion(questionId) {
    questionChannel.postMessage(getActionRemoveQuestion(questionId))
}

async function saveQuestion(set, question) {
    if (question._id) {
        await httpService.put(`set/setId/${question._id}`, question)
        return question
    } else {
        let newQuestion = {
            "_id": set.questions._id,
            "type": set.questions.type,
            "question": set.questions.question || '',
            "correct_answer": set.questions.correct_answer,
            "incorrect_answers": [set.questions.incorrect_answer],
        }
        newQuestion = await httpService.post('question', newQuestion)
        questionChannel.postMessage(getActionAddQuestion(newQuestion))
        return newQuestion
    }

}

function subscribe(listener) {
    questionChannel.addEventListener('message', listener)
}

function unsubscribe(listener) {
    questionChannel.removeEventListener('message', listener)
}
