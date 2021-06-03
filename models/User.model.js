const mongoose = require('mongoose')

const UserModel = mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true, unique: true, lowercase: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    role: { type: String, required: true, enum: ['ADMIN', 'USER'], default: "USER" },
    passwordHash: { type: String, required: true }
  }
)

module.exports = mongoose.model('User', UserModel)