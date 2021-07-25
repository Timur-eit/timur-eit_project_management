/**
 * import instead of require to separate module's scope
 * https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable-typescript
 * https://www.typescriptlang.org/tsconfig#esModuleInterop
 */
import express from 'express'
import constants from './constants'
import projectRouter from './Modules/Project/router'
import taskRouter from './Modules/Task/router'
import tasksRouter from './Modules/Tasks/router'

const app: express.Application = express()

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.use('/projects', projectRouter)
app.use('/project', taskRouter)
app.use('/tasks', tasksRouter)

app.listen(constants.port, () => {
  const date = new Date()
  console.log(`Server has been loaded on ${constants.port} port at ${date}`)
})