import path from 'node:path'
import fs from 'node:fs/promises'
import { nuevoNombreImagen } from './multer.js'
import { pool } from './db.js'

export const getImagen = async (req, res) => {
  try {
    const { nombre } = req.params

    const ruta = path.resolve('./uploads/img')
    const rutaImagen = path.join(ruta, nombre)

    await fs.access(rutaImagen, fs.constants.F_OK)
    res.sendFile(rutaImagen)
  } catch (error) {
    if (error?.errno === -4058) {
      return res.status(404).json({ message: 'No se encontró la imagen' })
    }

    return res.status(500).json({ message: 'Error interno' })
  }
}

export const getPdf = async (req, res) => {
  const { nombre } = req.params
  const extension = path.extname(nombre)

  if (extension !== '.pdf') {
    return res.status(400).json({ message: 'Debes proporcionar un nombre válido (ej: archivo.pdf)' })
  }

  const rutaCarpeta = path.resolve('./uploads/pdf')
  const rutaArchivo = path.join(rutaCarpeta, nombre)
  await fs.access(rutaArchivo, fs.constants.F_OK)
  res.sendFile(rutaArchivo)
}

export const subirImagen = async (req, res) => {
  if (nuevoNombreImagen === null) {
    return res.status(500).json({ message: 'No se pudo subir la imagen' })
  }

  const [resultado] = await pool.execute('INSERT INTO imagenes(imagen, usuario) VALUES (?, "Juan")', [nuevoNombreImagen])

  if (resultado.affectedRows === 1) {
    return res.status(201).json({ message: 'Se guardó la imagen correctamente' })
  }

  res.status(500).json({ message: 'Error interno' })
}

export const subirPdf = (req, res) => {
  console.log(req.file)
  res.json({ message: 'Curriculum subido' })
}
