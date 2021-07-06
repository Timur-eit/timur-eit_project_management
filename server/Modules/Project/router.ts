const express = require('express')
const router = express.Router()
const DBConnection = require('../../database')

// interface IBody {
//   readonly id: number,
//   name: string,
//   code: string,
// }

interface IQueryText {
  text: string
}

router.post('/', async(req, res) => { // route
  const {body: {name, code}} = req // controller
  const queryText: IQueryText = {text: 'INSERT INTO projects (name, code) VALUES ($1, $2) RETURNING *'}
  const {rows} = await DBConnection.query(queryText, [name, code]) // model
  res.send(rows) // controller
})

router.get('/', async (req, res) => {
  const queryText: IQueryText = {text: 'SELECT * FROM projects'}
  const {rows} = await DBConnection.query(queryText)
  res.status(200).send(rows)
})

router.put('/', async (req, res) => {
  const {body: {name, code, id}} = req
  const queryText: IQueryText = {text: 'UPDATE projects SET name = $1, code = $2 WHERE id = $3'}
  const {rows} = await DBConnection.query(queryText, [name, code, id])
  res.status(200).send(rows)
})

router.delete('/', async (req, res) => {
  const {body: {id}} = req
  const queryText: IQueryText = {text: 'DELETE FROM projects WHERE id = $1'}
  await DBConnection.query(queryText, [id])
  res.status(200).send("success")
})


module.exports = router