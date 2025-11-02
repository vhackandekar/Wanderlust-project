if(process.env.NODE_ENV!=='production')
{
    require('dotenv').config();
    console.log("loaded",process.env.ATLAS_URI);
}
const express=require('express')
const app=express()
const ejsMate = require('ejs-mate');
const mongoose=require('mongoose');
const path=require('path');
const User=require('./model/user');
const passport=require('passport');
const LocalStratergy=require('passport-local');
const flash = require('connect-flash');
const port=3000
const listingRoute=require('./routes/listing_route')
const userRoute=require('./routes/user_routes')
var methodOverride = require('method-override')
var session=require('express-session');
const MongoStore = require('connect-mongo');

main()
.then(()=>{
    console.log("conneted to db");
}).catch((err)=>{
    console.log(err);
})
async function main()
{
   await mongoose.connect(process.env.ATLAS_URI);
}

const store = MongoStore.create({
  mongoUrl: process.env.ATLAS_URI,
  crypto: {
    secret: 'thisisasecretkey',
     
  },
  touchAfter: 24 * 3600
})
const session_id={
    store: store,
    secret:'thisisasecretkey',
    resave:false,
    saveUninitialized:true,
    cookie:{
        // cookie.expires should be a Date object
        expires: new Date(Date.now()+1000*60*60*24*7),
        maxAge:1000*60*60*24*7,
        httpOnly:true
    }
}
store.on('error', function (e) {
  console.log('SESSION STORE ERROR', e);
});


app.use(session(session_id));
// Passport setup
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currentUser=req.user;
    next();
});

// Connect Passport with User model
// Ensure LocalStrategy uses 'email' as the username field to match the form and plugin config
passport.use(new LocalStratergy({ usernameField: 'email' }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set ejs-mate as the rendering engine for EJS files
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.use('/',listingRoute);
app.use('/',userRoute);


//error handling middleware
app.use((err,req,res,next)=>{

   res.render('error',{error:err});
})
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}

module.exports = app;
