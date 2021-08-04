import {createSelector} from "reselect";
import {IStore, IAction} from './interfaces'

import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import axios from 'axios'
import {ADD_NEW_PROJECT, IProject, projectListSelector, REMOVE_PROJECT} from "./project";
import {deleteItemFromList} from "../utils";


export const moduleName: string = 'task'

export const GET_TASK_LIST = `${moduleName}/GET_TASK_LIST`
export const ADD_NEW_TASK = `${moduleName}/ADD_NEW_TASK`
export const REMOVE_TASK = `${moduleName}/REMOVE_TASK`
export const UPDATE_TASK = `${moduleName}/UPDATE_TASK`
export const SET_LOADER = `${moduleName}/SET_LOADER`
export const CATCH_ERROR = `${moduleName}/CATCH_ERROR`


export interface ITask {
    readonly id?: number,
    name: string,
    description: string,
    status: string,
    type: string,
    readonly project_id: number,
}

export interface IReducerRecord {
    taskList: ITask[],
    error: string | null,
    isLoader: boolean
}

export const reducerRecord: IReducerRecord = {
    taskList: [],
    error: null,
    isLoader: false
}


export default function reducer(state = reducerRecord, action: IAction) {
    const {type, payload} = action

    switch (type) {
        case GET_TASK_LIST:
        case ADD_NEW_TASK:
        case REMOVE_TASK:
        case UPDATE_TASK:
            return Object.assign({}, state, {taskList: payload})
        case SET_LOADER:
            return Object.assign({}, state, {isLoader: payload})
        case CATCH_ERROR:
            return Object.assign({}, state, {error: payload})
        default: return state
    }
}


export const stateSelector = (state: IStore<IReducerRecord>) => state[moduleName]
export const taskListSelector = createSelector(stateSelector, state => state.taskList)
export const errorSelector = createSelector(stateSelector, state => state.error)
export const isLoaderSelector = createSelector(stateSelector, state => state.isLoader)



export const addTask = (newTask: IProject, project_id: number): ThunkAction<void, IStore<IReducerRecord>, unknown, AnyAction> => async (dispatch, getState) => {
    const taskList = taskListSelector(getState()) // getState()[moduleName].projectList
    const dataToSend = newTask
    const config: any = {
        method: 'post',
        url: 'http://localhost:8000/projects/'+ project_id + '/tasks',
        headers: {
            'Content-Type': 'application/json'
        },
        data : dataToSend
    }
    const data = await axios(config)
    dispatch({
        type: ADD_NEW_TASK,
        payload: [...taskList, data]
    })
}

export const removeTask = (taskId: number, project_id: number): ThunkAction<void, IStore<IReducerRecord>, unknown, AnyAction> => async (dispatch, getState) => {
    const taskList = taskListSelector(getState()) // getState()[moduleName].projectList
    const config: any = {
        method: 'delete',
        url: 'http://localhost:8000/projects/'+ project_id + '/tasks',
        headers: {
            'Content-Type': 'application/json'
        },
        data : {id: taskId}
    }
    axios(config)
        .then(function (_response) {
            const newProjectList = deleteItemFromList<ITask>(taskList, taskId)
            dispatch({
                type: REMOVE_TASK,
                payload: newProjectList
            })
        })
        .catch(function (error) {
            console.log(error)
        })
}