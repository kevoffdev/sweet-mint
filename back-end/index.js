import express from 'express'
import cookieParser from 'cookie-parser'
import { PORT } from './config.js'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import { validateJWT } from './middlewares/validateJWT.js'

const app = express()

const ACCEPTED_ORIGINS = 'http://localhost:5173'

app.use(cors({
  origin: ACCEPTED_ORIGINS,
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.disable('x-powered-by')

app.use('/api/auth', authRouter)
app.get('/protected', validateJWT, (req, res) => {
  const { user } = req.session
  console.log(user)
  if (!user) {
    return res.status(403).json({
      ok: false,
      msg: 'access not authorized'
    })
  }
  return res.status(201).json({
    ok: true,
    msg: 'access correct'
  })
})

app.get('*', (req, res) => {
  res.send('Api rest Sweet Mint')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
