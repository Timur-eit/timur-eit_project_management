/**
 * import instead of require to separate module's scope
 * https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable-typescript
 * https://www.typescriptlang.org/tsconfig#esModuleInterop
 */
import express from 'express'
const {port} = require('./constants')
const projectRouter = require('./Modules/Project/router')

const app: express.Application = express()

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.use('/projects', projectRouter)

app.listen(port, () => {
  const date = new Date()
  console.log(`Server has been loaded on ${port} port at ${date}`)
})