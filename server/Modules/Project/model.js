const DBConnection = require('../../database')

const sqlCreateProject = {text: 'INSERT INTO projects (name, code) VALUES ($1::text, $2::text) RETURNING id::integer, name::text, code::text'}
const sqlSelectProjectList = {text: 'SELECT * FROM projects'}
const sqlUpdateProject = {text: 'UPDATE projects SET name = $1, code = $2 WHERE id = $3'}
const sqlDeleteProject = {text: 'DELETE FROM projects WHERE id = $1'}
const sqlSelectProjectById = (field) => ({text: `SELECT ${field} FROM projects WHERE id = $1`})
const sqlSelectProjectByCode = {text: 'SELECT * FROM projects WHERE code = $1'}

const createProject = async (name, code) => {

  const {rows} = await DBConnection.query(sqlSelectProjectByCode, [code])
  if(rows.length) {
    return {status: 400, data: {rows :'project code already exist'}}
  }
  return {status: 200, data: await DBConnection.query(sqlCreateProject, [name, code])}
}
const readAllProjects = async () => ({status: 200, data: await DBConnection.query(sqlSelectProjectList)})
const updateProject = async (name, code, id) => ({status: 200, data: await DBConnection.query(sqlUpdateProject, [name, code, id])})
const removeProject = async (id) => ({status: 200, data: await DBConnection.query(sqlDeleteProject, [id])})
const readProjectById = async (id, field) => ({status: 200, data: await DBConnection.query(sqlSelectProjectById(field), [id])})


module.exports = {
  createProject,
  readAllProjects,
  updateProject,
  removeProject,
  readProjectById
}