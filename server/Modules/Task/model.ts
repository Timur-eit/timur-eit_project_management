import {IDBQueryConfig, IDataModel, IModel} from '../interfaces'
import DBConnection from '../../database'

const sqlCreateProject: IDBQueryConfig = {
    text: `INSERT INTO task (name, description, status, type, project_id) 
        VALUES ($1::text, $2::text, $3::text, $4::text, $5::text) 
        RETURNING id::integer, name::text, description::text, status::text, type::text, project_id::integer`
    // ? как автоматизировать получение project_id ?
}
const sqlSelectTaskByName = (name: string, project_id: string): IDBQueryConfig => ({text: `SELECT * FROM tasks WHERE name = ${name} AND project_id = ${project_id}`})
const sqlSelectTaskList = (project_id: string): IDBQueryConfig => ({text: `SELECT * FROM tasks WHERE project_id = ${project_id}`})
const sqlUpdateTask: IDBQueryConfig = {
    text: 'UPDATE tasks SET name = $1, description = $2, status = $3, type = $4 WHERE id = $5'
}
const sqlDeleteItem: IDBQueryConfig = {text: 'DELETE FROM items WHERE id = $1'}

interface ITask {
  readonly id?: number,
  name?: string,  
  description: string,
  status: string,
  type: string,
  project_id: number,
}

interface ITaskModule extends IDataModel {
  rows: ITask[]
}

const createTask = async (
                            name: string,
                            status: string, 
                            type: string,
                            description: string,
                            project_id: string
                            ): Promise<IModel> => {
  const data : ITaskModule = await DBConnection.query(sqlSelectTaskByName(name, project_id), [name, project_id])
  const {rows} = data
  if(rows.length) {
    return {status: 400, data: {rows : 'task name already exists in this project'}}
  }  
  return {status: 200, data: await DBConnection.query(sqlCreateProject, [name, status, type, description, project_id])}
}

const readAllTasks = async (project_id: string): Promise<IModel> => {
    const data : ITaskModule = await DBConnection.query(sqlSelectTaskList(project_id))
    return {status: 200, data}
}

const updateTask = async (
                            name: string,
                            description: string,
                            status: string, type: string,
                            id: string
                        ): Promise<IModel> => {
    return {status: 200, data: await DBConnection.query(sqlUpdateTask, [name, description, status, type, id])}
}
  
const removeItem = async (id: string): Promise<IModel> => {
    return {status: 200, data: await DBConnection.query(sqlDeleteItem, [id])}
}
  

export {
    createTask,
    readAllTasks,
    updateTask,
    removeItem,
}