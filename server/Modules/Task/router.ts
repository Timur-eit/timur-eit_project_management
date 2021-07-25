import * as express from 'express'
import {taskCreate, getTasksByProject} from './controller'

const router = express.Router()

router.post('/:project_id/task', taskCreate)
router.get('/:project_id/tasks', getTasksByProject)
// router.get(path.id, getProject)
// router.put(path.root, projectUpdate)
// router.delete(path.root, projectDelete)

export default router
