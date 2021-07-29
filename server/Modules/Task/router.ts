import * as express from 'express'
import {
    taskCreate,
    getTasksByProject,
    getAllTasks,
    getTaskById,
    taskUpdate,
    taskDelete
} from './controller'

const router = express.Router()
const getAllTasksRouter = express.Router()

router.use((_req, _res, next) => {
    next()
})

getAllTasksRouter.get('/', getAllTasks)
router.post('/:project_id/tasks', taskCreate)
router.get('/:project_id/tasks', getTasksByProject)
router.put('/:project_id/tasks/:id', taskUpdate)
router.get('/:project_id/tasks/:id', getTaskById)
router.delete('/:project_id/tasks/:id', taskDelete)


export {getAllTasksRouter}
export default router
