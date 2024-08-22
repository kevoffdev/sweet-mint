import { Router } from 'express'
import { schemaValidation } from '../middlewares/schemaValidator.js'
import { UserModel } from '../controllers/auth.js'
import { userLoginSchema, userRegisterSchema } from '../schemas/auth.js'
import { validateJWT } from '../middlewares/validateJWT.js'

export const authRouter = Router()

authRouter.post('/register', schemaValidation(userRegisterSchema), UserModel.register)
authRouter.post('/login', schemaValidation(userLoginSchema), UserModel.login)
authRouter.post('/logout', UserModel.logout)
authRouter.get('/renew', validateJWT, UserModel.revalidateJWT)
