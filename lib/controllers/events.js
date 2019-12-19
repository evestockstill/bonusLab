// eslint-disable-next-line no-unused-vars
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Event = require('../models/Event');


exports.getEvents = asyncHandler(async(req, res, next) => {
  let query;
  if(req.params.recipeId) {
    query = Event.find({ recipe: req.params.recipeId });
  } else {
    query = Event.find();
  }
  const events = await query;
  res.status(200).json({
    success: true,
    count: events.length,
    data: events
  });
});
