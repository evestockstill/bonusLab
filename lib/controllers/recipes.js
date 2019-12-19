/* eslint-disable no-undef */
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Recipe = require('../models/Recipe');

exports.getRecipes = asyncHandler(async(req, res, next) => {
  const recipes = await Recipe.find();
  res
    .status(200)
    .json({ success: true, count: recipes.length, data: recipes });
});
exports.getRecipe = asyncHandler(async(req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);
  if(!recipe) {
    return next (
      new ErrorResponse(`Recipe not found with id of ${req.params.id}`, 404)
      
    );
  }
  res.status(200)
    .json({ success: true, msg: `Show recipe ${req.params.id}` });
});
exports.createRecipe = asyncHandler(async(req, res, next) => {
  const recipe = await Recipe.create(req.body);
  res.status(201)
    .json({ 
      success: true,
      data: recipe });
});
exports.patchRecipe = asyncHandler(async(req, res, next) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if(!recipe) {
    return next(
      new ErrorResponse(`Recipe not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: recipe });
});

exports.deleteRecipe = asyncHandler(async(req, res, next) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  if(!recipe) {
    return next(
      new ErrorResponse(`Recipe not found with id of ${req.params.id}`, 404)
    );
  }
  res
    .status(200)
    .json({ success: true, msg: `delete recipe ${req.params.id}` });
});



