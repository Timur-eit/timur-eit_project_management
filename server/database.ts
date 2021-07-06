const {pgSettings} = require('./constants')
const {Client} = require('pg')

interface IClient {
  connect: () => void
}

module.exports = (() => {
  const myClient: IClient = new Client(pgSettings)
  myClient.connect()
  return myClient
})()

