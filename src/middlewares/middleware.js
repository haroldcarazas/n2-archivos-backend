import { originsAllowed } from '../config/config.js'

export const corsValidation = (req, res, next) => {
  const { origin } = req.headers
  console.log(origin)

  if (originsAllowed.includes(origin) || origin === undefined) {
    res.setHeader('Access-Control-Allow-Origin', origin ?? '*')
    next()
  } else {
    res.status(403).json({ message: 'No autorizado por CORS' })
  }
}
