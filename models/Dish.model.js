const mongoose = require('mongoose')

const DishModel = mongoose.Schema({
  dishName: { type: String, trim: true, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  preparationTime: { type: Number, required: true },
  preparationSteps: [{ type: String, required: true }],
  small_image_url: { type: String, required: true },
  big_image_url: { type: String, required: true }
})

module.exports = mongoose.model('Dish', DishModel)