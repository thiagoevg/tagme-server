const router = require('express').Router()
const bcrypt = require('bcrypt')

const UserModel = require('../models/User.model')
const generateToken = require('../config/jwt.config')
const isAuthenticated = require('../middlewares/isAuthenticated')
const isAdmin = require('../middlewares/isAdmin')

const salt_rounds = 10;

// Crud - CREATE model.create / http-post
// SIGN-UP
router.post('/signup', async (req, res) => {
  try {
    // Extrai o password do body da requisição
    const { password } = req.body

    // Checa se o password existe e se é forte o suficiente
    if (!password) {
      return res.status(400).json({ msg: "The password field is required." })
    }
    if (!password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    )) {
      return res.status(400).json({ msg: "The password must have at least 8 characters." })
    }

    // Gera salt para incrementar a segurança da criptografia
    const salt = await bcrypt.genSalt(salt_rounds)

    // Criptografa a senha a ser passada para o banco de dados
    const passwordHash = await bcrypt.hash(password, salt)

    // Cria o usuário no banco de dados com a senha criptografada, conforme previsto no Schema
    const response = await UserModel.create({ ...req.body, passwordHash })

    // Retorna a resposta para o cliente
    return res.status(201).json({ response })

  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: JSON.stringify(err) })
  }
})

// model.findOne / http-post
// LOGIN
router.post('/login', async (req, res) => {
  try {
    // Extrai informações passadas no body da requisição
    const { userName, password } = req.body;

    // Procura usuário no banco de dados pelo userName
    const foundUser = await UserModel.findOne({ userName })

    // Caso o usuário não seja encontrado, retorna um erro
    if (!foundUser) {
      return res.status(404).json({ msg: 'User not found.' })
    }

    // Extrai informações adicionais do usuário encontrado
    const { email, _id, role, passwordHash } = foundUser;

    // Compara senha introduzida pelo usuário com a senha criptografada salva no banco de dados
    if (await bcrypt.compare(password, passwordHash)) {
      // Sucesso do login
      // Gera o token necessário para as futuras autenticações
      const token = generateToken(foundUser)
      // Retorna resposta para o cliente, contendo dados do usuário logado e o token
      return res.status(200).json({ user: { email, _id, role, userName }, token })
    } else {
      return res.status(401).json({ msg: "Wrong userName or password." })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: JSON.stringify(err) })
  }
})

// cRud - READ - model.findOne / http-get
// PROFILE
router.get('/profile', isAuthenticated, (req, res) => {
  try {

    const loggedInUser = req.user;
    return res.status(200).json(loggedInUser)

  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: JSON.stringify(err) })
  }
})

// crUd - UPDATE - model.findOneAndUpdate / http-put
// UPDATE
router.put('/user/:_id', isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;
    // A condição a seguir verifica se o usuário logado é o mesmo que deseja ver a informação do profile ou se é ADMIN, caso contrário retorna status 401 - Não autorizado.
    if (req.user._id == _id || req.user.role === "ADMIN") {
      const response = await UserModel.findOneAndUpdate({ _id }, { $set: req.body }, {
        new: true, projection: {
          passowordHash: false, __v: false
        }
      })
      if (!response) {
        return res.status(404).json({ msg: 'User not found.' })
      }
      return res.status(200).json(response)
    } else {
      return res.status(401).json({ msg: 'You do not have permission to update this user.' })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: JSON.stringify(err) })
  }
})

//cruD - DELETE - model.deleteOne / http-delete
// DELETE
router.delete('/user/:_id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { _id } = req.params;

    const response = await UserModel.deleteOne({ _id })

    if (response.n === 0) {
      return res.status(404).json({ msg: "User not found." })
    }

    return res.status(200).json({})


  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) })
  }
})


module.exports = router;


