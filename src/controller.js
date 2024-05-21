import path from 'node:path'
import fs from 'node:fs/promises'

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
  // A tomar en cuenta: se debe obtener el archivo pdf por su nombre y enviarlo como respuesta. Además, se debe validar que el nombre que se recibe es con la extensión ".pdf", caso contrario se deberá enviar un mensaje al cliente indicando que no se ha proporcionado el nombre de una imagen.
  // Coloca tu código para obtener el archivo PDF aquí
}

export const subirImagen = (req, res) => {
  console.log(req.file)
  res.json({ message: 'Archivo subido' })
}

export const subirPdf = (req, res) => {
  console.log(req.file)
  res.json({ message: 'Curriculum subido' })
}
