import { Router } from 'express'
import {
  deleteArchivo,
  getImagen,
  getImagenes,
  getPdf,
  subirImagen,
  subirPdf
} from '../controllers/controller.js'
import { manejarErrorArchivo } from '../helpers.js'
import { uploadImage, uploadPdf } from '../config/multer.js'

const router = Router()

router.get('/', getImagenes)
router.get('/:nombre', getImagen)
router.get('/pdf/:nombre', getPdf)
router.post(
  '/',
  uploadImage.single('archivo'),
  subirImagen,
  manejarErrorArchivo
)

router.post(
  '/pdf',
  uploadPdf.single('curriculum'),
  subirPdf,
  manejarErrorArchivo
)

router.delete('/archivo/:tipo/:nombre', deleteArchivo)

export default router
