import {combineReducers} from "redux";
import projectReducer, {moduleName as projectModule, IReducerRecord as IProjectRecord} from '../ducks/project'

export interface IStore {
    [projectModule: string]: IProjectRecord
}

declare module 'react-redux' {
    interface DefaultRootState extends IStore {}
}

export default combineReducers({[projectModule] : projectReducer})