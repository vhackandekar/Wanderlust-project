const data = require('../init/data');
const listing=require('../model/listing');
const Review = require('../model/review');

module.exports.AllListings=async(req,res)=>{
   const data=await listing.find();
    res.render('show',{data});
}

module.exports.listingsBySearch=async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.redirect("/listing");
    }

    // Case-insensitive search using regex
    const listings = await listing.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
      ],
    });

    res.render("show", { data: listings });
  } catch (err) {
    next(err);
  }
}

module.exports.createListing=async(req,res)=>{
   const {title,description,price,category,location,country}=req.body;
   const url=req.file.path;
   const filename=req.file.filename;
   

   const newlisting= await listing.create({
        title,
        description,
        price,
        location,
        country,
        category,
        reviews: [], // <-- add this
        owner:req.user._id
   })
   newlisting.image={ url, filename };
    await newlisting.save();
   req.flash('success','Listing created successfully');
   res.redirect("/listing");
}
module.exports.showList=async (req,res)=>{
    const id=req.params.id;
    const data=await listing.findById(id).populate('reviews').populate('owner')
    .populate({
        path: 'reviews',
        populate: {
            path: 'author',
            select: 'email'
        }
    });
    if(!data)
    {
        req.flash('error','Listing not found');
        return res.redirect('/listing');
    }
   
    res.render('list',{list:data});
}
module.exports.Listeditform=async(req,res)=>{
    const id=req.params.id;
    const data=await listing.findById(id);
   if(!data)
   {
       req.flash('error','Listing not found');
       return res.redirect('/listing');
   }
    res.render("edit",{data});
}
module.exports.listEdit=async(req,res)=>{
   
    const {title,description,price,location,country}=req.body;
    const id=req.params.id;

    const updatedListing = await listing.findByIdAndUpdate(id,{
        title,
        description,
        price,
        location,
        country
    });
     if (req.file) {
       updatedListing.image = { url: req.file.path, filename: req.file.filename };
       await updatedListing.save();
    }
     req.flash('success','Listing updated successfully');
    res.redirect(`/listing/${id}`);
}
module.exports.deleteList=async(req,res)=>{
    const id=req.params.id;
    const data=await listing.findByIdAndDelete(id);
    req.flash('success','Listing deleted successfully');
    res.redirect('/listing');
}
module.exports.createReview=async(req,res)=>{
    const id=req.params.id;
    const data=await listing.findById(id);
    const {Rating,Comment}=req.body;
    const newReview=await Review.create({
        Rating,
        Comment,
        author:req.user._id
    })
    data.reviews.push(newReview);
    await data.save();
    await newReview.save();
    req.flash('success','Review created successfully');
    res.redirect(`/listing/${id}`);
}
module.exports.deleteReview=async(req,res)=>{
    const {id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Review deleted successfully');
    res.redirect(`/listing/${id}`);
}

module.exports.filterListings = async (req, res) => {
  try {
    const { category } = req.query;
    let listings;
    if (category === "All") {
      listings = await listing.find({}).populate("reviews");
    } else if (category === "Trending") {
      // Fetch all listings and populate reviews
      const allListings = await listing.find({}).populate("reviews");

      // Compute average rating + review count + trend score
      const trendingListings = allListings.map(list => {
        const ratings = list.reviews.map(r => r.Rating);
        const avgRating = ratings.length
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;
        const reviewCount = ratings.length;

        // Optional: recency boost (recently added listings get extra points)
        const daysSinceCreated = Math.floor((Date.now() - list.createdAt) / (1000 * 60 * 60 * 24));
        const recencyBoost = daysSinceCreated < 30 ? 1.1 : 1.0;

        const trendScore = (avgRating * 0.7 + reviewCount * 0.3) * recencyBoost;

        return { ...list._doc, avgRating, reviewCount, trendScore };
      });

      // Sort by trend score (highest first)
      trendingListings.sort((a, b) => b.trendScore - a.trendScore);

      // Pick top 10 trending listings
      listings = trendingListings.slice(0, 10);
    } 
    else if (category && category !== "All") {
      listings = await listing.find({ category }).populate("reviews");
    } 
    else {
      listings = await listing.find({}).populate("reviews");
    }

    res.json({ success: true, data: listings });
  } catch (err) {
    next(err);
  }
};