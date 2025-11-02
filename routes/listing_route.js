const express=require('express');
const router=express.Router();
const multer  = require('multer');
const { storage } = require('../cluodinary_config');
const AsyncWrap=require("../utils/AsyncWrap")
const {isloggedin,isowner,isauthor,validateschema,validateReviewSchema}=require('../middleware');
const listingcontrol=require('../controller/listingcontrol');
const upload = multer({ storage: storage });
router.get('/listing',AsyncWrap(  listingcontrol.AllListings));
router.get('/listing/new',isloggedin,(req,res)=>{
   console.log(req.user);
   res.render('newlist');
})
router.get("/listing/search",AsyncWrap(listingcontrol.listingsBySearch));
router.post('/listing/new',upload.single('listing[image]'),validateschema,isloggedin,AsyncWrap(listingcontrol.createListing));

router.get('/listing/filter', AsyncWrap( listingcontrol.filterListings));
router.get("/listing/:id",AsyncWrap(listingcontrol.showList))
router.get("/listing/:id/edit",isloggedin,isowner,AsyncWrap(listingcontrol.Listeditform))
router.put("/listing/:id/edit",isloggedin,isowner,upload.single('listing[image]'),validateschema,AsyncWrap(listingcontrol.listEdit))
router.delete("/listing/:id/delete",isloggedin,isowner,AsyncWrap(listingcontrol.deleteList))
router.post("/listing/:id/review",isloggedin,validateReviewSchema,AsyncWrap(listingcontrol.createReview))
router.delete("/listing/:id/review/:reviewId",isloggedin,isauthor ,AsyncWrap(listingcontrol.deleteReview));


module.exports=router;
