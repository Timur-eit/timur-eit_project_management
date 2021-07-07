const express = require('express')
const {port} = require('./constants')
const projectRouter = require('./Modules/Project/router')
// const DBConnection = require('./database')

const app = express()

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.use('/projects', projectRouter)

app.listen(port, () => {
  const date = new Date()
  console.log(`Server has been loaded on ${port} port at ${date}`)
})