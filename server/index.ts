const express = require('express')

const app = express()
const port: number = 8000

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.get('/numbers', (req, res) => {
  res.send("Hello World!")
})

app.post('/numbers', (req, res) => {
  console.log(req.body)
  res.send("World!!!! " + req.body.data)
})


app.listen(port, () => {
  const date: Date = new Date()
  console.log(`Server has been loaded on ${port} port at ${date}`)
})