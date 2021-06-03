const jwt = require('express-jwt')

// Verifica se o usuário que está tentando acessar a rota possui um token de autenticação válido.

// Função para extrair o token dos Headers da requisição
function extractTokenFromHeaders(req) {
  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    throw new Error("Missing authorization header - Bearer token.")
  } else {
    return req.headers.authorization.split(' ')[1]
  }
}

// Configuração do middleware express-jwt
module.exports = jwt({
  secret: process.env.TOKEN_SIGN_SECRET,
  userProperty: "user",
  algorithms: ['HS256'],
  getToken: extractTokenFromHeaders,
})