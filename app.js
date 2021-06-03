require('dotenv').config()
const express = require('express')
const cors = require('cors')

// Importando e executando a função de configuração do banco de dados definida na pasta config
require('./config/db.config')()

// Iniciando o app através do express
const app = express()

// Prepara o app para receber requesições do tipo JSON
app.use(express.json())

// Faz com que o servidor escute a requisições na porta especificada (4000)
app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`)
})

// Permite que o servidor responda a requisições oriundas de uma URL diferente definida
app.use(cors({ origin: process.env.REACT_APP_URL }))

// Faz com que o app escute às rotas do express definadas na página routes
const UserRouter = require('./routes/user.routes')
app.use('/', UserRouter)

const DishRouter = require('./routes/dish.routes')
app.use('/', DishRouter)


