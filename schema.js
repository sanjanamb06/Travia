//THIS IS USED TO PROVIDE A VALIDATION FOR OUR MONDODB SCHEMA
//on the server side
const Joi = require("joi");
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.object({
      url: Joi.string().uri().allow(""),
      filename: Joi.string().optional().allow(""), // Allow filename if it's included
    }).optional(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
module.exports.bookingSchema = Joi.object({
  booking: Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
  }).required(),
});