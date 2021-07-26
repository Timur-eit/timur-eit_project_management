import {IDataModel, IDBQueryConfig, IModel} from '../interfaces'
import DBConnection from '../../database'

const sqlCreateTask: IDBQueryConfig = {
    text: `INSERT INTO tasks (name, description, status, type, project_id) 
        VALUES ($1::text, $2::text, $3::text, $4::text, $5::integer) 
        RETURNING id::integer, name::text, description::text, status::text, type::text, project_id::integer`
}

const sqlSelectTaskByNameAndProjectId: IDBQueryConfig = {
    text: 'SELECT * FROM tasks WHERE name = $1 AND project_id = $2'
}

const sqlSelectTaskListByProjectId: IDBQueryConfig = {
    text: 'SELECT * FROM tasks WHERE project_id = $1'
}

const sqlSelectProjectByProjectId: IDBQueryConfig = {
    text: 'SELECT id FROM projects WHERE id = $1'
}

const sqlSelectAllTasks: IDBQueryConfig = {text: `SELECT * FROM tasks`}

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
    const taskData: ITaskModule = await DBConnection.query(sqlSelectTaskByNameAndProjectId, [name, project_id])
    const projectData: ITaskModule = await DBConnection.query(sqlSelectProjectByProjectId, [project_id])
    
    const task = taskData.rows
    const project = projectData.rows
    if (task.length) {
        return {statusCode: 400, data: {rows: 'task name already exists in this project'}}
    } else if (project.length === 0) {
        return {statusCode: 400, data: {rows: 'this project_id doesn\'t exist'}}
    } else {
        return {statusCode: 200, data: await DBConnection.query(sqlCreateTask, [name, status, type, description, project_id])}
    }
}

const readAllTasksByProjectId = async (project_id: string): Promise<IModel> => {
    const projectData: ITaskModule = await DBConnection.query(sqlSelectProjectByProjectId, [project_id])
    const { rows } = projectData    
    if (rows.length === 0) {
        return {statusCode: 400, data: {rows: 'this project_id doesn\'t exist'}}
    }    
    const taskData: ITaskModule = await DBConnection.query(sqlSelectTaskListByProjectId, [project_id])
    return {statusCode: 200, data: taskData}
}

const readAllTasks = async (): Promise<IModel> => {
    const data: ITaskModule = await DBConnection.query(sqlSelectAllTasks)
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