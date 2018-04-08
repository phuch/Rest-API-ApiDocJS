const express = require('express');
const bodyParser = require('body-parser');

// create express app
var app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// serve all public files
app.use(express.static('public'));

// configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

// require recipes constroller
const recipes = require('./app/controllers/recipe.controller.js');
//require('./app/routes/recipe.routes')(app);

mongoose.connect(dbConfig.url).then(() => {
  console.log('Connect to database successfully.');

  // listen for requests
  app.listen(3001, function(){
    console.log("Server is listening on port 3001");
  });

}, err => {
  console.log('Connect to db failed: ' + err);
});

// define a simple route
app.get('/', function(req, res){
  res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

/**
* @api {post} /recipesss Add a new recipe
* @apiGroup Recipes
* @apiParam {String} category Recipe category
* @apiParam {String} title Recipe title
* @apiParam {String[]} ingredients Recipe ingredients
* @apiParam {String} description Recipe description
* @apiParam {String} difficulty Recipe difficulty
* @apiParam {Number} yields Number of products
* @apiParam {String} direction Recipe direction
* @apiParam {String} imgURL Recipe image
* @apiParamExample {json} Input
*    {
*      "ingredients": [
*         "eggs",
*         "ramen noodle",
*         "dashi",
*         "pork",
*         "soy sauce",
*         "bean sprout"
*       ],
*      "category": "Main Dish",
*      "title": "Shoyu Ramen",
*      "difficulty": "Advanced",
*      "yields": 4,
*      "description": "Shōyu (醤油 (soy sauce)) ramen is the oldest of the
*      four, it has a clear brown broth, based on a chicken and vegetable (or sometimes fish or beef) stock with
*     plenty of soy sauce added resulting in a soup that is tangy, salty, and savory yet still fairly light on the palate.",
*      "direction": "Lorem ipsum dolor sit amet, consectetur adipiscing
*      elit. Donec neque est, aliquam non dictum vitae, sodales hendrerit lectus. Quisque vel viverra libero.",
*      "imgURL": "https://i0.wp.com/angsarap.net/wp-content/uploads/2014/09/Shoyu-Ramen.jpg",
*    }
* @apiSuccess {String} _id Recipe id
* @apiSuccess {String[]} ingredients List of ingredients
* @apiSuccess {String} category Recipe category
* @apiSuccess {String} title Recipe title
* @apiSuccess {String} difficulty Recipe's difficulty
* @apiSuccess {Number} yields Number of products
* @apiSuccess {String} description Recipe description
* @apiSuccess {String} imgURL Image of the recipe
* @apiSuccess {Date} updated_at Update's date
* @apiSuccess {Date} created_at Register's date
* @apiSuccessExample {json} Success
*    HTTP/1.1 200 OK
*    [{
*       "ingredients": [
*         "eggs",
*         "ramen noodle",
*         "dashi",
*         "pork",
*         "soy sauce",
*         "bean sprout"
*       ],
*      "_id": "5ac65aab6725cd685c6346f1",
*      "category": "Main Dish",
*      "title": "Shoyu Ramen",
*      "difficulty": "Advanced",
*      "yields": 4,
*      "description": "Shōyu (醤油 (soy sauce)) ramen is the oldest of the
*      four, it has a clear brown broth, based on a chicken and vegetable (or sometimes fish or beef) stock with
*     plenty of soy sauce added resulting in a soup that is tangy, salty, and savory yet still fairly light on the palate.",
*      "direction": "Lorem ipsum dolor sit amet, consectetur adipiscing
*      elit. Donec neque est, aliquam non dictum vitae, sodales hendrerit lectus. Quisque vel viverra libero.",
*      "imgURL": "https://i0.wp.com/angsarap.net/wp-content/uploads/2014/09/Shoyu-Ramen.jpg",
*      "createdAt": "2018-04-05T17:19:39.767Z",
*      "updatedAt": "2018-04-05T17:19:39.767Z",
*    }]
* @apiErrorExample {json} Register error
*    HTTP/1.1 500 Internal Server Error
*/
app.post('/recipesss', recipes.create);

/**
* @api {get} /recipess List all recipes
* @apiGroup Recipes
* @apiSuccess {Object[]} recipes List of recipes
* @apiSuccess {String} recipes._id Recipe id
* @apiSuccess {String[]} reicpes.ingredients List of ingredients
* @apiSuccess {String} recipes.category Recipe category
* @apiSuccess {String} reicpes.title Recipe title
* @apiSuccess {String} recipes.difficulty Recipe's difficulty
* @apiSuccess {Number} recipes.yields Number of products
* @apiSuccess {String} recipes.description Recipe description
* @apiSuccess {String} recipes.imgURL Image of the recipe
* @apiSuccess {Date} recipes.updated_at Update's date
* @apiSuccess {Date} recipes.created_at Register's date
* @apiSuccessExample {json} Success
*    HTTP/1.1 200 OK
*    [{
*       "ingredients": [
*         "eggs",
*         "ramen noodle",
*         "dashi",
*         "pork",
*         "soy sauce",
*         "bean sprout"
*       ],
*      "_id": "5ac65aab6725cd685c6346f1",
*      "category": "Main Dish",
*      "title": "Shoyu Ramen",
*      "difficulty": "Advanced",
*      "yields": 4,
*      "description": "Shōyu (醤油 (soy sauce)) ramen is the oldest of the
*      four, it has a clear brown broth, based on a chicken and vegetable (or sometimes fish or beef) stock with
*     plenty of soy sauce added resulting in a soup that is tangy, salty, and savory yet still fairly light on the palate.",
*      "direction": "Lorem ipsum dolor sit amet, consectetur adipiscing
*      elit. Donec neque est, aliquam non dictum vitae, sodales hendrerit lectus. Quisque vel viverra libero.",
*      "imgURL": "https://i0.wp.com/angsarap.net/wp-content/uploads/2014/09/Shoyu-Ramen.jpg",
*      "createdAt": "2018-04-05T17:19:39.767Z",
*      "updatedAt": "2018-04-05T17:19:39.767Z",
*    }]
* @apiErrorExample {json} List error
*    HTTP/1.1 500 Internal Server Error
*/

/**
* @api {get} /recipess/?query_param=:title Find a recipe by title
* @apiGroup Recipes
* @apiParam {String} query_id Search query parameter.
* @apiParam {String} title Recipe's title
* @apiSuccess {String} _id Recipe id
* @apiSuccess {String[]} ingredients List of ingredients
* @apiSuccess {String} category Recipe category
* @apiSuccess {String} title Recipe title
* @apiSuccess {String} difficulty Recipe's difficulty
* @apiSuccess {Number} yields Number of products
* @apiSuccess {String} description Recipe description
* @apiSuccess {String} imgURL Image of the recipe
* @apiSuccess {Date} updated_at Update's date
* @apiSuccess {Date} created_at Register's date
* @apiSuccessExample {json} Success
*    HTTP/1.1 200 OK
*    [{
*       "ingredients": [
*         "eggs",
*         "ramen noodle",
*         "dashi",
*         "pork",
*         "soy sauce",
*         "bean sprout"
*       ],
*      "_id": "5ac65aab6725cd685c6346f1",
*      "category": "Main Dish",
*      "title": "Shoyu Ramen",
*      "difficulty": "Advanced",
*      "yields": 4,
*      "description": "Shōyu (醤油 (soy sauce)) ramen is the oldest of the
*      four, it has a clear brown broth, based on a chicken and vegetable (or sometimes fish or beef) stock with plenty of soy sauce added resulting in a soup that is tangy, salty, and savory yet still fairly light on the palate.",
*      "direction": "Lorem ipsum dolor sit amet, consectetur adipiscing
*      elit. Donec neque est, aliquam non dictum vitae, sodales hendrerit lectus. Quisque vel viverra libero.",
*      "imgURL": "https://i0.wp.com/angsarap.net/wp-content/uploads/2014/09/Shoyu-Ramen.jpg",
*      "createdAt": "2018-04-05T17:19:39.767Z",
*      "updatedAt": "2018-04-05T17:19:39.767Z",
*    }]
* @apiErrorExample {json} Recipe not found
*    HTTP/1.1 404 Recipe Not Found
* @apiErrorExample {json} Find error
*    HTTP/1.1 500 Internal Server Error
*/
app.get('/recipesss', recipes.findRecipes);

/**
* @api {get} /recipess/:id Find a recipe
* @apiGroup Recipes
* @apiParam {String} id Recipe's id
* @apiSuccess {String} _id Recipe id
* @apiSuccess {String[]} ingredients List of ingredients
* @apiSuccess {String} category Recipe category
* @apiSuccess {String} title Recipe title
* @apiSuccess {String} difficulty Recipe's difficulty
* @apiSuccess {Number} yields Number of products
* @apiSuccess {String} description Recipe description
* @apiSuccess {String} imgURL Image of the recipe
* @apiSuccess {Date} updated_at Update's date
* @apiSuccess {Date} created_at Register's date
* @apiSuccessExample {json} Success
*    HTTP/1.1 200 OK
*    [{
*       "ingredients": [
*         "eggs",
*         "ramen noodle",
*         "dashi",
*         "pork",
*         "soy sauce",
*         "bean sprout"
*       ],
*      "_id": "5ac65aab6725cd685c6346f1",
*      "category": "Main Dish",
*      "title": "Shoyu Ramen",
*      "difficulty": "Advanced",
*      "yields": 4,
*      "description": "Shōyu (醤油 (soy sauce)) ramen is the oldest of the
*      four, it has a clear brown broth, based on a chicken and vegetable (or sometimes fish or beef) stock with plenty of soy sauce added resulting in a soup that is tangy, salty, and savory yet still fairly light on the palate.",
*      "direction": "Lorem ipsum dolor sit amet, consectetur adipiscing
*      elit. Donec neque est, aliquam non dictum vitae, sodales hendrerit lectus. Quisque vel viverra libero.",
*      "imgURL": "https://i0.wp.com/angsarap.net/wp-content/uploads/2014/09/Shoyu-Ramen.jpg",
*      "createdAt": "2018-04-05T17:19:39.767Z",
*      "updatedAt": "2018-04-05T17:19:39.767Z",
*    }]
* @apiErrorExample {json} Recipe not found
*    HTTP/1.1 404 Recipe Not Found
* @apiErrorExample {json} Find error
*    HTTP/1.1 500 Internal Server Error
*/
app.get('/recipesss/:id', recipes.findOneById);

/**
* @api {put} /recipess/:id Update a recipe
* @apiGroup Recipes
* @apiParam {String} category Recipe category
* @apiParam {String} title Recipe title
* @apiParam {String[]} ingredients Recipe ingredients
* @apiParam {String} description Recipe description
* @apiParam {String} difficulty Recipe difficulty
* @apiParam {Number} yields Number of products
* @apiParam {String} direction Recipe direction
* @apiParam {String} imgURL Recipe image
* @apiParamExample {json} Input
*    {
*      "ingredients": [
*         "eggs",
*         "ramen noodle",
*         "dashi",
*         "pork",
*         "soy sauce",
*         "bean sprout"
*       ],
*      "category": "Main Dish",
*      "title": "Shoyu Ramen",
*      "difficulty": "Advanced",
*      "yields": 4,
*      "description": "Shōyu (醤油 (soy sauce)) ramen is the oldest of the
*      four, it has a clear brown broth, based on a chicken and vegetable (or sometimes fish or beef) stock with
*     plenty of soy sauce added resulting in a soup that is tangy, salty, and savory yet still fairly light on the palate.",
*      "direction": "Lorem ipsum dolor sit amet, consectetur adipiscing
*      elit. Donec neque est, aliquam non dictum vitae, sodales hendrerit lectus. Quisque vel viverra libero.",
*      "imgURL": "https://i0.wp.com/angsarap.net/wp-content/uploads/2014/09/Shoyu-Ramen.jpg",
*    }
* @apiSuccessExample {json} Success
*    HTTP/1.1 200 Recipe updated successfully.
* @apiErrorExample {json} Recipe not found
*    HTTP/1.1 404 Recipe Not Found
* @apiErrorExample {json} Update error
*    HTTP/1.1 500 Internal Server Error
*/
app.put('/recipesss/:id', recipes.update);

/**
* @api {delete} /recipesss/:id Remove a recipe
* @apiGroup Recipes
* @apiParam {Number} id Recipe id
* @apiSuccessExample {json} Success
*    HTTP/1.1 200 Recipe deleted successfully.
* @apiErrorExample {json} Recipe not found
*    HTTP/1.1 404 Recipe Not Found
* @apiErrorExample {json} Delete error
*    HTTP/1.1 500 Internal Server Error
*/
app.delete('/recipesss/:id', recipes.delete);

