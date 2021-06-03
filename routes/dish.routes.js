const router = require('express').Router()

const DishModel = require('../models/Dish.model')
const isAuthenticated = require('../middlewares/isAuthenticated')
const isAdmin = require('../middlewares/isAdmin')
const uploadCloud = require('../config/cloudinary.config')


// Faz o upload de imagem no cloudinary
router.post('/image-upload', isAuthenticated, isAdmin, uploadCloud.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(500).json({ msg: 'File upload failed.' })
  } else {
    return res.status(201).json({ fileUrl: req.file.path })
  }
})

// Crud CREATE model.create http-post
// Somente o ADMIN (chefe) é autorizado a criar um novo prato
router.post('/dish', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const response = await DishModel.create({ ...req.body })
    return res.status(201).json(response)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: JSON.stringify(err) })
  }
})

// cRud READ model.find http-get
// HOME-FEED -> ALL DISHES
router.get('/dish', isAuthenticated, async (req, res) => {
  try {
    const response = await DishModel.find()

    if (response) {
      return res.status(200).json(response)
    } else {
      return res.status(404).json({ msg: 'Product not found.' })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: JSON.stringify(err) })
  }
})

// cRud READ model.find http-get
//  FIND SPECIFIC DISH BY ID
router.get('/dish/:_id', isAuthenticated, async (req, res) => {
  try {
    const dishId = req.params._id

    const response = await DishModel.findOne({ _id: dishId }, { __v: 0 })

    if (!response) {
      return res.status(404).json({ msg: 'Post not found.' })
    }

    return res.status(200).json(response)

  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: JSON.stringify(err) })
  }
})

// crUd UPDATE model.findOneAndUpdate http-put
// UPDATE - Apenas o administrador (chefe) é apto a modificar as receitas
router.put('/dish/:_id', isAuthenticated, isAdmin, async (req, res) => {
  try {

    const dishId = req.params._id;
    const foundDish = await DishModel.findOne({ _id: dishId })
    if (!foundDish) {
      return res.status(404).json({ msg: 'The dish was not found.' })
    }

    const response = await DishModel.findOneAndUpdate({ _id: dishId }, { $set: req.body }, { new: true })

    return res.status(200).json(response)

  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: JSON.stringify(err) })
  }
})

// cruD DELETE model.deleteOne http.delete
// DELETE - Apenas o administrador (chefe) é apto a deletar as receitas
router.delete("/dish/:_id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const userId = req.user._id
    const dishId = req.params._id;
    const foundPost = await DishModel.findOne({ _id: dishId })
    if (!foundPost) {
      return res.status(404).json({ msg: 'The dish was not found.' })
    }

    const response = await DishModel.deleteOne({ _id: dishId })

    return res.status(200).json(response)

  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: JSON.stringify(err) })
  }
})

module.exports = router;