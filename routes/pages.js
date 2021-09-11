//require modules
const express=require('express');
const router=express.Router();

//render index.hbs homepage
router.get("/",(req,res)=>{
    res.render('index');
});

//render registration.hbs registration page
router.get("/register",(req,res)=>{
    res.render('register');
});


//render learnmore.hbs page
router.get("/learnmore",(req,res)=>{
    res.render('learnmore');
});

//export router modules
module.exports=router;