const {createProject, readAllProjects, updateProject, removeProject, readProjectById} = require('./model')

interface BodyContent {
  body: {
    id: number,
    name: string,
    code: string,
  }
}

// res.status ?

type ProjectController = (req: (BodyContent), res: object) => Promise<void>
// ? params: any ?

const projectCreate: ProjectController = async (req, res) => {
  const {body: {name, code}} = req // controller
  const {status, data: {rows}} = await createProject(name, code) // model
  res.status(status).send(rows) // controller
}

const projectList: ProjectController = async (req, res) => {
  const {status, data: {rows}} = await readAllProjects()
  res.status(status).send(rows)
}

const projectUpdate: ProjectController = async (req, res) => {
  const {body: {name, code, id}} = req
  const {status, data: {rows}} = await updateProject(name, code, id)
  res.status(status).send(rows)
}

const projectDelete: ProjectController = async (req, res) => {
  const {body: {id}} = req
  const {status} = await removeProject(id)
  res.status(status).send("success")
}

const getProject: ProjectController = async (req, res) => {
  const {params: {id}, query: {field}} = req
  const {status, data: {rows}} = await readProjectById(id, field)
  res.status(status).send(rows)
}

// module.exports = {
//   projectDelete,
//   projectCreate,
//   projectUpdate,
//   projectList,
//   getProject
// }

// ! Cannot redeclare block scoped variable (typescript)

export {
  projectDelete,
  projectCreate,
  projectUpdate,
  projectList,
  getProject
}