import { validateUser } from '../schemas/auth.js'

export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  registerUser = async (req, res) => {
    const result = validateUser(req)
    if (!result.success) {
      return res.status(400).json({
        ok: result.success,
        error: JSON.parse(result.error.message)
      })
    }
    try {
      const { status, resp } = await this.userModel.registerUser({ user: result.data })
      return res.status(status).json(resp)
    } catch (error) {
      console.error('Controller Error:', error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }
}

// const movieController = new UserController({ movieModel })

// export const createUser = async (req, res) => {
// const { firstName, lastName, emailAdress, password, repeatPassword } = req.body
// const resp = validateUser(req)
// console.log(resp.success)
// try {
//   const [checkEmail] = await connection.query('SELECT * FROM users WHERE email_adress = ?;', [emailAdress])
//   if (checkEmail.length) {
//     return res.status(409).json({
//       ok: false,
//       msg: 'Error the email is already created'
//     })
//   }
//   if (password !== repeatPassword) {
//     return res.status(400).json({
//       ok: false,
//       msg: 'Passwords are not the same'
//     })
//   }
//   const hassedPassword = bcrypt.hashSync(password, 10)
//   await connection.query(`
//   INSERT INTO users (first_name,last_name,user_password,email_adress) VALUES (?,?,?,?);`
//   , [firstName, lastName, hassedPassword, emailAdress]
//   )
// return res.status(201).send('User registry succesfully')
// } catch (error) {
//   return res.status(500).json({
//     ok: false,
//     msg: 'Internal server error'
//   })
// }
// }
