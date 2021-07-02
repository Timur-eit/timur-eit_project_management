const express = require('express')
const {port} = require('./constants')
const projectRouter = require('./Modules/Project/router')

const app = express()

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

// app.get('/numbers', async (req, res) => {
//   const {rows} = await DBConnection.query({text: 'SELECT * FROM projects'})
//
//   res.status(200).send(rows)
// })
//
// app.post('/numbers', async(req, res) => { // route
//   const {body: {name, code}} = req // controller
//   const {rows} = await DBConnection.query({text: 'INSERT INTO projects (name, code) VALUES ($1, $2) RETURNING *'}, [name, code]) // model
//   res.send(rows) // controller
// })

app.use('/projects', projectRouter)

app.listen(port, () => {
  const date = new Date()
  console.log(`Server has been loaded on ${port} port at ${date}`)
})