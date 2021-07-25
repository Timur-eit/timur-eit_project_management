import {IDataModel, IDBQueryConfig, IModel} from '../interfaces'
import DBConnection from '../../database'

const sqlCreateTask: IDBQueryConfig = {
    text: `INSERT INTO task (name, description, status, type, project_id) 
        VALUES ($1::text, $2::text, $3::text, $4::text, $5::integer) 
        RETURNING id::integer, name::text, description::text, status::text, type::text, project_id::integer`
    // ? как автоматизировать получение project_id ?
}

const sqlSelectTaskByNameAndProjectId = (name: string, project_id: string): IDBQueryConfig => ({text: `SELECT * FROM tasks WHERE name = ${name} AND project_id = ${project_id}`})

const sqlSelectTaskListByProjectId = (project_id: string): IDBQueryConfig => ({text: `SELECT * FROM tasks WHERE project_id = ${project_id}`})

const sqlSelectTaskList = (): IDBQueryConfig => ({text: `SELECT * FROM tasks`})

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
    const data: ITaskModule = await DBConnection.query(sqlSelectTaskByNameAndProjectId(name, project_id), [name, project_id])
    console.log(data)
    const {rows} = data
    if (rows.length) {
        return {statusCode: 400, data: {rows: 'task name already exists in this project'}}
    }
    console.log(data)
    return {statusCode: 200, data: await DBConnection.query(sqlCreateTask, [name, status, type, description, project_id])}
}

const readAllTasksByProjectId = async (project_id: string): Promise<IModel> => {
    const data: ITaskModule = await DBConnection.query(sqlSelectTaskListByProjectId(project_id))
    return {statusCode: 200, data}
}

const readAllTasks = async (): Promise<IModel> => {
    const data: ITaskModule = await DBConnection.query(sqlSelectTaskList())
    return {statusCode: 200, data}
}

const updateTask = async (
    name: string,
    description: string,
    status: string, type: string,
    id: string
): Promise<IModel> => {
    return {statusCode: 200, data: await DBConnection.query(sqlUpdateTask, [name, description, status, type, id])}
}

const removeItem = async (id: string): Promise<IModel> => {
    return {statusCode: 200, data: await DBConnection.query(sqlDeleteItem, [id])}
}


export {
    createTask,
    readAllTasks,
    readAllTasksByProjectId,
    updateTask,
    removeItem,
}