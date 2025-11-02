const mongoose=require('mongoose');
const review = require('./review');

const listingSchema=mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image: {
        url: String,
        filename: String
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum: [
    "Trending",
    "Rooms",
    "Iconic Cities",
    "Mountains",
    "Amazing pools",
    "Camping",
    "Farms",
    "Arctic",
    "Domes",
    "Boats"
  ],       required:true
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
listingSchema.post('findOneAndDelete',async (listing)=>{
    if(listing)
    {
        await review.deleteMany({_id:{$in:listing.reviews}});
    }
})
module.exports=mongoose.model("listing",listingSchema);