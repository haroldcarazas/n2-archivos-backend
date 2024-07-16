export const validateUser = (req, res, next) => {
  try {
    const { user } = req.body
    console.log(req.body)
    if (!user) return res.status(400).json({ message: 'Se debe enviar un usuario' })

    next()
  } catch (error) {
    res.status(500).json({ message: 'Error: Se debe enviar un usuario' })
  }
}
