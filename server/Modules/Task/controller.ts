import * as express from 'express'
import {createTask, readAllTasksByProjectId, readAllTasks} from './model'

interface ITaskBody {
    id: string,
    name: string,
    status: string,
    type: string,
    description: string,
    project_id?: string,
}

type TaskController = (req: express.Request, res: express.Response) => Promise<void>

const taskCreate: TaskController = async (req, res) => {
    const reqBody: ITaskBody = req.body
    const {params: {project_id}}: {params : any } = req
    const {name, status, type, description} = reqBody // controller
    console.log(name, status, type, description, project_id)
    const {statusCode, data: {rows}} = await createTask(name, status, type, description, project_id) // model
    res.status(statusCode).send(rows) // controller
}

const getTasksByProject: TaskController = async (req, res) => {
    const {params: {project_id}}: {params : any } = req
    const {statusCode, data: {rows}} = await readAllTasksByProjectId(project_id) // model
    res.status(statusCode).send(rows) // controller
}

const getAllTasks: TaskController = async (_, res) => {
    const {statusCode, data: {rows}} = await readAllTasks() // model
    res.status(statusCode).send(rows)
}


export {
    taskCreate,
    getTasksByProject,
    getAllTasks
}
