const express=require('express');
const router=express.Router();
const passport=require('passport');
const AsyncWrap=require("../utils/AsyncWrap")
const {validurl}=require('../middleware');
const {validateuserSchema}=require('../middleware')
const usercontrol=require('../controller/usercontrol')
// flash and res.locals are configured at app level in index.js
// Register route
router.get("/register", (req, res) => {
    res.render("user/register");
});

router.post("/register",validateuserSchema,AsyncWrap(usercontrol.registerUser));
router.get("/login", (req, res) => {
   
    res.render("user/login");
})
// Login route
// Use passport.authenticate with success/failure redirects and flash messages
router.post('/login', validurl, passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), usercontrol.loginUser);



// Logout route
router.get('/logout',usercontrol.logoutUser );

module.exports=router;