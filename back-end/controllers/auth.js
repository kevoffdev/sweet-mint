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
