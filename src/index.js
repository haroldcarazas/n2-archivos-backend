import express from 'express'
import { PORT } from './config/config.js'
import imagenesRoutes from './routes/imagenes.routes.js'
import { corsValidation } from './middlewares/middleware.js'

const app = express()

app.use(express.json())
app.use(corsValidation)
app.use('/api/imagenes', imagenesRoutes)

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
