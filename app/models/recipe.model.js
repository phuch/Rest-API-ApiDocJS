const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  category: String,
  title: String,
  ingredients: Array,
  difficulty: String,
  time: {
   prepTime: String,
   cookTime: String
  },
  yields: Number,
  description: String,
  direction: String,
  imgURL: String,

}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', RecipeSchema);