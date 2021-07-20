import * as express from 'express'
import { createProject, readAllProjects, updateProject, removeProject, readProjectById } from './model'

interface IProjectBody {
  id: string,
  name: string,
  code: string,
}

type ProjectController = (req: express.Request, res: express.Response) => Promise<void>

const projectCreate: ProjectController = async (req, res) => {
  const reqBody: IProjectBody = req.body
  const {name, code} = reqBody // controller
  const {status, data: {rows}} = await createProject(name, code) // model
  res.status(status).send(rows) // controller
}

const projectList: ProjectController = async (_req, res) => {
  const {status, data: {rows}} = await readAllProjects()
  res.status(status).send(rows)
}

const projectUpdate: ProjectController = async (req, res) => {
  const {body: {name, code, id}}: {body : IProjectBody} = req
  const {status, data: {rows}} = await updateProject(name, code, id)
  res.status(status).send(rows)
}

const projectDelete: ProjectController = async (req, res) => {
  const {body: {id}}: {body : IProjectBody} = req
  const {status} = await removeProject(id)
  res.status(status).send("success")
}

const getProject: ProjectController = async (req, res) => {  
  const id = req.params.id  
  const {status, data: {rows}} = await readProjectById(id)
  res.status(status).send(rows)
}

export {
  projectDelete,
  projectCreate,
  projectUpdate,
  projectList,
  getProject
}