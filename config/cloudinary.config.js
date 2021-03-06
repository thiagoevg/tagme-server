const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

// Configuração do cloudinary para o upload de imagens

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'coco-bambu', format: async (req, file) => 'png', use_filename: true }
})

const uploadCloud = multer({ storage })

module.exports = uploadCloud;

