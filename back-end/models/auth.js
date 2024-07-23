import bcrypt from 'bcrypt'
import { connection } from '../database/databaseConfig.js'

export class UserModel {
  static async registerUser ({ user }) {
    const { firstName, lastName, emailAdress, password, confirmedPassword } = user.body
    try {
      const [checkEmail] = await connection.query('SELECT * FROM users WHERE email_adress = ?;', [emailAdress])
      if (checkEmail.length) {
        return ({
          status: 409,
          resp: {
            ok: false,
            msg: 'Error the email is already created'
          }
        })
      }

      if (password !== confirmedPassword) {
        return ({
          status: 400,
          resp: {
            ok: false,
            msg: 'Passwords are not the same'
          }
        })
      }

      const hassedPassword = await bcrypt.hash(password, 10)
      await connection.query(`
        INSERT INTO users (first_name,last_name,user_password,email_adress) VALUES (?,?,?,?);`
      , [firstName, lastName, hassedPassword, emailAdress]
      )
      const [user] = await connection
        .query('SELECT BIN_TO_UUID(user_id) user_id, first_name,last_name,email_adress FROM users;')

      return {
        status: 201,
        resp: {
          ok: true,
          msg: 'User registered successfully',
          user
        }
      }
    } catch (error) {
      console.error('Model Error:', error)
      return {
        status: 500,
        resp: {
          ok: false,
          msg: 'Internal server error'
        }
      }
    }
  }
}
