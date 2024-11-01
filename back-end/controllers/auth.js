import bcrypt from 'bcrypt'

import { connection } from '../database/databaseConfig.js'
import generateJWT from '../helpers/generateJWT.js'

export class UserModel {
  static async register (req, res) {
    const { firstName, lastName, emailAdress, password, confirmedPassword } = req.body
    try {
      const [checkEmail] = await connection.query('SELECT * FROM users WHERE email_adress = ?;', [emailAdress])
      if (checkEmail.length) {
        return res.status(409).json({
          ok: false,
          msg: 'Error the email is already created'
        })
      }

      if (password !== confirmedPassword) {
        return res.status(400).json({
          ok: false,
          msg: 'Passwords are not the same'
        })
      }

      const [userCountResult] = await connection.query('SELECT COUNT(*) AS count FROM users')
      console.log(userCountResult)
      const role = userCountResult[0].count === 0 ? 'admin' : 'client'
      console.log(role)
      const hassedPassword = await bcrypt.hash(password, 10)

      await connection.query(`
        INSERT INTO users (first_name,last_name,user_password,email_adress,role) VALUES (?,?,?,?,?);`
      , [firstName, lastName, hassedPassword, emailAdress, role]
      )

      return res.status(201).json({
        ok: true,
        msg: 'User registered successfully'
      })
    } catch (error) {
      console.error('Model Error:', error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }

  static async login (req, res) {
    const { password, emailAdress } = req.body
    try {
      const [user] = await connection.query('SELECT first_name,last_name,email_adress,phonenumber,user_password,role,BIN_TO_UUID(user_id) user_id FROM users WHERE email_adress = ?', [emailAdress])
      if (user.length === 0) {
        return res.status(409).json({
          ok: false,
          msg: 'Error not found email'
        })
      }
      const validPassword = await bcrypt.compare(password, user[0].user_password)
      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: 'Password incorrect'
        })
      }
      const token = await generateJWT(user[0].user_id, user[0].first_name)

      res.cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      return res.status(200).json({
        ok: true,
        msg: 'login correct',
        user: {
          firstName: user[0].first_name,
          lastName: user[0].last_name,
          role: user[0].role
        }
      })
    } catch (error) {
      console.error('Model Error:', error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }

  static async logout (req, res) {
    return res.clearCookie('access_token').status(200).json({
      msg: 'Logout successful',
      ok: true
    })
  }

  static async revalidateJWT (req, res) {
    const { user } = req.session
    try {
      const [data] = await connection
        .query('SELECT first_name,last_name,email_adress,phonenumber,role,user_password,BIN_TO_UUID(user_id) user_id FROM users WHERE BIN_TO_UUID(user_id) = ?', [user.id])
      console.log(data)
      const token = await generateJWT(user.id, user.username)
      res.cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      return res.status(200).json({
        ok: true,
        msg: 'login correct',
        user: {
          firstName: data[0].first_name,
          lastName: data[0].last_name,
          role: data[0].role
        }
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }
}
