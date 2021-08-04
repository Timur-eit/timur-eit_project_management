import {IDBQueryConfig, IDataModel, IModel} from '../interfaces'
import DBConnection from '../../database'

const sqlCreateProject: IDBQueryConfig = {text: 'INSERT INTO projects (name, code) VALUES ($1::text, $2::text) RETURNING id::integer, name::text, code::text'}
const sqlSelectProjectList: IDBQueryConfig = {text: 'SELECT * FROM projects'}
const sqlUpdateProject: IDBQueryConfig = {text: 'UPDATE projects SET name = $1, code = $2 WHERE id = $3 RETURNING *'}
const sqlDeleteProject: IDBQueryConfig = {text: 'DELETE FROM projects WHERE id = $1'}
const sqlSelectProjectById = (id: string): IDBQueryConfig => ({text: `SELECT * FROM projects WHERE id = ${id}`})
const sqlSelectProjectByCode: IDBQueryConfig = {text: 'SELECT * FROM projects WHERE code = $1'}

interface IProject {
  readonly id?: number,
  name?: string,
  code?: string
}

interface IProjectModule extends IDataModel {
  rows: IProject[]
}

const createProject = async (name: string, code: string): Promise<IModel> => {
  const data : IProjectModule = await DBConnection.query(sqlSelectProjectByCode, [code])
  const {rows} = data

  if(rows.length) {
    return {statusCode: 400, data: {rows : 'project code already exist'}}
  }  
  return {statusCode: 200, data: await DBConnection.query(sqlCreateProject, [name, code])}
}

const readAllProjects = async (): Promise<IModel> => {
  const data : IProjectModule = await DBConnection.query(sqlSelectProjectList)
  return {statusCode: 200, data}
}

const updateProject = async (name: string, code: string, id: string): Promise<IModel> => {
  return {statusCode: 200, data: await DBConnection.query(sqlUpdateProject, [name, code, id])}
}

const removeProject = async (id: string): Promise<IModel> => {
  return {statusCode: 200, data: await DBConnection.query(sqlDeleteProject, [id])}
}


const readProjectById = async (id: string): Promise<IModel> => {
  const data : IProjectModule = await DBConnection.query(sqlSelectProjectById(id))
  const { rows } = data
  if (rows.length === 0) {
    return {statusCode: 400, data: {rows: 'this project doesn\'t exist'}}  
  }  
  return {statusCode: 200, data: await DBConnection.query(sqlSelectProjectById(id))}
}

export {
  createProject,
  readAllProjects,
  updateProject,
  removeProject,
  readProjectById
}
