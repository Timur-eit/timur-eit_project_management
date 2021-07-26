import * as express from 'express'
import {readAllTasks} from '../Task/model'

const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    const {statusCode, data: {rows}} = await readAllTasks() // model
    res.status(statusCode).send(rows)
})

// router.get(path.root, projectList)
// router.get(path.id, getProject)
// router.put(path.root, projectUpdate)
// router.delete(path.root, projectDelete)

export default router