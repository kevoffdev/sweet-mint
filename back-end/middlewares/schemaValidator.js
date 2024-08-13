import { ZodError } from 'zod'

export const schemaValidation = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body, params: req.params })
    return next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        ok: false,
        msg: error.issues.map(item => ({ message: item.message }))
      })
    }
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}
