import { questionService } from "../../services/question.service.js"
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'

export function getActionRemoveQuestion(questionId) {
    return {
        type: 'REMOVE_QUESTION',
        questionId
    }
}

export function getActionAddQuestion(question) {
    return {
        type: 'ADD_QUESTION',
        question
    }
}

export function getActionUpdateQuestion(question) {
    return {
        type: 'UPDATE_QUESTION',
        question
    }
}

var subscriber

export function searchQuestionByName() {
    return async dispatch => {
        try {
            const questions = await questionService.getQuestionByName()
            dispatch({
                type: 'SET_QUESTION_NAME',
                questions
            })
        } catch (err) {
            console.error('Error:', err)
        }
    }
}

export function loadQuestions() {
    return async (dispatch, getState) => {
        try {
            const filterBy = getState().questionModule.filterBy
            const questions = await questionService.query(filterBy)
            const action = { type: 'SET_QUESTIONS', questions }
            dispatch(action)
        } catch (err) {
            console.error('Error:', err)
        }
        if (subscriber) questionService.unsubscribe(subscriber)
        subscriber = (ev) => {
            dispatch(ev.data)
        }
        questionService.subscribe(subscriber)
    }
}

export function getById(questionId) {
    return async dispatch => {
        try {
            const question = await questionService.getById(questionId)
            dispatch({
                type: 'GET_BY_ID',
                question
            })
        } catch (err) {
            console.error('Error:', err)
        }
    }
}

export function setFilter(filterBy) {
    return (dispatch) => {
        return dispatch({
            type: 'SET_FILTERBY',
            filterBy,
        })
    }
}

export function removeQuestion(questionId) {
    return async dispatch => {
        try {
            await questionService.remove(questionId)
            dispatch(getActionRemoveQuestion(questionId))
            showSuccessMsg('Question removed Successfully!')
        } catch (err) {
            console.error('Error:', err)
            showErrorMsg(err.response.data)
            // showErrorMsg('Question was not removed')
        }
        if (subscriber) questionService.unsubscribe(subscriber)
        subscriber = (ev) => {
            dispatch(ev.data)
        }
        questionService.subscribe(subscriber)
    }
}

export function updateQuestion(question) {
    return async dispatch => {
        try {
            const savedQuestion = await questionService.save(question)

            dispatch(getActionUpdateQuestion(question))
            // showSuccessMsg('Question saved Successfully!')
        } catch (err) {
            console.error('Error:', err)
            // showErrorMsg('Question was not saved')
            // showErrorMsg(err.response.data)
        }

        if (subscriber) questionService.unsubscribe(subscriber)
        subscriber = (ev) => {
            dispatch(ev.data)
        }
        questionService.subscribe(subscriber)
    }

}

export function saveQuestion(question) {
    return async dispatch => {
        try {
            const savedQuestion = await questionService.save(question)
            dispatch(getActionAddQuestion(savedQuestion))
            // showSuccessMsg('Question saved Successfully!')
        } catch (err) {
            console.error('Error:', err)
            // showErrorMsg(err.response.data)
        }
        if (subscriber) questionService.unsubscribe(subscriber)
        subscriber = (ev) => {
            dispatch(ev.data)
        }
        questionService.subscribe(subscriber)
    }
}

export function addQuestion(question) {
    return async dispatch => {
        try {
            const savedQuestion = await questionService.save(question)
            dispatch(getActionAddQuestion(question))
            showSuccessMsg('Question added Successfully!')
        } catch (err) {
            console.error('Error:', err)
            // showErrorMsg('Question was not added')
            showErrorMsg(err.response.data)
        }
        if (subscriber) questionService.unsubscribe(subscriber)
        subscriber = (ev) => {
            console.log('Got notified', ev.data)
            dispatch(ev.data)
        }
        questionService.subscribe(subscriber)
    }
}
