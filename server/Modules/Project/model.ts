const DBConnection = require('../../database')
interface IDBQueryConfig {
  text: string,
  rowMode?: string,
  values?: [string, string, number?],
  types?: {
    getTypeParser: () => any,
  }
}


const sqlCreateProject: IDBQueryConfig = {text: 'INSERT INTO projects (name, code) VALUES ($1::text, $2::text) RETURNING id::integer, name::text, code::text'}
const sqlSelectProjectList: IDBQueryConfig = {text: 'SELECT * FROM projects'}
const sqlUpdateProject: IDBQueryConfig = {text: 'UPDATE projects SET name = $1, code = $2 WHERE id = $3'}
const sqlDeleteProject: IDBQueryConfig = {text: 'DELETE FROM projects WHERE id = $1'}
const sqlSelectProjectById = (field: string): IDBQueryConfig => ({text: `SELECT ${field} FROM projects WHERE id = $1`})
const sqlSelectProjectByCode: IDBQueryConfig = {text: 'SELECT * FROM projects WHERE code = $1'}

interface IServerResponse {
  status: number,
  data: {
    rows: string
  },
}
interface IDBResponse {
  rows: string,
  // ? any other keys ?
}
const dbRequest = (params: IDBQueryConfig, fields?: (string | number)[]): Promise<IDBResponse> => DBConnection.query(params, fields)


const createProject = async (name: string, code: string): Promise<IServerResponse> => {  
  const {rows} = await dbRequest(sqlSelectProjectByCode, [code])  
  if(rows.length) {
    return {status: 400, data: {rows :'project code already exist'}}
  }  
  return {status: 200, data: await dbRequest(sqlCreateProject, [name, code])}
}
const readAllProjects = async (): Promise<IServerResponse> => {
  return {status: 200, data: await dbRequest(sqlSelectProjectList)}
}
const updateProject = async (name: string, code: string, id: string): Promise<IServerResponse> => {
  return {status: 200, data: await dbRequest(sqlUpdateProject, [name, code, id])}
}
const removeProject = async (id: string): Promise<IServerResponse> => {
  return {status: 200, data: await dbRequest(sqlDeleteProject, [id])}
}
const readProjectById = async (id: string, field: string): Promise<IServerResponse> => {
  return {status: 200, data: await DBConnection.query(sqlSelectProjectById(field), [id])}
}


/**
 * 49 line - express types error
 * field: (string | string[] | qs.ParsedQs | qs.ParsedQs[])
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/qs/index.d.ts
 * https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43434#issuecomment-607181516
 */

// module.exports = {
// ! Cannot redeclare block scoped variable (typescript)
export {
  createProject,
  readAllProjects,
  updateProject,
  removeProject,
  readProjectById
}
