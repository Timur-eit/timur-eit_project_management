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
  // const {params: {id}, query: {field}} = req
  const id = req.params.id
  const field = typeof req.query.field === "string" ? req.query.field : undefined;
  const {status, data: {rows}} = await readProjectById(id, field) // express types error - see below
  res.status(status).send(rows)
}

/** 
 * validation
 * const q = typeof req.query.q === "string" ? req.query.q : undefined;
 * https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43434#issuecomment-607181516
 */


// module.exports = {
// ! Cannot redeclare block scoped variable (typescript)
export {
  projectDelete,
  projectCreate,
  projectUpdate,
  projectList,
  getProject
}