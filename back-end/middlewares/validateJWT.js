import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

export const validateJWT = (req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }
  try {
    const data = jwt.verify(token, SECRET_KEY)
    req.session.user = data
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Token not valid'
    })
  }
  return next()
}
