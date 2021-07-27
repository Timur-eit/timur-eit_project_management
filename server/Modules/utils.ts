import {IModel} from './interfaces'
import DBConnection from '../database'
import {ITaskModule, sqlSelectProjectByProjectId, sqlSelectTaskListById} from '../Modules/Task/model'

async function columnsExistChecker (projectId: string, taskId?: string): Promise<IModel | null> {
    const projectData: ITaskModule = await DBConnection.query(sqlSelectProjectByProjectId, [projectId])
    const project = projectData.rows

    let result: IModel | null

    if (taskId === undefined) {
        if (project.length === 0) {
            result = {statusCode: 400, data: {rows: 'this project_id doesn\'t exist'}}
        } else {
            result = null
        }
    } else {
        const taskData: ITaskModule = await DBConnection.query(sqlSelectTaskListById, [taskId])
        const task = taskData.rows
        if (project.length === 0) {
            result = {statusCode: 400, data: {rows: 'this project_id doesn\'t exist'}}
        } else if (task.length === 0) {
            result = {statusCode: 400, data: {rows: 'this task id doesn\'t exist'}}
        } else {
            result = null
        }        
    }

    return result   
}

export default columnsExistChecker