import mysql from 'mysql2/promise'
import {
  HOST_DATABASE, USER_DATABASE, PORT_DATABASE,
  PASSWORD_DATABASE, NAME_DATABASE
} from '../config.js'
console.log(process.env.HOST_DATABASE)
let connection
const config = {
  host: HOST_DATABASE,
  user: USER_DATABASE,
  port: PORT_DATABASE,
  password: PASSWORD_DATABASE,
  database: NAME_DATABASE
}

try {
  connection = await mysql.createConnection(config)
  console.log('connect to database')
} catch (error) {
  console.error('Error to connect at database')
}
export { connection }
