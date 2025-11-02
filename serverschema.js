const joi=require('joi');
const listing = require('./model/listing');
const Review = require('./model/review');
const User = require('./model/user');
const listingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        image:joi.string().allow("",null),
        price:joi.number().required().min(0),
        location:joi.string().required(),
        country:joi.string().required(),
        category:joi.string().required()
    }).required()
})
const reviewSchema = joi.object({
    comment: joi.string().required(),
    rating: joi.number().required().min(1).max(5)
});

    const userSchema = joi.object({
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });

module.exports = {
    listingSchema,
    reviewSchema,
    userSchema
}