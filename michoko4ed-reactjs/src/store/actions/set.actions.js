import { setService } from "../../services/set.service.js"
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'

export function getActionRemoveSet(setId) {
    return {
        type: 'REMOVE_Set',
        setId
    }
}

export function getActionAddSet(set) {
    return {
        type: 'ADD_SET',
        set
    }
}

export function getActionUpdateSet(set) {
    return {
        type: 'UPDATE_SET',
        set
    }
}
let subscriber

export function loadSets() {
    return async (dispatch, getState) => {
        try {
            const filterBy = getState().setModule.filterBy
            const sets = await setService.query(filterBy)
            const action = { type: 'SET_SETS', sets }
            dispatch(action)
        } catch (err) {
            console.error('Error:', err)
        }
        if (subscriber) setService.unsubscribe(subscriber)
        subscriber = (ev) => {
            dispatch(ev.data)
        }
        setService.subscribe(subscriber)
    }
}

export function getById(setId) {
    return async dispatch => {
        try {
            const set = await setService.getById(setId)
            dispatch({
                type: 'GET_BY_ID',
                set
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
            filterBy
        })
    }
}

export function removeSet(setId) {
    return async dispatch => {
        try {
            await setService.remove(setId)
            dispatch(getActionRemoveSet(setId))
            showSuccessMsg('Question removed Successfully!')
        } catch (err) {
            console.error('Error:', err)
            showErrorMsg(err.response.data)
            // showErrorMsg('set was not removed')
        }
        if (subscriber) setService.unsubscribe(subscriber)
        subscriber = (ev) => {
            dispatch(ev.data)
        }
        setService.subscribe(subscriber)
    }
}

export function updateSet(set) {
    return async dispatch => {
        try {
            const savedSet = await setService.update(set)
            dispatch(getActionUpdateSet(set))
            // showSuccessMsg('Set saved Successfully!')
        } catch (err) {
            console.error('Error:', err)
            // showErrorMsg('Set was not saved')
            // showErrorMsg(err.response.data)
        }
        if (subscriber) setService.unsubscribe(subscriber)
        subscriber = (ev) => {
            dispatch(ev.data)
        }
        setService.subscribe(subscriber)
    }
}

export function saveSet(set) {
    return async dispatch => {
        try {
            const savedSet = await setService.save(set)
            dispatch(getActionAddSet(savedSet))
            // showSuccessMsg('Set saved Successfully!')
        } catch (err) {
            console.error('Error:', err)
            // showErrorMsg(err.response.data)
        }
        if (subscriber) setService.unsubscribe(subscriber)
        subscriber = (ev) => {
            dispatch(ev.data)
        }
        setService.subscribe(subscriber)
    }
}

export function addSet(set) {
    return async dispatch => {
        try {
            const savedSet = await setService.save(set)
            dispatch(getActionAddSet(set))
            showSuccessMsg('Set added Successfully!')
        } catch (err) {
            console.error('Error:', err)
            // showErrorMsg('Set was not added')
            showErrorMsg(err.response.data)
        }
        if (subscriber) setService.unsubscribe(subscriber)
        subscriber = (ev) => {
            console.log('Got notified', ev.data)
            dispatch(ev.data)
        }
        setService.subscribe(subscriber)
    }
}
