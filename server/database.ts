import constants from './constants'
import * as pg from 'pg'

export default (() => {
    const myClient = new pg.Client(constants.pgSettings)
    myClient.connect()
    return myClient
})()