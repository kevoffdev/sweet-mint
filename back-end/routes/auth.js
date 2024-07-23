import { Router } from 'express'
import { UserController } from '../controllers/auth.js'

export const createAuthRouter = ({ userModel }) => {
  const authRouter = Router()

  const authController = new UserController({ userModel })

  authRouter.post('/register', authController.registerUser)
  return authRouter
}
