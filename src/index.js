import express from 'express'
import { uploadImage, uploadPdf } from './multer.js'
import { getImagen, subirImagen, subirPdf } from './controller.js'
import { manejarErrorArchivo } from './helpers.js'

const app = express()

app.get('/imagen/:nombre', getImagen)

app.post(
  '/subir-imagen',
  uploadImage.single('archivo'),
  subirImagen,
  manejarErrorArchivo
)

app.post(
  '/subir-pdf',
  uploadPdf.single('curriculum'),
  subirPdf,
  manejarErrorArchivo
)

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
