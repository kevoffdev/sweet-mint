import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

const generateJWT = async (id, username) => {
  return await new Promise((resolve, reject) => {
    const payload = { id, username }
    jwt.sign(payload, SECRET_KEY, {
      expiresIn: '1h'
    }, (err, token) => {
      if (err !== null) {
        console.log(err)
        reject(new TypeError('No se pudo generar el token'))
      }
      resolve(token)
    })
  })
}
export default generateJWT
