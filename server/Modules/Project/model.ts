const DBConnection = require('../../database')

interface IQueryConfig {
  text: string,
  rowMode?: string,
  values?: [string, string, number?],
  types?: {
    getTypeParser: () => any,
  }
}

const sqlCreateProject: IQueryConfig = {text: 'INSERT INTO projects (name, code) VALUES ($1::text, $2::text) RETURNING id::integer, name::text, code::text'}
const sqlSelectProjectList: IQueryConfig = {text: 'SELECT * FROM projects'}
const sqlUpdateProject: IQueryConfig = {text: 'UPDATE projects SET name = $1, code = $2 WHERE id = $3'}
const sqlDeleteProject: IQueryConfig = {text: 'DELETE FROM projects WHERE id = $1'}
const sqlSelectProjectById = (field: number | string): IQueryConfig => ({text: `SELECT ${field} FROM projects WHERE id = $1`})
const sqlSelectProjectByCode: IQueryConfig = {text: 'SELECT * FROM projects WHERE code = $1'}

interface IServerResponse {
  status: number,
  data: {
    rows: string
  },
}

const createProject = async (name: string, code: string): Promise<IServerResponse> => {

  interface IResponse {
    rows: string,
    // ? any other keys ?    
  }

  const dbRequest = (params: IQueryConfig, fields: string[]): IResponse => DBConnection.query(params, fields)
  // const {rows} = await DBConnection.query(sqlSelectProjectByCode, [code])
  const {rows} = await dbRequest(sqlSelectProjectByCode, [code])
  
  if(rows.length) {
    return {status: 400, data: {rows :'project code already exist'}}
  }
  // return {status: 200, data: await DBConnection.query(sqlCreateProject, [name, code])}
  return {status: 200, data: await dbRequest(sqlCreateProject, [name, code])}
}
const readAllProjects = async () => ({status: 200, data: await DBConnection.query(sqlSelectProjectList)})
const updateProject = async (name, code, id) => ({status: 200, data: await DBConnection.query(sqlUpdateProject, [name, code, id])})
const removeProject = async (id) => ({status: 200, data: await DBConnection.query(sqlDeleteProject, [id])})
const readProjectById = async (id, field) => ({status: 200, data: await DBConnection.query(sqlSelectProjectById(field), [id])})


// module.exports = {
//   createProject,
//   readAllProjects,
//   updateProject,
//   removeProject,
//   readProjectById
// }

// ! Cannot redeclare block scoped variable (typescript)

export  {
  createProject,
  readAllProjects,
  updateProject,
  removeProject,
  readProjectById
}
