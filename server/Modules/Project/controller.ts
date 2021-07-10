const {createProject, readAllProjects, updateProject, removeProject, readProjectById} = require('./model')


const projectCreate = async (req, res) => {
  const {body: {name, code}} = req // controller
  const {status, data: {rows}} = await createProject(name, code) // model
  res.status(status).send(rows) // controller
}

const projectList = async (req, res) => {
  const {status, data: {rows}} = await readAllProjects()
  res.status(status).send(rows)
}

const projectUpdate = async (req, res) => {
  const {body: {name, code, id}} = req
  const {status, data: {rows}} = await updateProject(name, code, id)
  res.status(status).send(rows)
}

const projectDelete = async (req, res) => {
  const {body: {id}} = req
  const {status} = await removeProject(id)
  res.status(status).send("success")
}

const getProject = async (req, res) => {
  const {params: {id}, query: {field}} = req
  const {status, data: {rows}} = await readProjectById(id, field)
  res.status(status).send(rows)
}

module.exports = {
  projectDelete,
  projectCreate,
  projectUpdate,
  projectList,
  getProject
}
