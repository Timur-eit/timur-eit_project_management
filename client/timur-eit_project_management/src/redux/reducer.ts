import {combineReducers} from "redux";
import projectReducer, {moduleName as projectModule, IReducerRecord as IProjectRecord} from '../ducks/project'

export interface IStore {
    [projectModule: string]: IProjectRecord
}

export default combineReducers({[projectModule] : projectReducer})