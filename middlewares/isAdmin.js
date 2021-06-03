// Verifica se o usuário que está tentando acessar a rota é administrador.

module.exports = (req, res, next) => {
  const { role } = req.user
  if (role === "ADMIN") {
    return next()
  } else {
    return res.status(401).json({ msg: 'You do not have permission to do this.' })
  }
}