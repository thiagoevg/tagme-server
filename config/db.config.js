const mongoose = require('mongoose')

// Função de configuração do banco de dados. Criei em um arquivo separado para manter o código mais organizado

async function connect() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`Connected to Mongo! Database name: "${connection.connection.name}"`)
  } catch (err) {
    console.error('Error connecting to mongo', err)
  }
}

module.exports = connect;