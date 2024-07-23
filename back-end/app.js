import express from 'express'
import { PORT } from './config.js'
import { createAuthRouter } from './routes/auth.js'

export const createApp = ({ userModel }) => {
  const app = express()

  app.use(express.json())

  app.use('/api/auth', createAuthRouter({ userModel }))

  app.get('/', (req, res) => {
    res.send('hello world')
  })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
