const Recipe = require('../models/recipe.model.js');

exports.create = (req,res) => {
  const recipe = new Recipe({
    category: req.body.category,
    title: req.body.title,
    ingredients: req.body.ingredients,
    difficulty: req.body.difficulty,
    time: {
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime
    },
    yields: req.body.yields,
    description: req.body.description,
    direction: req.body.direction,
    imgURL: req.body.imgURL,
  });

  recipe.save((err, data) => {
    if (err)
      console.log(err);
    else
      res.send(data);
  });
};

// get all recipes or get recipe base on a criteria (title)
exports.findRecipes = (req,res) => {
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Recipe.find({title: regex}, (err, recipe) => {
      if (err)
        console.log(err);

      if(!recipe)
        return res.status(404).send({message: "Recipe not found"});

      res.send(recipe);
    });
  } else {
    Recipe.find((err, recipes) => {
      if (err)
        console.log(err);
      else
        res.send(recipes);
    });
  }
};

// find by id
exports.findOneById = (req, res) => {
  Recipe.findById(req.params.id, (err, recipe) => {
    if(err)
      cosole.log(err);

    if(!recipe) {
      return res.status(404).send({message: "Recipe not found"});
    }

    res.send(recipe);
  })
};

exports.update = (req,res) => {
  Recipe.findById(req.params.id, (err, recipe) => {
    if (err)
      console.log(err);

    if(!recipe) {
      return res.status(404).send({message: "Recipe not found"});
    }

    for(const key in req.body) {
      if (req.body[key]) {
        recipe[key] = req.body[key]
      }
    }

    recipe.save((err, data) => {
      if (err)
        console.log(err);
      else
        res.send({message: "Recipe updated successfully!"});
    });

  });

};

exports.delete = (req,res) => {
  Recipe.findByIdAndRemove(req.params.id, (err,recipe) => {
    if (err)
      console.log(err);

    if(!recipe) {
      return res.status(404).send({message: "Recipe not found"});
    }

    res.send({message: "Recipe deleted successfully!"});
  });
};

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};