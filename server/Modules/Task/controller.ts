import * as express from 'express'
import { createTask, readAllTasks, updateTask, removeItem } from './model'

interface ITaskBody {
    id: string,
    name: string,
    status: string,
    type: string,
    description: string,
    project_id: string,
}

type TaskController = (req: express.Request, res: express.Response) => Promise<void>

const itemCreate: TaskController = async (req, res) => {
    const reqBody: ITaskBody = req.body
    const {name, status, type, description, project_id} = reqBody // controller
    const {status, data: {rows}} = await createTask(name, status, type, description, project_id) // model
    res.status(status).send(rows) // controller
  }
