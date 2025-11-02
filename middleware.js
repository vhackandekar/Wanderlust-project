const review=require("./model/review");
const { listingSchema,  reviewSchema, userSchema} = require('./serverschema');
const errorhandler=require("./errorhandler")
const listing = require('./model/listing');
const Joi = require('joi');

module.exports.isloggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in first!');
        return res.redirect('/login');
    }
    next(); 
}
module.exports.validurl=(req,res,next)=>{
    if(req.session.returnTo)
    {
        // use res.locals so views and downstream handlers can access the stored returnTo
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}


module.exports.validateschema = (req, res, next) => {
    // Try validating as-is (req.body might already be { listing: {...} } or flat)
    let result = listingSchema.validate(req.body);
    console.log(result);
    if (!result.error) {
        // Normalize to flat shape for controllers
        if (req.body && req.body.listing) req.body = req.body.listing;
        return next();
    }

    // If validation failed but there's a nested listing object, try validating that
    if (req.body && req.body.listing) {
        result = listingSchema.validate(req.body.listing);
        if (!result.error) {
            req.body = req.body.listing;
            return next();
        }
    }

    // Still invalid — build error message and throw
    const details = result && result.error ? result.error.details : [];
    const msg = details.map(el => el.message).join(',');
    throw new errorhandler(msg, 400);
}
module.exports.validateReviewSchema=(req,res,next)=>{
    const result=reviewSchema.validate(req.body);
    if(result.error)
    {
        const msg=result.error.details.map(el=>el.message).join(",");
        throw new errorhandler(msg,400);
    }
    else{
        next();
    }
}
module.exports.validateuserSchema=(req,res,next)=>{
    const result=userSchema.validate(req.body);
    if(result.error)
    {
        const msg=result.error.details.map(el=>el.message).join(",");
        throw new errorhandler(msg,400);
    }
    else{
        next();
    }
}
module.exports.isowner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await listing.findById(id);
        if (!data) {
            req.flash('error', 'Listing not found');
            return res.redirect('/listing');
        }
        // data.owner may be an ObjectId or populated object
        const ownerId = data.owner && data.owner._id ? data.owner._id : data.owner;
        if (!req.user || !ownerId || !ownerId.equals || !ownerId.equals(req.user._id)) {
            // if ownerId.equals is not a function, compare string forms
            const ownerStr = ownerId && ownerId.toString ? ownerId.toString() : String(ownerId);
            const userStr = req.user && req.user._id ? req.user._id.toString() : null;
            if (!userStr || ownerStr !== userStr) {
                req.flash('error', 'You are not authorized to edit this listing');
                return res.redirect(`/listing/${id}`);
            }
        }
        next();
    } catch (err) {
        next(err);
    }
};
module.exports.isauthor=async(req,res,next)=>{
     try {
         const { id, reviewId } = req.params;
        const data = await review.findById(reviewId);
        if (!data) {
            req.flash('error', 'review not found');
            return res.redirect(`/listing/${id}`);
        }
        // data.author may be an ObjectId or populated object
        const authorId = data.author && data.author._id ? data.author._id : data.author;
        if (!req.user || !authorId || !authorId.equals || !authorId.equals(req.user._id)) {
            // if authorId.equals is not a function, compare string forms
            const authorStr = authorId && authorId.toString ? authorId.toString() : String(authorId);
            const userStr = req.user && req.user._id ? req.user._id.toString() : null;
            if (!userStr || authorStr !== userStr) {
                req.flash('error', 'You are not authorized to destroy this review');
                return res.redirect(`/listing/${id}`);
            }
        }
        next();
    } catch (err) {
        next(err);
    }
}