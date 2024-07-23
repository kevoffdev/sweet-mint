import mysql from 'mysql2/promise'

let connection

const config = {
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '123456',
  database: 'sweet_mint_db'
}

try {
  connection = await mysql.createConnection(config)
  console.log('connect to database')
} catch (error) {
  console.error('Error to connect at database')
}
export { connection }
