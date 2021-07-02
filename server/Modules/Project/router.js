const express = require('express')
const router = express.Router()
const DBConnection = require('../../database')

router.post('/', async(req, res) => { // route
  const {body: {name, code}} = req // controller
  const {rows} = await DBConnection.query({text: 'INSERT INTO projects (name, code) VALUES ($1, $2) RETURNING *'}, [name, code]) // model
  res.send(rows) // controller
})

router.get('/', async (req, res) => {
  const {rows} = await DBConnection.query({text: 'SELECT * FROM projects'})
  res.status(200).send(rows)
})

router.put('/', async (req, res) => {
  const {body: {name, code, id}} = req
  const {rows} = await DBConnection.query({text: 'UPDATE projects SET name = $1, code = $2 WHERE id = $3'}, [name, code, id])
  res.status(200).send(rows)
})

router.delete('/', async (req, res) => {
  const {body: {id}} = req
  await DBConnection.query({text: 'DELETE FROM projects WHERE id = $1'}, [id])
  res.status(200).send("success")
})


module.exports = router