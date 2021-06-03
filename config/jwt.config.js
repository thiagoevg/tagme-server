const jwt = require("jsonwebtoken")

// Configura a função responsável pela geração do token de autenticação no sucesso do login

function generateToken(user) {
  // Por questão de segurança o password NUNCA pode ser passado para o token
  const { userName, email, _id, role } = user;

  const signature = process.env.TOKEN_SIGN_SECRET;
  const expiration = "8h";


  return jwt.sign({ userName, email, _id, role }, signature, { expiresIn: expiration });
}

module.exports = generateToken