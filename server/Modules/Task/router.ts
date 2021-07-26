import * as express from 'express'
import {taskCreate, getTasksByProject , getAllTasks, getTaskById, taskUpdate} from './controller'

const router = express.Router()

router.get('/', getAllTasks)
router.post('/:project_id/tasks', taskCreate)
router.get('/:project_id/tasks', getTasksByProject)
router.put('/:project_id/tasks', taskUpdate)
router.get('/:project_id/tasks/:id', getTaskById)
// router.get(path.id, getProject)
// router.put(path.root, projectUpdate)
// router.delete(path.root, projectDelete)

export default router
