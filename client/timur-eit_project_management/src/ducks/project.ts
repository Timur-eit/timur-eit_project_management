import {createSelector} from "reselect";
import {IStore} from '../redux/reducer'
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import axios from 'axios'
import qs from 'qs';

export const moduleName: string = 'project'

export const GET_PROJECT_LIST = `${moduleName}/GET_PROJECT_LIST`
export const ADD_NEW_PROJECT = `${moduleName}/ADD_NEW_PROJECT`
export const REMOVE_PROJECT = `${moduleName}/REMOVE_PROJECT`
export const UPDATE_PROJECT = `${moduleName}/UPDATE_PROJECT`
export const SET_LOADER = `${moduleName}/SET_LOADER`
export const CATCH_ERROR = `${moduleName}/CATCH_ERROR`

export interface IProject {
    readonly id?: number,
    name: string,
    code: string
}

export interface IReducerRecord {
    projectList: IProject[],
    error: string | null,
    isLoader: boolean
}

export const reducerRecord: IReducerRecord = {
    projectList: [],
    error: null,
    isLoader: false
}

export interface IAction {
    type: string,
    payload?: any
}

export default function reducer(state = reducerRecord, action: IAction) {
    const {type, payload} = action

    switch (type) {
        case GET_PROJECT_LIST:
        case ADD_NEW_PROJECT:
        case REMOVE_PROJECT:
        case UPDATE_PROJECT:
            return Object.assign({}, state, {projectList: payload})
        case SET_LOADER:
            return Object.assign({}, state, {isLoader: payload})
        case CATCH_ERROR:
            return Object.assign({}, state, {error: payload})
        default: return state
    }
}


export const stateSelector = (state: IStore) => state[moduleName]
export const projectListSelector = createSelector(stateSelector, state => state.projectList)
export const errorSelector = createSelector(stateSelector, state => state.error)
export const isLoaderSelector = createSelector(stateSelector, state => state.isLoader)


export const fetchProjectList = (): ThunkAction<void, IStore, unknown, AnyAction> => async (dispatch): Promise<void> => {
    const { data } : {data: IProject[] } = await axios.get('http://localhost:8000/projects')
    dispatch({
        type: GET_PROJECT_LIST,
        payload: data
    })
}

export const addProjectList = (newProject: IProject): ThunkAction<void, IStore, unknown, AnyAction> => async (dispatch, getState) => {
    const projectList = projectListSelector(getState()) // getState()[moduleName].projectList
    const dataToSend = qs.stringify(newProject)
    const config: any = {
        method: 'post',
        url: 'http://localhost:8000/projects/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : dataToSend
    }
    const data = await axios(config)
    dispatch({
        type: ADD_NEW_PROJECT,
        payload: [...projectList, data]
    })
}

export const updateProjectList = (projectData: IProject): ThunkAction<void, IStore, unknown, AnyAction> => async (dispatch, getState) => {
    const projectList = projectListSelector(getState()) // getState()[moduleName].projectList
    const dataToSend = qs.stringify(projectData)
    const config: any = {
        method: 'put',
        url: 'http://localhost:8000/projects',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : dataToSend
    }
    const data = await axios(config)
    dispatch({
        type: UPDATE_PROJECT,
        payload: [...projectList, data]
    })
}

export const removeProjectList = (projectData: IProject): ThunkAction<void, IStore, unknown, AnyAction> => async (dispatch, getState) => {
    const projectList = projectListSelector(getState()) // getState()[moduleName].projectList        
    const dataToSend = qs.stringify(projectData)     
    const config: any = {
        method: 'delete',
        url: 'http://localhost:8000/projects',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : dataToSend
    }
    axios(config)
        .then(function (_response) {
            // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error)
        })
    const newProjectList = [...projectList].filter(item => item.id !== projectData.id)
    dispatch({
        type: REMOVE_PROJECT,
        payload: newProjectList
    })
}